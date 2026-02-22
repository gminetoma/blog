CREATE TABLE IF NOT EXISTS
    likes (
        id TEXT PRIMARY KEY,
        post_slug TEXT NOT NULL,
        owner_id TEXT NOT NULL,
        created_at TIMESTAMPTZ NOT NULL,
        UNIQUE (post_slug, owner_id)
    );
