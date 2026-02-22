package application

import (
	"context"

	"api/internal/like/domain"
)

type LikeRepository interface {
	Create(ctx context.Context, like domain.Like) error
	Delete(ctx context.Context, postSlug, ownerID string) error
	CountByPostSlug(ctx context.Context, postSlug string) (int64, error)
	ExistsByPostSlugAndOwnerID(ctx context.Context, postSlug, ownerID string) (bool, error)
}
