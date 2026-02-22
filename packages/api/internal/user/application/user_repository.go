package application

import (
	"context"

	"api/internal/user/domain"
)

type (
	UserRepository interface {
		Create(ctx context.Context, user domain.User) error
		FindByID(ctx context.Context, id domain.UserID) (*domain.User, error)
	}
)
