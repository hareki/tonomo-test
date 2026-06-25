# Tonomo Journal — Responsive Blog Editorial Layout

A clean, responsive editorial blog built for the technical test in
[`docs/technical-test.md`](docs/technical-test.md): a sticky-sidebar article layout with a
gradient hero, a scroll-synced table of contents, a light/dark/system theme switcher, related
articles, and animated navigation.

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
- **[`@base-ui/react`](https://base-ui.com)** for headless component _logic only_ (e.g. the theme
  switcher's radio-group behaviour). All visual styling is hand-written — this mirrors shadcn's
  "headless primitive + your own styled component" approach without installing shadcn, per the test
  note that your own styling/layout is what's evaluated.
- **[`@tabler/icons-react`](https://tabler.io/icons)** for all icons.
- **[`@teispace/next-themes`](https://www.npmjs.com/package/@teispace/next-themes)** for the
  class-free (`data-theme`) theme toggle with system-preference support and no flash of wrong theme.

Tailwind is written **mobile-first**: base classes target mobile, and `lg:` (1024px) introduces the
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
    ui/                       Reusable primitives (Typography, Avatar, TonomoLogo, theme control)
    layout/                   SiteHeader, NavLinks, SiteFooter
    post/                     PostHero, PostByline, ShareLinks, CoverImage, PostLayout,
                              ArticleBody, TableOfContents, RelatedArticle(s), and the MDX
                              component mappings (Figure, Quote, HeadingLink)
  hooks/                      useActiveSection (scroll-spy), useScrolledPast (header state),
                              useHydrated
  features/blog/              types.ts, authors.ts, queries.ts (edge-safe: getPost, related,
                              random…), content.ts (Node-only: load MDX body, derive toc +
                              reading time)
    posts/
      index.ts                Aggregates every post's metadata into one array
      <slug>/
        content.mdx           The post body (MDX)
        metadata.ts           The post's typed PostMetadata
  lib/tailwind/utils.ts       cn() class-merge helper
  providers/ThemeProvider.tsx
  styles/                     theme.css (tokens), view-transition.css, index.css
  proxy.ts                    Redirects `/` to a random post
```

A few choices worth calling out:

- **MDX bodies, co-located typed metadata.** Each post is a self-contained directory under
  `src/features/blog/posts/<slug>/`: its body as `content.mdx` and its typed `PostMetadata` as
  `metadata.ts`, with `posts/index.ts` aggregating them into one array. The table of contents and
  reading time are **derived** by parsing the MDX in `content.ts` (`analyzePost`): headings (`h2`
  through `h4`) become TOC entries, and reading time is computed from the real body text (200 wpm,
  rounded up). `rehype-slug` ids the rendered headings while the same slugging seeds the TOC anchors,
  so a TOC link can never drift from its heading.
- **Clean component separation.** Every responsibility is its own component (byline, share row,
  cover, TOC, card…) rather than a few mega-components, so each is independently reusable.
- **Server-first.** Pages are Server Components and statically prerendered; `'use client'` is used
  only where interaction requires it (header scroll state, TOC scroll-sync, theme control). React
  Compiler handles memoization, so there is no manual `useMemo`/`useCallback`.
- **Theming.** `src/styles/theme.css` was stripped to only the tokens this app uses and rebased onto
  **Tailwind's stock palette** (slate neutrals + a blue accent) instead of the original catppuccin
  set, with light values on `:root` and overrides under `[data-theme="dark"]` (plus `color-scheme`).
- **Random redirect via proxy.** `/` has no page; `proxy.ts` issues a per-request `307` to a random
  post. This is intentionally a proxy rather than a page redirect: under Cache Components a page
  would serve a static shell and postpone the redirect, whereas the proxy stays a clean, genuinely
  random redirect on every request.

## Bonus points (all four implemented)

- **Component framework** — React, broken into small, single-responsibility, reusable components.
- **Sticky sidebar + scroll-sync** — the sidebar sticks on desktop, and `useActiveSection`
  (an `IntersectionObserver`) highlights the current section in the TOC (`aria-current`).
- **Light / dark / system theme switcher** — the segmented control in the header (matching the
  reference's look), built on a headless `@base-ui` radio group and `useTheme`.
- **Accessibility** — semantic landmarks (`header`/`nav`/`main`/`article`/`aside`/`footer`), a
  skip-to-content link, `aria-current` on the active TOC entry, labelled icon-only controls,
  meaningful `alt` text, visible focus rings, an AA-contrast palette, and reduced-motion handling
  for both smooth scroll and view transitions.

### View Transitions

Navigating from a Related Articles card uses React's `<ViewTransition>` (same-document, enabled via
`experimental.viewTransition`). The card's cover **morphs** into the destination article's cover
(shared element, `name="post-cover-<slug>"`), the page fades and rises (the `.page` recipe in
`src/styles/view-transition.css`), and the header is anchored so it doesn't flash or slide.

## Intentional deviations from the reference

The reference design ([tonomo blog](https://www.tonomo.io/blog/how-to-close-bigger-clients-winning-the-first-meeting))
informed the editorial feel, but the layout is deliberately not a pixel match. Two deliberate
departures, both of which the test explicitly allows:

- **Rule A — Table of contents on the _right_.** The reference places the TOC on the left; here it
  sits on the right of the article on desktop and stacks cleanly **below** the article on mobile
  (main content first). This keeps the eye on the prose, with the TOC as a secondary aid.
- **Rule B — Author beside the byline, not in the sidebar.** The author (avatar + name) sits next to
  the published date and reading time in the hero byline, which reads more naturally for an article
  and keeps the sidebar focused on navigation.

We also fixed a contrast problem from the reference: when scrolled, the reference's header text
becomes nearly invisible over the white article body. Here the header is transparent with white text
over the hero, then switches to a solid, blurred, foreground-coloured bar once the hero scrolls past,
so it stays legible in every scroll state.

## Reused brand assets

The **navbar wordmark** (`src/assets/tonomo-navbar-logo.svg`, inlined as `TonomoLogo` so it can be
tinted with `currentColor`) and the **favicon** (`src/favicon.png`) are **tonomo's own brand
assets**, reused here for this exercise. They are not original to this submission. All other imagery
is realistic placeholder content from [Picsum](https://picsum.photos) (seeded so it stays stable),
served through `next/image` with explicit dimensions to preserve aspect ratio without layout shift.

## Trade-offs / what I'd do next

- Bodies are MDX files on disk with typed metadata beside them; a real blog would move this behind a
  CMS. The `features/blog` boundary (queries + content loaders over `posts/<slug>/`) is designed so
  that swap stays localized.
- Share buttons and the top-nav links are intentional non-functional placeholders (with their own
  generic labels, not tonomo's real menu).
- With more time: per-post OG images, a prev/next reader at the foot of the article, and a small
  test suite around `queries.ts` (reading time, TOC derivation, related selection).
