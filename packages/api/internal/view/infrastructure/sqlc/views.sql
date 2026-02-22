-- name: IncrementView :exec
INSERT INTO
    views (post_slug, count)
VALUES
    ($1, 1)
ON CONFLICT (post_slug) DO UPDATE
SET
    count = views.count + 1;

-- name: GetViewCount :one
SELECT
    count
FROM
    views
WHERE
    post_slug = $1;
