/**
 * GitHub sign-in for the /admin panel (Sveltia CMS), as two Vercel functions:
 * /api/auth starts the OAuth flow and /api/callback finishes it. Same popup protocol as
 * the official sveltia-cms-auth worker, plus an allow-list of GitHub accounts.
 *
 * Environment variables (Vercel → Project → Settings → Environment Variables):
 *   GITHUB_OAUTH_CLIENT_ID      – from the GitHub OAuth App
 *   GITHUB_OAUTH_CLIENT_SECRET  – from the GitHub OAuth App (never commit it)
 *   ALLOWED_GITHUB_USERS        – optional, comma-separated; defaults to the site owner
 *
 * The OAuth App's callback URL must be https://www.alviayovas.in/api/callback.
 */

/** Pages allowed to receive a token: the CMS only ever runs on these hosts. */
const TRUSTED_HOSTS = ["www.alviayovas.in", "alviayovas.in", "alviayovas.vercel.app"];
const DEFAULT_ALLOWED_USERS = "alviayovas-cell";
/** The repo is public; `repo` is accepted only in case it's ever made private. */
const ALLOWED_SCOPES = ["public_repo", "repo"];
const DEFAULT_SCOPE = "public_repo";
const CSRF_COOKIE = "admin-oauth-state";

type Result = { token: string } | { error: string; errorCode: string };

const env = (name: string) => process.env[name]?.trim() ?? "";

/** JSON for an inline <script>: `<` escaped so a value can never close the tag. */
const serialize = (value: unknown) => JSON.stringify(value).replaceAll("<", "\\u003c");

/**
 * The popup page. It announces itself to the CMS window with `authorizing:github`, waits
 * for the CMS to answer, then sends the result — but a token only ever goes to a trusted
 * origin. The message event's origin is set by the browser, so it can't be forged.
 */
function popupPage(result: Result, status = 200): Response {
  const state = "token" in result ? "success" : "error";
  const payload = { provider: "github", ...result };
  const html = `<!doctype html><html><head><meta charset="utf-8"><meta name="robots" content="noindex"><title>Signing in…</title></head>
<body style="font:15px system-ui;padding:2rem;color:#444">${state === "error" ? `Sign-in failed: ${result && "error" in result ? result.error.replace(/</g, "&lt;") : ""}` : "Signing in…"}
<script>
(() => {
  const trusted = ${serialize(TRUSTED_HOSTS)};
  const isTrusted = (origin) => { try { return trusted.includes(new URL(origin).hostname); } catch { return false; } };
  const message = ${serialize(`authorization:github:${state}:${JSON.stringify(payload)}`)};
  const carriesToken = ${serialize(state === "success")};
  window.addEventListener("message", ({ data, origin }) => {
    if (data !== "authorizing:github") return;
    if (carriesToken && !isTrusted(origin)) return;
    window.opener?.postMessage(message, origin);
  });
  window.opener?.postMessage("authorizing:github", "*");
})();
</script></body></html>`;
  return new Response(html, {
    status,
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "no-store",
      "Set-Cookie": `${CSRF_COOKIE}=; HttpOnly; Secure; SameSite=Lax; Path=/api; Max-Age=0`,
    },
  });
}

const fail = (error: string, errorCode: string, status = 400) => popupPage({ error, errorCode }, status);

/** GET /api/auth?provider=github&site_id=…&scope=… — redirect to GitHub's consent page. */
export function startAuth(request: Request): Response {
  const url = new URL(request.url);
  const provider = url.searchParams.get("provider");
  const siteId = url.searchParams.get("site_id") ?? "";

  if (provider !== "github") return fail("Only GitHub sign-in is supported.", "UNSUPPORTED_BACKEND");
  if (!TRUSTED_HOSTS.includes(siteId)) {
    return fail("This site isn't allowed to use this sign-in.", "UNSUPPORTED_DOMAIN", 403);
  }

  const clientId = env("GITHUB_OAUTH_CLIENT_ID");
  if (!clientId || !env("GITHUB_OAUTH_CLIENT_SECRET")) {
    return fail("The GitHub OAuth app isn't configured on the server yet.", "MISCONFIGURED_CLIENT", 500);
  }

  const requested = (url.searchParams.get("scope") ?? "").split(/[\s,]+/).filter(Boolean);
  const scope = requested.length && requested.every((s) => ALLOWED_SCOPES.includes(s)) ? requested.join(",") : DEFAULT_SCOPE;

  const state = crypto.randomUUID().replaceAll("-", "");
  const authorize = new URL("https://github.com/login/oauth/authorize");
  authorize.search = new URLSearchParams({
    client_id: clientId,
    redirect_uri: `${url.origin}/api/callback`,
    scope,
    state,
    allow_signup: "false",
  }).toString();

  return new Response(null, {
    status: 302,
    headers: {
      Location: authorize.toString(),
      "Cache-Control": "no-store",
      // Lax so the cookie survives GitHub's redirect back; 10 minutes to finish signing in.
      "Set-Cookie": `${CSRF_COOKIE}=${state}; HttpOnly; Secure; SameSite=Lax; Path=/api; Max-Age=600`,
    },
  });
}

/** GET /api/callback?code=…&state=… — trade the code for a token and hand it to the CMS. */
export async function finishAuth(request: Request): Promise<Response> {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");
  const cookieState = request.headers.get("cookie")?.match(new RegExp(`(?:^|;\\s*)${CSRF_COOKIE}=([0-9a-f]{32})`))?.[1];

  if (url.searchParams.get("error")) {
    return fail(url.searchParams.get("error_description") ?? "GitHub sign-in was cancelled.", "AUTH_CODE_REQUEST_FAILED");
  }
  if (!code || !state) return fail("GitHub didn't return an authorization code. Please try again.", "AUTH_CODE_REQUEST_FAILED");
  if (!cookieState || cookieState !== state) {
    return fail("The sign-in session expired or didn't match. Please try again.", "CSRF_DETECTED", 403);
  }

  const clientId = env("GITHUB_OAUTH_CLIENT_ID");
  const clientSecret = env("GITHUB_OAUTH_CLIENT_SECRET");
  if (!clientId || !clientSecret) {
    return fail("The GitHub OAuth app isn't configured on the server yet.", "MISCONFIGURED_CLIENT", 500);
  }

  let token: string | undefined;
  try {
    const res = await fetch("https://github.com/login/oauth/access_token", {
      method: "POST",
      headers: { Accept: "application/json", "Content-Type": "application/json" },
      body: JSON.stringify({ client_id: clientId, client_secret: clientSecret, code, redirect_uri: `${url.origin}/api/callback` }),
    });
    const data = (await res.json()) as { access_token?: string; error_description?: string };
    if (!data.access_token) return fail(data.error_description ?? "GitHub didn't issue a token.", "TOKEN_REQUEST_FAILED", 502);
    token = data.access_token;
  } catch {
    return fail("Couldn't reach GitHub. Please try again.", "TOKEN_REQUEST_FAILED", 502);
  }

  // Only the listed accounts may use the admin, even though GitHub itself would also
  // refuse commits from anyone without write access to the repo.
  const allowed = (env("ALLOWED_GITHUB_USERS") || DEFAULT_ALLOWED_USERS).split(",").map((u) => u.trim().toLowerCase());
  try {
    const res = await fetch("https://api.github.com/user", {
      headers: { Authorization: `Bearer ${token}`, Accept: "application/vnd.github+json", "User-Agent": "alviayovas-admin" },
    });
    const user = (await res.json()) as { login?: string };
    if (!user.login || !allowed.includes(user.login.toLowerCase())) {
      return fail(`The GitHub account “${user.login ?? "unknown"}” isn't allowed to edit this site.`, "UNAUTHORIZED_USER", 403);
    }
  } catch {
    return fail("Couldn't confirm your GitHub account. Please try again.", "TOKEN_REQUEST_FAILED", 502);
  }

  return popupPage({ token });
}
