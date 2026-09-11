# MEHR media architecture

Images are uploaded to the Supabase Storage bucket `site-media`; metadata is recorded in `media_assets`. Allowed formats are JPEG, PNG, WebP, and SVG with a 10 MB limit. Binary data is never stored in PostgreSQL.

Editors can upload directly from each owning field or reuse an existing Media Library asset. Draft configuration stores the resulting public asset URL. The Media Library blocks deletion when the current draft still references that URL, and database foreign keys protect normalized references.

The bucket is publicly readable because the static GitHub Pages site must display published assets without authenticated requests. Upload, update, and deletion remain restricted to authenticated Editors and Admins through Storage RLS policies.
