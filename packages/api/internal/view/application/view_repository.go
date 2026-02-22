package application

import "context"

type ViewRepository interface {
	Increment(ctx context.Context, postSlug string) error
	GetCount(ctx context.Context, postSlug string) (int64, error)
}
