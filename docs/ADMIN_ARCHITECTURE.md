# MEHR Admin architecture

`admin/` is a separately runnable Next.js and TypeScript application. It authenticates through Supabase and never rewrites public HTML, CSS, or JavaScript. The public site remains a static ES-module application.

The admin reads and writes one private draft in `site_configurations`. Editor components hydrate missing fields from the canonical public `DEFAULT_CONFIG`, preserve saved records by stable ID, validate before saving, and expose draft-only state. Supabase RLS enforces Viewer, Editor, and Admin permissions independently of the interface.

The right-side preview frames the public website with `mehrPreview=1`. The public site requests a draft through `postMessage`, validates it with the same Phase 1 schema, then starts its existing behavior modules. Draft data is not exposed through a public database endpoint.

Publishing is intentionally excluded until Phase 3. That phase will validate the complete draft, create an immutable version, atomically change the published snapshot, and retain a focused change log.
