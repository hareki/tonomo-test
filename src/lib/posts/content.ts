import { readFile } from 'node:fs/promises';
import path from 'node:path';

import GithubSlugger from 'github-slugger';
import { toString as mdastToString } from 'mdast-util-to-string';
import remarkMdx from 'remark-mdx';
import remarkParse from 'remark-parse';
import { unified } from 'unified';
import { visit } from 'unist-util-visit';

import type { TocEntry } from './types';

/**
 * Node-only helpers for a post's MDX body. Kept apart from `queries.ts` on
 * purpose: those run in the edge middleware (`proxy.ts`), and this module reads
 * the filesystem and pulls in the remark toolchain, neither of which the edge
 * runtime allows.
 */

const WORDS_PER_MINUTE = 200;
const CONTENT_DIR = path.join(process.cwd(), 'src/lib/posts/content');

// Heading levels included in the table of contents (h2 through h4).
const TOC_MIN_DEPTH = 2;
const TOC_MAX_DEPTH = 4;

// remark-mdx teaches the parser the JSX syntax (`<Figure/>`, `<Quote>…`) so it
// becomes structured nodes instead of raw text, keeping the word count honest.
const parser = unified().use(remarkParse).use(remarkMdx);

export function loadPostSource(slug: string): Promise<string> {
  return readFile(path.join(CONTENT_DIR, `${slug}.mdx`), 'utf8');
}

export type PostAnalysis = {
  toc: TocEntry[];
  minutes: number;
};

/**
 * Cached entry point for the page. The `'use cache'` directive (Cache
 * Components) lets the prerender treat the body's filesystem read as static
 * data keyed by slug, instead of blocking on uncached I/O outside a Suspense
 * boundary. Bodies are fixed at build time, so caching them is exactly right.
 */
export async function getPostAnalysis(slug: string): Promise<PostAnalysis> {
  'use cache';

  return analyzePost(await loadPostSource(slug));
}

/** Parses the MDX body once to derive its table of contents and reading time. */
export function analyzePost(source: string): PostAnalysis {
  const tree = parser.parse(source);
  const slugger = new GithubSlugger();
  const toc: TocEntry[] = [];

  // `h2`–`h4`s are the section headings the TOC is built from. Every heading is
  // slugged in document order (even ones outside the range) so this slugger's
  // dedup counter stays in lockstep with rehype-slug at render time, keeping a
  // TOC `#id` matched to its heading.
  visit(tree, 'heading', (node) => {
    const title = mdastToString(node);
    const id = slugger.slug(title);

    if (node.depth >= TOC_MIN_DEPTH && node.depth <= TOC_MAX_DEPTH) {
      toc.push({ id, title, depth: node.depth });
    }
  });

  let words = 0;

  visit(tree, 'text', (node) => {
    words += countWords(node.value);
  });

  return { toc, minutes: Math.max(1, Math.ceil(words / WORDS_PER_MINUTE)) };
}

function countWords(text: string): number {
  return text.trim().split(/\s+/).filter(Boolean).length;
}
