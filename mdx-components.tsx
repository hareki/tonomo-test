import { isValidElement } from 'react';
import type { ReactNode } from 'react';

import { Figure } from '@/src/components/post/Figure';
import { HeadingLink } from '@/src/components/post/HeadingLink';
import { Quote } from '@/src/components/post/Quote';
import { CodeBlock } from '@/src/components/ui/CodeBlock';
import { Blockquote, InlineCode, List, P } from '@/src/components/ui/Typography';
import { cn } from '@/src/lib/tailwind/utils';

import type { MDXComponents } from 'mdx/types';

/** Pull the raw source + language out of a fenced block's `<pre><code>` child. */
function readCodeBlock(children: ReactNode): { code: string; lang: string } {
  if (!isValidElement<{ className?: string; children?: ReactNode }>(children)) {
    return { code: '', lang: 'text' };
  }

  const { className, children: raw } = children.props;
  const lang = /language-(\w+)/.exec(className ?? '')?.[1] ?? 'text';
  const code = (typeof raw === 'string' ? raw : Array.isArray(raw) ? raw.join('') : '').replace(
    /\n$/,
    '',
  );

  return { code, lang };
}

/**
 * Global MDX component map (required by `@next/mdx` in the App Router). Markdown
 * elements render through the editorial Typography primitives so post bodies
 * match the rest of the app, and the rich blocks (`<Figure>`, `<Quote>`) are
 * exposed here so authors can use them without imports.
 *
 * Vertical rhythm lives in `PostBody`, not here. Headings route through
 * `HeadingLink`, which owns the heading-specific layout concerns (the `scroll-mt`
 * that keeps a jumped-to heading clear of the sticky header, plus the hover
 * self-link) and spreads through the `id` that rehype-slug stamps on.
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
  // Block code is intercepted at `pre` (below) and rendered through `CodeBlock`,
  // so `code` only ever handles inline code and always gets the pill treatment.
  code: ({ className, ...props }) => <InlineCode className={className} {...props} />,
  // Fenced blocks arrive as `<pre><code class="language-…">`; lift the source out
  // and hand it to the Shiki-highlighted CodeBlock instead of rendering raw.
  pre: ({ children }) => {
    const { code, lang } = readCodeBlock(children);

    return <CodeBlock code={code} lang={lang} />;
  },
  Figure,
  Quote,
};

export function useMDXComponents(): MDXComponents {
  return components;
}
