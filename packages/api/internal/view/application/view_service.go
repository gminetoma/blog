package application

import (
	"context"

	"api/internal/view/infrastructure"
	"api/internal/view/infrastructure/sqlc"
)

type (
	ViewService interface {
		Track(ctx context.Context, postSlug string) error
		Count(ctx context.Context, postSlug string) (int64, error)
	}

	viewService struct {
		repo ViewRepository
	}

	NewViewServiceParams struct {
		DB sqlc.DBTX
	}
)

func NewViewService(params NewViewServiceParams) ViewService {
	return &viewService{
		repo: &infrastructure.PGViewRepository{Queries: sqlc.New(params.DB)},
	}
}

func (s *viewService) Track(ctx context.Context, postSlug string) error {
	return s.repo.Increment(ctx, postSlug)
}

func (s *viewService) Count(ctx context.Context, postSlug string) (int64, error) {
	return s.repo.GetCount(ctx, postSlug)
}
