# demo-repository: GitHub Packages PoC

A Next.js app that shows the PCA **student login page** (ported from `PCA-Dashboard`) using the shared buttons from `@dreamx-tech-eduplatform/ui`, installed from GitHub Packages.

| Where | Shared component used |
|---|---|
| Theme toggle (top right) | `IconButton variant="secondary"` |
| Show/hide password | `IconButton` (ghost / transparent) |
| Login submit | `Button` primary + `loading` + `leftIcon` |
| "New Registration" link | `buttonVariants({ variant: 'link' })` on a Next.js `<Link>` |

## Run

1. Set up your GitHub token once. `@dreamx-tech-eduplatform/*` packages are private, so npm needs a token to download them:
   - Create a **classic** personal access token (GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)) with the `read:packages` scope. Authorize it for the `DreamX-tech-EduPlatform` org if SSO is enabled.
   - Add it to your **user** `~/.npmrc` (on Windows: `C:\Users\<you>\.npmrc`), never to this repo:
     ```
     //npm.pkg.github.com/:_authToken=ghp_your_token_here
     ```
   - The repo's own `.npmrc` already points the `@dreamx-tech-eduplatform` scope at GitHub Packages.
2. Install and start:
   ```bash
   npm install
   npm run dev
   ```
3. Open http://localhost:3000. Any PCA ID works with password `demo` (mock auth, no Supabase).

If `npm install` fails with `401` or `403`, the token is missing or lacks `read:packages`. If it fails with `404`, that version of `@dreamx-tech-eduplatform/ui` has not been published yet (it is published only when `dxt-common-packages` is merged into `main`).

## CI

[.github/workflows/ci.yml](.github/workflows/ci.yml) installs, typechecks and builds on every PR and on pushes to `main`/`develop`. It uses the workflow's `GITHUB_TOKEN`, so one-time setup is needed: in the org's **Packages → ui → Package settings → Manage Actions access**, add `demo-repository` with the **Read** role.

## Updating the shared UI package

Bump the version in `package.json` (for example `"@dreamx-tech-eduplatform/ui": "0.2.0"`), run `npm install`, and commit both `package.json` and `package-lock.json`.
