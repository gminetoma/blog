package application

import (
	"context"

	"api/internal/auth/domain"
)

type (
	CredentialsRepository interface {
		Create(ctx context.Context, credentials domain.Credentials) error
		FindByEmail(ctx context.Context, email string) (*domain.Credentials, error)
	}
)
