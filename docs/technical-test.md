# Technical Test — Responsive Blog Editorial Layout

## Overview

Thank you for taking the time to complete this technical test. The goal is to assess how you approach UI implementation, responsive CSS architecture, semantic HTML structure, and attention to detail. We are looking for clean, maintainable code and a strong grasp of modern layouts.

Please plan to spend roughly **2–4 hours** on this exercise. If you run out of time, submit what you have along with a README noting what you would prioritize next.

---

## 📐 The Task

Build a clean, readable blog post layout featuring a sticky sidebar and a main article content area.

We are providing a rough layout sketch below. While there is no fixed design file to match, your visual styling choices (colors, typography, rhythm, and spacing) should aim for a **clean, professional, and readable editorial design**.

You are free to use any tools, libraries, or frameworks you are comfortable with (React, Vue, Tailwind, or Vanilla HTML/CSS/JS). Use whatever lets you showcase your best work.

> **Feel free to be creative!** The sketch below is only a guide — you do not need to build it exactly. If you have ideas to improve the layout, structure, or overall experience, go for it.

### Layout Reference

**Desktop View**

```
+--------------------------------------------------------------+
|  Header / Site Title                                         |
+----------------+---------------------------------------------+
|                |                                             |
|   SIDEBAR      |   MAIN CONTENT                              |
|   (Sticky)     |                                             |
|                |   Blog Post Title                           |
|  - Author Info |   Published date · reading time             |
|  - Table of    |                                             |
|    Contents    |   [ Cover Image ]                           |
|  - Tags/Links  |                                             |
|                |   Paragraphs of article body text...        |
|                |   Headings, lists, quotes, code block       |
|                |                                             |
+----------------+---------------------------------------------+
|  Footer                                                      |
+--------------------------------------------------------------+
```

**Mobile View**

```
+----------------------------+
|  Header / Site Title       |
+----------------------------+
|  MAIN CONTENT              |
|  Blog Post Title           |
|  Published date            |
|  [ Cover Image ]           |
|  Article body text...      |
+----------------------------+
|  SIDEBAR (Stacks Below)    |
|  - Author Info             |
|  - Table of Contents       |
|  - Tags/Links              |
+----------------------------+
|  Footer                    |
+----------------------------+
```

---

## 🛠️ Core Requirements

Your submission must meet the following criteria:

- **Grid/Flexbox Layout:** Display the sidebar and main content side-by-side on desktop layouts.
- **Mobile-First Responsiveness:** On mobile screens, the main content must take priority at the top, and the sidebar must stack cleanly **below** the article body.
- **Typography & Visual Polish:** Demonstrate proper hierarchy, line-heights, and vertical rhythm for reading large amounts of text.
- **Media Handling:** Use realistic placeholder content and imagery (e.g., from Unsplash or Picsum). Ensure images preserve their aspect ratio safely without clipping or layout shifting.
- **Clean Code:** Write well-organized, idiomatic CSS/JS and semantic HTML markup.

---

## 🏆 Bonus Points (Pick One or Two)

These are completely optional, but allow you to show off advanced skills:

- **Component Framework:** Build the layout with **React** or **Angular**, breaking the UI into clean, reusable components.
- **Sticky Position & Scroll Sync:** Make the sidebar stick on desktop as the user scrolls, or use a tiny bit of JavaScript to highlight the current heading in the Table of Contents.
- **Dark Mode Toggle:** Use JavaScript and CSS variables to allow the user to switch between light and dark reading themes.
- **Accessibility (a11y):** Ensure semantic HTML elements, sufficient color contrast, keyboard navigability, and appropriate ARIA landmarks are used.

---

## 📊 What We're Evaluating

1. **Layout & Responsiveness:** How smoothly your structure adapts across variable screen sizes.
2. **Code Quality:** Naming conventions, modular structural organization, and logical layout.
3. **Design Eye:** Spacing consistency, choice of typography, and visual clarity.
4. **Attention to Detail:** Proper handling of image rendering, active states, and padding.

---

## 📦 Submission

Please provide:

1. A link to your code repository (GitHub, GitLab) or a clean `.zip` file.
2. A brief `README.md` file explaining your framework choices, architecture choices, trade-offs, and instructions on how to run it locally.
3. _(Optional but highly appreciated)_ A live deployment link (Vercel, Netlify, or GitHub Pages).

## A few notes:

- Build the design as a faithful, responsive page using your own HTML/CSS/JS. Libraries are fine for logic, but we want to see your own styling and layout.
