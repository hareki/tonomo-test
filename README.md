# Tonomo Journal — Responsive Blog Editorial Layout

A responsive editorial blog built for the technical test in
[`docs/technical-test.md`](docs/technical-test.md): a single reading column with a cover banner, a
sticky scroll-synced table of contents, a light/dark/system theme switcher, syntax-highlighted code,
related posts, and animated navigation.

> **About the content:** every post body is nonsense, AI-generated filler. It exists only to give the
> UI realistic text, headings, code, and imagery to render. Don't read it for advice.

## Running locally

Requires Node 20+ and [pnpm](https://pnpm.io).

```bash
pnpm install
pnpm dev        # http://localhost:3000
```

Visiting `/` redirects you to a random post. Other scripts:

```bash
pnpm build      # production build (prerenders the 4 posts)
pnpm start      # serve the production build
pnpm cleanup    # typecheck + format + lint
```

## Stack

- **Next.js 16** (App Router, React 19, React Compiler, Cache Components, Turbopack).
- **Tailwind CSS v4** for styling, driven by CSS custom properties.
- **[`@base-ui/react`](https://base-ui.com)** and **[`vaul`](https://vaul.emilkowal.ski/)** for
  headless component _logic only_ (the theme radio group; the nav and table-of-contents drawers). All
  visual styling is hand-written, mirroring shadcn's "headless primitive + your own styled component"
  approach without installing shadcn.
- **[`shiki`](https://shiki.style/)** for build-time syntax highlighting.
- **[`@tabler/icons-react`](https://tabler.io/icons)** for icons.
- **[`@teispace/next-themes`](https://www.npmjs.com/package/@teispace/next-themes)** for the
  class-free (`data-theme`) theme toggle with system-preference support and no flash of wrong theme.

Tailwind is written **mobile-first**: base classes target mobile, `md` (768px) swaps the inline nav +
theme control for a compact theme-cycle button and a nav drawer, and `lg` (1024px) introduces the
two-column desktop layout.

## Architecture

```
src/
  app/
    layout.tsx                Single shell: fonts + ThemeProvider, skip link, sticky header,
                              <main>, footer, <html data-theme>
    blog/[slug]/
      page.tsx                generateStaticParams + generateMetadata + the post view
      not-found.tsx           Unknown slug
  components/
    ui/                       Reusable primitives (Typography, Avatar, TonomoLogo, theme controls,
                              CodeBlock, Drawer)
    layout/                   SiteHeader, NavLinks, NavMenuButton, SiteFooter
    post/                     PostHeader, PostByline, CoverImage, PostLayout, PostBody,
                              TableOfContents/TocList, MobileTocBar, ScrollToTopFab,
                              RelatedPost(s), and the MDX blocks (Figure, Quote, HeadingLink)
  hooks/                      useActiveSection (scroll-spy), useHydrated
  features/blog-post/         types.ts, authors.ts, queries.ts (edge-safe: getPost, related,
                              random…), content.ts (Node-only: load MDX body, derive toc +
                              reading time)
    posts/
      index.ts                Aggregates every post's metadata into one array
      <slug>/
        content.mdx           The post body (MDX)
        metadata.ts           The post's typed PostMetadata
  lib/                        tailwind/utils.ts (cn), scroll.ts (scoped smooth scroll), shiki.ts
  providers/ThemeProvider.tsx
  styles/                     theme.css (tokens), view-transition.css, index.css
  proxy.ts                    Redirects `/` to a random post
```

A few choices worth calling out:

- **MDX bodies, co-located typed metadata.** Each post is a self-contained directory under
  `src/features/blog-post/data/<slug>/`: its body as `content.mdx` and its typed `PostMetadata` as
  `metadata.ts`, with `posts/index.ts` aggregating them. The table of contents and reading time are
  **derived** by parsing the MDX in `content.ts` (`analyzePost`): headings (`h2`–`h4`) become TOC
  entries, and reading time is computed from the real body text. `rehype-slug` ids the rendered
  headings while the same slugging seeds the TOC anchors, so a TOC link can't drift from its heading.
- **Build-time syntax highlighting.** Code blocks render through an async `CodeBlock` Server
  Component backed by Shiki. Because post pages are statically prerendered, highlighting happens at
  build time and ships no client JS. Two themes are emitted as CSS variables, so blocks recolor with
  the `data-theme` toggle instead of re-highlighting.
- **Server-first with a thin client edge.** Pages are Server Components; `'use client'` is used only
  where interaction requires it (theme controls, TOC scroll-sync, drawers). React Compiler handles
  memoization.
- **Theming.** `src/styles/theme.css` carries only the tokens this app uses, rebased onto Tailwind's
  stock palette (slate neutrals + a blue accent), with light values on `:root` and overrides under
  `[data-theme="dark"]`.
- **Random redirect via proxy.** `/` has no page; `proxy.ts` issues a per-request `307` to a random
  post. Under Cache Components a page redirect would serve a static shell and postpone the redirect,
  whereas the proxy stays a clean, genuinely random redirect on every request.

## Intentional deviations from the reference

The reference design ([tonomo blog](https://www.tonomo.io/blog/how-to-close-bigger-clients-winning-the-first-meeting))
and the test sketch informed the editorial feel, but the layout is deliberately not a pixel match:

- **Table of contents on the _right_.** The reference and sketch place the sidebar on the left; here
  the TOC sits to the right of the article on desktop, keeping the eye on the prose.
- **Author beside the byline, not in the sidebar.** The author (avatar + name) sits with the date and
  reading time beneath the title rather than in the sidebar.
- **Mobile TOC is a drawer, not a stacked sidebar.** `docs/technical-test.md` sketches the sidebar
  stacking _below_ the article on mobile. Instead, below `lg` the TOC moves to a button on a sticky
  secondary header that opens a right-side drawer, with a floating scroll-to-top button. This keeps
  the mobile reading column uninterrupted while leaving the TOC one tap away.

## View transitions

Navigating from a related-post card uses React's `<ViewTransition>` (same-document, enabled via
`experimental.viewTransition`). The card's cover **morphs** into the destination article's cover
(shared element, `name="post-cover-<slug>"`), the page cross-fades (the `.page` recipe in
`src/styles/view-transition.css`), and the header is anchored so it doesn't flash or slide. Smooth
scrolling is scoped to in-page actions (TOC links, scroll-to-top) rather than applied globally, so a
card-click navigation resets scroll instantly and never competes with the morph.

## Reused brand assets

The **navbar wordmark** and the **favicon** (`src/favicon.png`) are **tonomo's own brand
assets**, reused here for this exercise. They are not original to this submission. All other imagery
is placeholder content from [Picsum](https://picsum.photos) (seeded so it stays stable), served
through `next/image` with explicit dimensions to preserve aspect ratio without layout shift.

## Trade-offs

- Post bodies are MDX files on disk with typed metadata beside them; a real blog would move this
  behind a CMS. The `features/blog` boundary (queries + content loaders over `posts/<slug>/`) is
  designed so that swap stays localized.
- Share/footer/nav links are intentional non-functional placeholders.

## Inspiration

- [joshwcomeau.com](https://www.joshwcomeau.com/)
- [tonomo.io](https://www.tonomo.io/)
- [dev.to](https://dev.to/)
- [greatfrontend.com](https://www.greatfrontend.com/)
- [Next.js docs](https://nextjs.org/docs)
