package infrastructure

import (
	"context"

	"api/internal/view/infrastructure/sqlc"
)

type PGViewRepository struct {
	Queries *sqlc.Queries
}

func (r *PGViewRepository) Increment(ctx context.Context, postSlug string) error {
	return r.Queries.IncrementView(ctx, postSlug)
}

func (r *PGViewRepository) GetCount(ctx context.Context, postSlug string) (int64, error) {
	return r.Queries.GetViewCount(ctx, postSlug)
}
