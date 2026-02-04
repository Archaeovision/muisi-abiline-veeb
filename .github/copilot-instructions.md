# MuISi Abiline - AI Coding Instructions

## Project Overview
Estonian museum label printing solution built with Astro. Static site that showcases the MuISi Abiline browser extension for printing labels from the Muuseumide Infosüsteem (MuIS).

**Language**: Estonian (use `et-EE` locale for dates, content, and UI text)

## Core Architecture

### Framework Setup
- **Astro 5** static site (`output: "static"`)
- MDX integration for rich content pages
- React integration for interactive components (IIIF viewers)
- No SSR - all pages are pre-rendered at build time

### Content Collections
The `kirjutised` (writings) collection at [src/content.config.ts](src/content.config.ts):
- Uses Astro's glob loader to source from `src/pages/kirjutised/**/*.{md,mdx}`
- Schema requires: `title`, `description`, `author`, `pubDate` (coerced to Date), optional `updatedDate`
- Content lives in pages directory (not separate content directory) for simpler routing
- Access via `getCollection("kirjutised")` - returns entries with `.id`, `.data` properties

### File-based Routing
- `.astro`, `.md`, `.mdx` files in `src/pages/` become routes
- `kirjutised/` folder contains both the index and individual posts
- Remove file extensions from IDs: `toSlug = (id) => id.replace(/\.(md|mdx)$/i, "")`

## Layout System

**BaseLayout.astro**: Root layout for all pages
- Sets HTML lang="et", includes meta tags, favicon, analytics
- Wraps content with Header, Footer, and back-to-top link
- Back-to-top appears via CSS class toggle when `scrollY > window.innerHeight`

**Kirjutised.astro**: Blog post layout for writings
- Extends BaseLayout, adds breadcrumb navigation and formatted date
- Use for posts in the kirjutised collection

**MdPage.astro**: Simple markdown page layout
- Basic container with optional title from frontmatter
- Use for standalone content pages

## Component Patterns

### IIIF Viewers
Two viewer types via [IIIIF.astro](src/components/IIIIF.astro) wrapper:

1. **2D Images** (default): Uses `@samvera/clover-iiif` React component
   - `<CloverViewer client:only="react" iiifContent={manifest} />`

2. **3D Models** (`viewer="3d"`): Custom [AlephIIIF.tsx](src/components/AlephIIIF.tsx)
   - Uses `aleph-r3f` viewer with React Three Fiber
   - Extracts glTF/GLB URLs from IIIF manifest JSON
   - Loading states: "Laen 3D mudelit..." (Estonian)
   - Props: `envPreset="studio"`, optional `rotationPreset`
   - Hydration: `client:load` directive

**Error Handling Pattern**: Both viewers show Estonian error messages (e.g., "IIIF manifestist ei leitud glTF/GLB faili")

### React Hydration
- Use `client:load` for interactive components needed on page load
- Use `client:only="react"` when component has no SSR output

## Styling

**Global SCSS** ([src/styles/global.scss](src/styles/global.scss)):
- Custom properties: `--yellow: #e6ff84`, `--dark: #212529`, `--max-width: 1140px`
- Responsive breakpoint: `$bp-lg: 900px`
- Fluid typography with `clamp()` for h1-h4
- Flexbox page shell pattern for footer at bottom

**Import style**: `import "../styles/global.scss"` directly in layouts (Astro handles SCSS compilation)

## Utilities

### Date Formatting
[src/utils/date.ts](src/utils/date.ts) - `formatDateEt(value: string | Date)`:
- Returns localized Estonian date: "15. jaanuar 2026"
- Uses `Intl.DateTimeFormat` with `et-EE` locale
- Handles both Date objects and date strings

## Development Workflow

**Commands**:
- `npm run dev` - Start dev server
- `npm run build` - Production build to `dist/`
- `npm run preview` - Preview production build locally

**Content Creation**:
1. Add `.md` or `.mdx` file to `src/pages/kirjutised/`
2. Include frontmatter: `layout: ../../layouts/Kirjutised.astro`, plus collection schema fields
3. File automatically appears in collection and generates route at `/kirjutised/{filename}`

**Asset Handling**:
- Import images from `src/assets/` using `astro:assets`
- Use `<Image>` component with explicit width/height
- Static assets in `public/` served as-is

## Project Conventions

- **Component naming**: React components use `.tsx`, Astro components use `.astro`
- **Paths**: Always use relative imports (`../` or `./`)
- **Estonian content**: All user-facing text in Estonian, including loading states and errors
- **No TypeScript config**: Relies on Astro's built-in TypeScript setup
- **Client directives**: Be explicit about hydration strategy for React components
