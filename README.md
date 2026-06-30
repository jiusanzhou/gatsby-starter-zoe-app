<div align="center">

# `zoe app` · Legacy (Gatsby)

> ⚠️ **This repository is archived. The project has been rewritten in Next.js.**
>
> **👉 New home: [jiusanzhou/nextjs-starter-zoe-app](https://github.com/jiusanzhou/nextjs-starter-zoe-app)**

</div>

---

## What changed

The original Gatsby-based `zoe-site` (this repo, 2019–2021) has been fully rewritten as a Next.js 16 + Tailwind 4 + shadcn/ui starter. The new version is **config-driven, zero-fork, static-export ready**, with 7 production themes, MDX blog, `/releases` landing page, and built-in GitHub Actions templates.

The legacy short link **`https://git.io/zoe-site`** continues to work — it now transparently forwards to the new script:

```bash
# Still works (now points to the Next.js version):
curl -sSL https://git.io/zoe-site | bash -s new my-site

# Or directly:
curl -sSL https://raw.githubusercontent.com/jiusanzhou/nextjs-starter-zoe-app/main/scripts/zoe-site.sh \
  | bash -s new my-site
```

The original Gatsby script (`hack/zoe-site.js`) is preserved in git history for reference but is no longer maintained.

## Migration

If you had a site built with the old Gatsby `zoe-site`:

1. Keep your `zoe-site.yaml` — most field names are compatible (review themes / section types in the new repo).
2. Move Markdown content from `content/` (same layout).
3. Run `curl -sSL https://git.io/zoe-site | bash -s build` — output goes to `./out`.

See the new repo's [README](https://github.com/jiusanzhou/nextjs-starter-zoe-app#readme), [deployment guide](https://github.com/jiusanzhou/nextjs-starter-zoe-app/blob/main/docs/deployment.md), and [releases guide](https://github.com/jiusanzhou/nextjs-starter-zoe-app/blob/main/docs/releases.md).

## Original README (for reference)

When I started a side project I had to care about lots of small things — version releases, changelogs, ToS / privacy pages, landing page, help docs, Q&A, simple JSON snippets, logos. I didn't want to copy-paste boilerplate every time, and didn't want a full CMS — so I built `zoe-site` to manage all this from a single config.

The Gatsby version pioneered the idea; the Next.js rewrite carries it forward with modern tooling.

— Zoe
