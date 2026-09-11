# MEHR Admin database schema

Phase 2 uses Supabase Auth for identity and PostgreSQL for editorial data. All application tables have RLS enabled. A new authenticated account defaults to the `viewer` role; an existing administrator promotes users through `user_roles`.

## Editorial model

- `site_configurations` stores a single working draft plus immutable published/archived snapshots.
- `service_records`, `testimonials`, `impact_cards`, `ventures`, and `contact_wallpapers` are normalized editorial resources. Their `workspace` field separates draft from published records.
- `media_assets` stores metadata and Storage references only—never binary data.
- `audit_events` captures important changes without storing unnecessary private content.

## Safety invariants

- Public visitors never query draft tables or admin endpoints.
- Only `admin` can alter published versions or roles; `editor` can modify draft resources; `viewer` is read-only.
- Media rows use restrictive foreign keys, so assets cannot be deleted while referenced.
- The public site continues to consume only a validated published configuration snapshot in a later publishing phase.

The migration is at `admin/supabase/migrations/202609100001_initial_admin_schema.sql`. Review it before applying through the Supabase SQL editor or Supabase CLI.
