import { finishAuth } from "./_lib/oauth.js";

/** Step 2 of /admin sign-in: GitHub redirects back here with a code. See ./_lib/oauth.ts. */
export function GET(request: Request): Promise<Response> {
  return finishAuth(request);
}
