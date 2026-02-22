package application

import (
	"context"

	"api/internal/comment/domain"
)

type CommentRepository interface {
	Create(ctx context.Context, comment domain.Comment) error
	FindByID(ctx context.Context, id domain.CommentID) (*domain.Comment, error)
	FindByPostSlug(ctx context.Context, postSlug string) ([]domain.Comment, error)
	Update(ctx context.Context, comment domain.Comment) error
}
