# Deployment to GitHub Pages

## 1. Goal

Deploy the static Next.js app to GitHub Pages for free.

## 2. Build approach

Use Next.js static export.

Expected command:

```bash
npm run build
```

With `output: 'export'`, Next.js should generate a static output suitable for static hosting.

Depending on Next.js version, the output folder is typically:

```text
out/
```

## 3. Next.js config

Recommended baseline:

```ts
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
};

export default nextConfig;
```

## 4. GitHub Pages project site caveat

If the repository is published as:

```text
https://<user>.github.io/<repository-name>/
```

then asset paths may need a base path.

Codex should document this clearly and, if needed, support an environment variable like:

```text
NEXT_PUBLIC_BASE_PATH=/berlin-travel-guide
```

However, keep the initial configuration as simple as possible.

## 5. GitHub Actions workflow

Recommended workflow:

```yaml
name: Deploy static Next.js site to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: npm

      - name: Install dependencies
        run: npm ci

      - name: Lint
        run: npm run lint

      - name: Typecheck
        run: npm run typecheck

      - name: Test
        run: npm run test

      - name: Build
        run: npm run build

      - name: Setup Pages
        uses: actions/configure-pages@v5

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: ./out

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

## 6. Package scripts

Recommended scripts:

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "typecheck": "tsc --noEmit",
    "test": "vitest run",
    "test:watch": "vitest"
  }
}
```

For static export, `next start` is not used for production on GitHub Pages.

## 7. Manual deployment checklist

- Repository is public or GitHub Pages is enabled for private repo if account supports it.
- GitHub Pages source is set to GitHub Actions.
- Workflow has permissions configured.
- `npm run build` creates `out/`.
- All internal links work with trailing slashes.
- Assets load correctly under project path.
