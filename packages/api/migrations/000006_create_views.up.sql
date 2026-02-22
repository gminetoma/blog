CREATE TABLE IF NOT EXISTS
    views (
        post_slug TEXT PRIMARY KEY,
        count BIGINT NOT NULL DEFAULT 0
    );
