import { startAuth } from "./_lib/oauth.js";

/** Step 1 of /admin sign-in: redirect to GitHub. See ./_lib/oauth.ts. */
export function GET(request: Request): Response {
  return startAuth(request);
}
