# Bern Games website

Cloudflare Pages serves the public assets and Functions from this repository. GitHub `bernhardt1/berngames-website`, branch `main`, is the production deployment source. Build command: `npm run build`; output: `public`.

Run `npm ci`, `npm run check`, then `npm run dev` for port 4352. The build copies only player-facing assets; server source, local databases and credentials stay outside public. Keep secrets outside Git and outside VITE variables.

Boom Brigade source remains in AI Games/Games/boom-brigade. Build and test there, then replace the selected production bundle in games/boom-brigade. Do not edit minified files. `npm run sync:boom` copies its deterministic rules for server-side completion verification. Keep those rules synchronized when boards or rules change.

D1 holds anonymous community counts and optional release subscribers. Production uses berngames-community; preview uses berngames-community-preview. Apply migrations with Wrangler before deployment. Signup requires explicit consent and selected game interests; the private table is not a public export. The unsubscribe token is sent by POST from a URL fragment. No email delivery provider is configured yet; include the subscriber's current unsubscribe URL when implementing release mail.

Public routes: /, /games/boom-brigade/, /press/boom-brigade/, /privacy.html, /support.html, /unsubscribe.html. API routes are /api/games/boom-brigade, /api/signup and /api/unsubscribe. Preview checks must use the preview database. Use ?qa=1 for production gameplay QA to avoid counting test sessions.

The release process is in AI-Game-Dev-Harness/Docs/PUBLISHING-AGENT.md and the game receipt in Games/boom-brigade/Releases/0.1.1/release.json. Preserve unrelated studio pages when adding a game. After publishing main, verify the Cloudflare deployment, actual player URL, public stats and press media.
