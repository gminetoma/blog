-- name: CreateComment :exec
INSERT INTO
    comments (id, post_slug, owner_id, content, parent_id, created_at, updated_at)
VALUES
    ($1, $2, $3, $4, $5, $6, $7);

-- name: FindCommentByID :one
SELECT
    id, post_slug, owner_id, content, parent_id, created_at, updated_at, deleted_at
FROM
    comments
WHERE
    id = $1;

-- name: FindCommentsByPostSlug :many
SELECT
    id, post_slug, owner_id, content, parent_id, created_at, updated_at, deleted_at
FROM
    comments
WHERE
    post_slug = $1
    AND deleted_at IS NULL
ORDER BY
    created_at ASC;

-- name: UpdateComment :exec
UPDATE comments
SET
    content = $2,
    updated_at = $3,
    deleted_at = $4
WHERE
    id = $1;
