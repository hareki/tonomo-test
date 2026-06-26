# Tonomo Journal — Responsive Blog Editorial Layout

A responsive editorial blog built for the technical test in
[`docs/technical-test.md`](docs/technical-test.md): a single reading column with a cover banner, a
sticky scroll-synced table of contents, a light/dark/system theme switcher, syntax-highlighted code,
related posts, and animated navigation.

**Live demo:** https://tonomo-test-phi.vercel.app - scores 95-100 across all Lighthouse categories on mobile devices.

All four bonus points are covered: a React component layout, a sticky scroll-synced table of
contents, a light/dark/system theme toggle, and accessibility (semantic landmarks, keyboard
navigation, and sufficient contrast).

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

- **Next.js 16** (App Router, React 19, React Compiler, Cache Components, Turbopack). It fits the modern
  hybrid rendering this app needs: SSR for the initial load, client-side navigation after. Server
  Components keep most of the UI off the client bundle, which simplifies the code and ships less JS.
- **Tailwind CSS v4** for styling, driven by CSS custom properties. A popular, modern CSS framework
  that fits React's component model, keeping styles colocated with the markup they apply to.
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
    icon.png                  App favicon
    blog/[slug]/
      page.tsx                generateStaticParams + generateMetadata + the post view
      not-found.tsx           Unknown slug
  components/
    ui/                       Reusable primitives (Typography, Avatar, Badge, Button, ThemeSwitcher,
                              CodeBlock, Drawer)
    layout/                   SiteHeader, SiteMobileBar, SiteFooter, NavLinks, NavMenuButton,
                              constants (nav links)
    icons/                    TonomoLogo
  features/blog-post/         types.ts, authors.ts, queries.ts (edge-safe: getPost, related,
                              random…), content.ts (Node-only: load MDX body, derive toc +
                              reading time via getPostAnalysis)
    components/               PostHeader, PostByline, CoverImage, PostLayout, PostBody,
                              TableOfContents/TocList, MobileToc, RelatedPosts/RelatedPostCard,
                              and the MDX blocks (Figure, Quote, HeadingLink)
    data/
      index.ts                Aggregates every post's metadata into one array
      <slug>/
        content.mdx           The post body (MDX)
        metadata.ts           The post's typed PostMetadata
  hooks/                      useActiveSection (scroll-spy), useHydrated
  lib/                        tailwind/utils.ts (cn), scroll.ts (scoped smooth scroll), shiki.ts
  providers/ThemeProvider.tsx
  styles/                     theme.css (tokens), view-transition.css, index.css
  proxy.ts                    Redirects `/` to a random post
```

A few choices worth calling out:

- **MDX bodies, co-located typed metadata.** Each post is a self-contained directory under
  `src/features/blog-post/data/<slug>/`: its body as `content.mdx` and its typed `PostMetadata` as
  `metadata.ts`, with `data/index.ts` aggregating them. The table of contents and reading time are
  **derived** by parsing the MDX in `content.ts` (`getPostAnalysis`): headings (`h2`–`h4`) become TOC
  entries, and reading time is computed from the real body text. `rehype-slug` ids the rendered
  headings while the same slugging seeds the TOC anchors, so a TOC link can't drift from its heading.
- **Build-time syntax highlighting.** Code blocks render through an async `CodeBlock` Server
  Component backed by Shiki. Because post pages are statically prerendered, highlighting happens at
  build time and ships no client JS. Two themes are emitted as CSS variables, so blocks recolor with
  the `data-theme` toggle instead of re-highlighting.
- **Random redirect via proxy.** `/` has no page; `proxy.ts` issues a per-request `307` to a random
  post. Under Cache Components a page redirect would serve a static shell and postpone the redirect,
  whereas the proxy stays a clean, genuinely random redirect on every request.

## Intentional deviations from the reference

The reference design ([tonomo blog](https://www.tonomo.io/blog/how-to-close-bigger-clients-winning-the-first-meeting))
and the test sketch informed the editorial feel, but the layout is deliberately not a pixel match:

- **Table of contents on the _right_, author beside the byline.** The reference and sketch group
  both into a left sidebar. Here the TOC sits to the right of the article and the author (avatar +
  name) sits with the date and reading time beneath the title. In my experience these are the more
  conventional, intuitive spots readers expect each one in.
- **Mobile sidebar (containing Table of Contents) is a drawer, not a stacked sidebar.** `docs/technical-test.md`
  sketches the sidebar stacking _below_ the article on mobile. The point of a TOC is to track where you
  are on the page at any moment and to jump between sections quickly; stacking it above or below the article
  defeats that. Instead, below `lg` the TOC moves to a button on a sticky secondary header that opens a
  right-side drawer, keeping the reading column uninterrupted while leaving the TOC one tap away.
- **Related posts section.** Not in the reference or the test sketch, but a real blog page rarely
  ends at the article body. It's also there to ensure the post content itself demonstrates the full
  range of supported content types: headings, paragraphs, blockquotes, lists, inline code, inline
  links, and fenced code blocks with syntax highlighting.

## Trade-offs

- Responsive behavior is handled **entirely in CSS**, with no JS conditional rendering: no
  viewport-detection overhead, and it works cleanly with SSR (the server doesn't know the client
  viewport, so there's no flash of the wrong layout). The cost is that every client component is
  mounted regardless of breakpoint and simply hidden, adding a little DOM and JS weight; given how
  few and how simple the client components are, that's a worthwhile trade.
- Post bodies are MDX files on disk with typed metadata beside them; a real blog would move this
  behind a CMS. The `features/blog-post` boundary (queries + content loaders over `data/<slug>/`) is
  designed so that swap stays localized.

## Reused brand assets

The **navbar wordmark** and the **favicon** (`src/app/icon.png`) are **Tonomo's own brand
assets**, reused here for this exercise. All rights to these assets reserved by Tonomo. All other imagery
is placeholder content from [Picsum](https://picsum.photos) (seeded so it stays stable), served
through `next/image` with explicit dimensions to preserve aspect ratio without layout shift.

## Inspiration

- [tonomo.io](https://www.tonomo.io/)
- [joshwcomeau.com](https://www.joshwcomeau.com/)
- [dev.to](https://dev.to/)
- [greatfrontend.com](https://www.greatfrontend.com/)
- [Next.js docs](https://nextjs.org/docs)
