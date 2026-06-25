export type Author = {
  name: string;
  avatar: string;
  role?: string;
};

export type Image = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export type Post = {
  /** Slug doubles as the stable post id, and names the MDX body file. */
  slug: string;
  title: string;
  subtitle: string;
  excerpt: string;
  author: Author;
  /** ISO-8601 date string. */
  publishedAt: string;
  cover: Image;
  tags: string[];
};

/** A single entry in the table of contents, derived from the body's `h2`–`h4`s. */
export type TocEntry = {
  id: string;
  title: string;
  /** Heading level: 2 (h2), 3 (h3), or 4 (h4). */
  depth: number;
};
