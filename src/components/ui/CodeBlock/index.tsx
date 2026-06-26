import { CopyButton } from '@/src/components/ui/CodeBlock/CopyButton';
import { highlightCode } from '@/src/lib/shiki';

type CodeBlockProps = {
  code: string;
  lang: string;
};

/**
 * Fenced code block, highlighted by Shiki at build time (this is an async Server
 * Component, so the work happens during prerender). The themed tokens carry both
 * light and dark colors as CSS variables; `src/styles/index.css` picks the set
 * for the active `data-theme`. The header shows the language and a copy button.
 */
export async function CodeBlock({ code, lang }: CodeBlockProps) {
  const html = await highlightCode(code, lang);

  return (
    <div className='overflow-hidden rounded-lg border border-border'>
      <div
        className={`
          flex items-center justify-between gap-2 border-b border-border bg-muted py-1 pr-1.5 pl-4
        `}
      >
        <span className='font-mono text-xs tracking-wide text-muted-foreground'>
          {lang && lang !== 'text' ? lang : ''}
        </span>
        <CopyButton code={code} />
      </div>
      <div
        className={`
          text-sm
          [&_pre]:overflow-x-auto [&_pre]:p-4 [&_pre]:font-medium
        `}
        // Trusted, build-time output from Shiki over our own MDX content.
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}
