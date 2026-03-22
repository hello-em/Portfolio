# Requirements Document

## Introduction

Migrate Emily Li's portfolio website (helloemerie.ca) from a multi-page plain HTML/CSS/Bootstrap site into a single-page React/TypeScript application styled with Tailwind CSS. The new site will incorporate reusable components and data-driven project pages, preserve all existing content and assets, and be deployed to GitHub Pages under the existing custom domain. Useful patterns from the `gemini-vibe-code-mar13` prototype (routing, component structure, dark mode context, Lightbox, etc.) should be carried forward into the production codebase.

---

## Glossary

- **Portfolio_App**: The new React/TypeScript/Vite application that replaces the plain HTML site.
- **Router**: React Router DOM v7, responsible for client-side navigation between pages.
- **Theme_Context**: A React context that stores and exposes the current light/dark mode preference.
- **Project_Data**: A TypeScript data file (or set of files) that holds all project metadata and content, typed against the `Project` interface.
- **Project_Card**: A reusable React component that renders a single project thumbnail, title, and category label on the Home and Archive pages.
- **Project_Detail_Page**: A React page component that renders the full case-study content for a single project, driven by `Project_Data`.
- **Lightbox**: A React component that displays a full-screen overlay of an image when triggered.
- **Navbar**: A React component rendered on every page containing the site logo/name and navigation links.
- **Footer**: A React component rendered on every page containing contact info and social links.
- **GitHub_Actions**: The CI/CD pipeline that builds and deploys the Portfolio_App to GitHub Pages.
- **CNAME**: The file placed in the build output that maps the GitHub Pages deployment to the custom domain `helloemerie.ca`.
- **Asset**: Any static file (image, PDF, SVG) referenced by the Portfolio_App.

---

## Requirements

### Requirement 1: Project Scaffolding and Tech Stack

**User Story:** As a developer, I want a clean React/TypeScript/Vite project with Tailwind CSS configured, so that I have a modern, maintainable foundation to build on.

#### Acceptance Criteria

1. THE Portfolio_App SHALL be scaffolded as a Vite project with the React and TypeScript template.
2. THE Portfolio_App SHALL use Tailwind CSS v4 via the `@tailwindcss/vite` plugin for all styling.
3. THE Portfolio_App SHALL use React Router DOM v7 for client-side routing.
4. THE Portfolio_App SHALL include a `tsconfig.json` with strict mode enabled.
5. THE Portfolio_App SHALL include a path alias `@/` resolving to the project `src/` directory.
6. WHEN the Vite build runs, THE Portfolio_App SHALL produce a `dist/` output directory containing all static assets.

---

### Requirement 2: Content Migration — All Pages

**User Story:** As a visitor, I want all existing portfolio content to be available in the new site, so that no work or information is lost during the migration.

#### Acceptance Criteria

1. THE Portfolio_App SHALL include a Home page (`/`) displaying the featured project list equivalent to `index.html`.
2. THE Portfolio_App SHALL include an About page (`/about`) with the bio, photo, and resume PDF link equivalent to `about.html`.
3. THE Portfolio_App SHALL include an Archive page (`/archive`) displaying the archived project list equivalent to `archive.html`.
4. THE Portfolio_App SHALL include individual Project Detail pages (`/project/:id`) for each of the following projects: Flex, UniversoleFit, YouTubeRedesign, Sawyer, Nodus, TDMySpend, GroceryVan, FindingYou, Jett, TicTacToe.
5. THE Portfolio_App SHALL include a Freelance Work page (`/freelance`) equivalent to `freelance-work.html`.
6. WHEN a visitor navigates to a project URL that does not exist in Project_Data, THE Router SHALL redirect the visitor to the Home page.

---

### Requirement 3: Project Data Model

**User Story:** As a developer, I want all project content defined in typed TypeScript data files, so that adding or editing projects does not require touching component code.

#### Acceptance Criteria

1. THE Portfolio_App SHALL define a `Project` TypeScript interface with fields: `id`, `title`, `subtitle`, `category`, `description`, `coverImage`, `tags`, `role`, `timeline`, `tools`, `sections`, and `reflection`.
2. THE Portfolio_App SHALL define a `ProjectSection` TypeScript interface with fields: `title` and `blocks`.
3. THE Portfolio_App SHALL define a `ProjectBlock` discriminated union type supporting block types: `text`, `image`, `image-grid`, and `figma-embed`.
4. THE Portfolio_App SHALL export a typed array of `Project` objects in `src/data/projects.ts` containing data for all ten migrated projects.
5. WHEN a `Project` object is missing a required field, THE TypeScript compiler SHALL report a type error at build time.

---

### Requirement 4: Reusable Component Library

**User Story:** As a developer, I want shared UI components for navigation, footer, project cards, and image display, so that the UI is consistent and easy to maintain.

#### Acceptance Criteria

1. THE Navbar SHALL render the site logo and navigation links (Home, About, Archive) on every page.
2. THE Footer SHALL render the contact email, social links (LinkedIn, Instagram, GitHub, YouTube), and copyright notice on every page.
3. THE Project_Card SHALL accept a `Project` object as a prop and render the cover image, title, and category label.
4. THE Lightbox SHALL accept an image URL and alt text as props and render a full-screen overlay when open.
5. WHEN the Lightbox is open and the visitor presses the Escape key, THE Lightbox SHALL close.
6. WHEN the Lightbox is open and the visitor clicks outside the image, THE Lightbox SHALL close.
7. THE Portfolio_App SHALL include a `ScrollToTop` component that scrolls the window to the top on every route change.

---

### Requirement 5: Dark Mode

**User Story:** As a visitor, I want to toggle between light and dark mode, so that I can view the portfolio in my preferred colour scheme.

#### Acceptance Criteria

1. THE Theme_Context SHALL store the current theme (`light` or `dark`) and expose a toggle function to all child components.
2. WHEN a visitor toggles the theme, THE Theme_Context SHALL persist the preference to `localStorage` under the key `theme`.
3. WHEN the Portfolio_App first loads, THE Theme_Context SHALL read the stored preference from `localStorage` and apply it; IF no preference is stored, THE Theme_Context SHALL default to `light`.
4. WHEN the theme is `dark`, THE Portfolio_App SHALL apply the Tailwind `dark` class to the root `<html>` element.
5. THE Navbar SHALL render a visible theme toggle control that calls the Theme_Context toggle function when activated.

---

### Requirement 6: Asset Migration

**User Story:** As a developer, I want all existing images, icons, and the resume PDF available in the new project, so that no visual content is broken after migration.

#### Acceptance Criteria

1. THE Portfolio_App SHALL copy all image assets from `Portfoilo/assets/images/` into the new project's `public/assets/images/` directory.
2. THE Portfolio_App SHALL copy `EmilyLi - Resume.pdf` into the new project's `public/` directory.
3. THE Portfolio_App SHALL copy the `logo.svg` favicon into the new project's `public/` directory and reference it in `index.html`.
4. WHEN the Vite build runs, THE Portfolio_App SHALL include all files from `public/` in the `dist/` output without transformation.

---

### Requirement 7: Typography and Visual Parity

**User Story:** As a visitor, I want the new site to feel visually consistent with the original, so that the brand identity is preserved.

#### Acceptance Criteria

1. THE Portfolio_App SHALL load the Google Fonts `DM Serif Display` and `Inter` typefaces.
2. THE Portfolio_App SHALL apply `DM Serif Display` to all heading elements (`h1`–`h3`) via Tailwind's font configuration.
3. THE Portfolio_App SHALL apply `Inter` as the default body font via Tailwind's font configuration.
4. THE Portfolio_App SHALL preserve the fade-in scroll animation behaviour for project cards on the Home and Archive pages.

---

### Requirement 8: GitHub Pages Deployment

**User Story:** As a developer, I want the site to be automatically built and deployed to GitHub Pages on every push to `main`, so that the live site at helloemerie.ca stays up to date.

#### Acceptance Criteria

1. THE Portfolio_App SHALL include a GitHub Actions workflow file at `.github/workflows/deploy.yml` that triggers on push to the `main` branch.
2. WHEN the GitHub Actions workflow runs, THE GitHub_Actions SHALL install dependencies, run `vite build`, and publish the `dist/` directory to the `gh-pages` branch.
3. THE Portfolio_App SHALL include a `CNAME` file containing `helloemerie.ca` in the `public/` directory so it is copied into `dist/` on every build.
4. THE Vite build configuration SHALL set `base` to `'/'` so that all asset paths resolve correctly under the custom domain.
5. WHEN the Router is used in production, THE Router SHALL use `BrowserRouter` with no `basename`, relying on the custom domain root.

---

### Requirement 9: Prototype Integration

**User Story:** As a developer, I want to reuse the best parts of the `gemini-vibe-code-mar13` prototype, so that proven patterns are not thrown away.

#### Acceptance Criteria

1. THE Portfolio_App SHALL adopt the `ThemeProvider` / `ThemeContext` pattern from the prototype's `src/context/ThemeContext.tsx`.
2. THE Portfolio_App SHALL adopt the `Lightbox` component from the prototype's `src/components/Lightbox.tsx` as the basis for image zoom on Project Detail pages.
3. THE Portfolio_App SHALL adopt the `Project`, `ProjectSection`, and `ProjectBlock` type definitions from the prototype's `src/types.ts` as the starting point for the production data model.
4. THE Portfolio_App SHALL adopt the `ScrollToTop` component from the prototype's `src/components/ScrollToTop.tsx`.
5. THE Portfolio_App SHALL NOT carry over the `@google/genai`, `better-sqlite3`, or `express` dependencies from the prototype, as they are not needed for a static portfolio.

---

### Requirement 10: Accessibility and SEO

**User Story:** As a visitor using assistive technology, I want the portfolio to be navigable and readable, so that the site is usable regardless of ability.

#### Acceptance Criteria

1. THE Portfolio_App SHALL set a descriptive `<title>` tag for each page (e.g., "Emily Li | Product Designer" for Home, "Emily Li | About" for About).
2. THE Portfolio_App SHALL include an `<html lang="en">` attribute on the root HTML element.
3. THE Portfolio_App SHALL provide non-empty `alt` attributes on all `<img>` elements that convey content.
4. THE Navbar SHALL use a `<nav>` element with an `aria-label` attribute.
5. THE Lightbox SHALL trap focus within the overlay while it is open and return focus to the triggering element when closed.
6. WHEN a visitor navigates using only a keyboard, THE Navbar SHALL allow all links to be reached and activated via Tab and Enter keys.
