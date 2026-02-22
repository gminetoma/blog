package infrastructure

import (
	"context"

	"api/internal/like/domain"
	"api/internal/like/infrastructure/sqlc"
)

type PGLikeRepository struct {
	Queries *sqlc.Queries
}

func (r *PGLikeRepository) Create(ctx context.Context, like domain.Like) error {
	return r.Queries.CreateLike(ctx, sqlc.CreateLikeParams{
		ID:        string(like.ID),
		PostSlug:  like.PostSlug,
		OwnerID:   like.OwnerID,
		CreatedAt: like.CreatedAt,
	})
}

func (r *PGLikeRepository) Delete(ctx context.Context, postSlug, ownerID string) error {
	return r.Queries.DeleteLike(ctx, sqlc.DeleteLikeParams{
		PostSlug: postSlug,
		OwnerID:  ownerID,
	})
}

func (r *PGLikeRepository) CountByPostSlug(ctx context.Context, postSlug string) (int64, error) {
	return r.Queries.CountLikesByPostSlug(ctx, postSlug)
}

func (r *PGLikeRepository) ExistsByPostSlugAndOwnerID(ctx context.Context, postSlug, ownerID string) (bool, error) {
	return r.Queries.LikeExistsByPostSlugAndOwnerID(ctx, sqlc.LikeExistsByPostSlugAndOwnerIDParams{
		PostSlug: postSlug,
		OwnerID:  ownerID,
	})
}
