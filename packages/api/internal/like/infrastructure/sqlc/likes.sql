-- name: CreateLike :exec
INSERT INTO
    likes (id, post_slug, owner_id, created_at)
VALUES
    ($1, $2, $3, $4);

-- name: DeleteLike :exec
DELETE FROM likes
WHERE
    post_slug = $1
    AND owner_id = $2;

-- name: CountLikesByPostSlug :one
SELECT
    COUNT(*) FROM likes
WHERE
    post_slug = $1;

-- name: LikeExistsByPostSlugAndOwnerID :one
SELECT
    EXISTS (
        SELECT 1 FROM likes
        WHERE post_slug = $1 AND owner_id = $2
    );
