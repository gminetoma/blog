package application

import (
	"context"

	"api/internal/auth/domain"
)

type (
	RefreshTokenRepository interface {
		Create(ctx context.Context, refreshToken domain.RefreshToken) error
		FindByToken(ctx context.Context, token string) (*domain.RefreshToken, error)
		Update(ctx context.Context, refreshToken domain.RefreshToken) error
	}
)
