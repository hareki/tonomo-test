import { Figure } from '@/src/components/post/Figure';
import { HeadingLink } from '@/src/components/post/HeadingLink';
import { Quote } from '@/src/components/post/Quote';
import { Blockquote, InlineCode, List, P } from '@/src/components/ui/Typography';
import { cn } from '@/src/lib/tailwind/cn';

import type { MDXComponents } from 'mdx/types';

/**
 * Global MDX component map (required by `@next/mdx` in the App Router). Markdown
 * elements render through the editorial Typography primitives so post bodies
 * match the rest of the app, and the rich blocks (`<Figure>`, `<Quote>`) are
 * exposed here so authors can use them without imports.
 *
 * Vertical rhythm lives in `ArticleBody`, not here. Headings route through
 * `HeadingLink`, which owns the heading-specific layout concerns (the
 * `scroll-mt-24` that keeps a jumped-to heading clear of the sticky header, plus
 * the hover self-link) and spreads through the `id` that rehype-slug stamps on.
 */
const components: MDXComponents = {
  h2: ({ className, ...props }) => <HeadingLink level={2} className={className} {...props} />,
  h3: ({ className, ...props }) => <HeadingLink level={3} className={className} {...props} />,
  h4: ({ className, ...props }) => <HeadingLink level={4} className={className} {...props} />,
  p: ({ className, ...props }) => <P className={className} {...props} />,
  ul: ({ className, ...props }) => (
    <List as='ul' className={cn('list-disc', className)} {...props} />
  ),
  ol: ({ className, ...props }) => (
    <List as='ol' className={cn('list-decimal', className)} {...props} />
  ),
  blockquote: ({ className, ...props }) => <Blockquote className={className} {...props} />,
  a: ({ className, children, ...props }) => (
    <a
      className={cn(
        `
          font-medium text-primary underline-offset-4
          hover:underline
        `,
        className,
      )}
      {...props}
    >
      {children}
    </a>
  ),
  // Block code arrives as `<pre><code class="language-…">`; only inline code
  // (no language class) should get the inline pill treatment.
  code: ({ className, ...props }) =>
    typeof className === 'string' && className.includes('language-') ? (
      <code className={className} {...props} />
    ) : (
      <InlineCode className={className} {...props} />
    ),
  pre: ({ className, ...props }) => (
    <pre
      className={cn(
        'overflow-x-auto rounded-lg border border-border bg-muted p-4 text-sm',
        className,
      )}
      {...props}
    />
  ),
  Figure,
  Quote,
};

export function useMDXComponents(): MDXComponents {
  return components;
}
