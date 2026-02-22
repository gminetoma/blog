CREATE TABLE IF NOT EXISTS
    comments (
        id TEXT PRIMARY KEY,
        post_slug TEXT NOT NULL,
        owner_id TEXT NOT NULL,
        content TEXT NOT NULL,
        parent_id TEXT REFERENCES comments (id),
        created_at TIMESTAMPTZ NOT NULL,
        updated_at TIMESTAMPTZ NOT NULL,
        deleted_at TIMESTAMPTZ
    );