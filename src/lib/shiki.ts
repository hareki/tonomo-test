import { createHighlighter, type Highlighter } from 'shiki';

/**
 * Build-time syntax highlighting. The highlighter is created once and cached for
 * the process (a module-level promise), since post pages are statically
 * prerendered this runs during the build, not in the browser, and ships no
 * client JS. Two themes are loaded so the same markup can switch with the app's
 * `data-theme` toggle via CSS variables (`defaultColor: false`).
 */
const THEMES = { light: 'github-light', dark: 'github-dark' } as const;

const LANGUAGES = ['bash', 'json', 'ts', 'tsx', 'js', 'jsx', 'css', 'yaml'];

let highlighterPromise: Promise<Highlighter> | undefined;

function getHighlighter(): Promise<Highlighter> {
  highlighterPromise ??= createHighlighter({
    langs: LANGUAGES,
    themes: [THEMES.light, THEMES.dark],
  });

  return highlighterPromise;
}

export async function highlightCode(code: string, lang: string): Promise<string> {
  // Cached so the result is reusable and so Shiki's internal `Date.now()` is
  // allowed under Cache Components (same pattern as `getPostAnalysis`). Keyed by
  // the serializable args (code + lang).
  'use cache';

  const highlighter = await getHighlighter();
  // Unknown / unloaded languages fall back to plain text rather than throwing.
  const resolved = highlighter.getLoadedLanguages().includes(lang) ? lang : 'text';

  return highlighter.codeToHtml(code, {
    lang: resolved,
    themes: THEMES,
    defaultColor: false,
  });
}
