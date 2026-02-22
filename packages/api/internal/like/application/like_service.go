package application

import (
	"context"

	"api/internal/like/domain"
	"api/internal/like/infrastructure"
	"api/internal/like/infrastructure/sqlc"

	"api/internal/shared/clock"
	"api/internal/shared/identity"
)

type (
	LikeService interface {
		Toggle(ctx context.Context, postSlug string) (liked bool, err error)
		Count(ctx context.Context, postSlug string) (int64, error)
	}

	likeService struct {
		repo  LikeRepository
		clock clock.Clock
	}

	NewLikeServiceParams struct {
		DB    sqlc.DBTX
		Clock clock.Clock
	}
)

func NewLikeService(params NewLikeServiceParams) LikeService {
	return &likeService{
		repo:  &infrastructure.PGLikeRepository{Queries: sqlc.New(params.DB)},
		clock: params.Clock,
	}
}

func (s *likeService) Toggle(ctx context.Context, postSlug string) (bool, error) {
	ownerID, err := identity.Require(ctx)
	if err != nil {
		return false, err
	}

	exists, err := s.repo.ExistsByPostSlugAndOwnerID(ctx, postSlug, ownerID)
	if err != nil {
		return false, err
	}

	if exists {
		return false, s.repo.Delete(ctx, postSlug, ownerID)
	}

	like := domain.NewLike(domain.NewLikeParams{
		PostSlug: postSlug,
		OwnerID:  ownerID,
		Now:      s.clock.Now(),
	})

	return true, s.repo.Create(ctx, *like)
}

func (s *likeService) Count(ctx context.Context, postSlug string) (int64, error) {
	return s.repo.CountByPostSlug(ctx, postSlug)
}
