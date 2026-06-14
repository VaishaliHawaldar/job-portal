<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

## File & naming conventions

- **Reserved Next.js files stay lowercase** — `page.tsx`, `layout.tsx`,
  `loading.tsx`, `error.tsx`, `route.ts`, `not-found.tsx`, etc.
  (framework-enforced, not a choice).
- **All other files use kebab-case** — `job-board.tsx`,
  `application-modal.tsx`, `jobs-repository.ts`. No exceptions for components.
- **Export/component names stay PascalCase** — only the *filename* is
  kebab-case. `job-board.tsx` exports `JobBoard`.
- **Folders**: `src/app` = routes only; `src/components` = UI;
  `src/lib` = non-UI logic (data access, utils, domain types).

**Why:** lowercase filenames eliminate case-sensitivity bugs between
macOS/Windows (case-insensitive) and Linux CI/AWS (case-sensitive), and
match Next's reserved files.

<!-- END:nextjs-agent-rules -->
