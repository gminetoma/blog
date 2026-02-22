package auth

import (
	"context"

	"api/internal/auth/application"
	"api/internal/shared/cookies"
	"api/internal/shared/middleware"
)

func RefreshTokenFromContext(ctx context.Context, token *string) (string, error) {
	if token != nil && *token != "" {
		return *token, nil
	}

	req, ok := middleware.Request(ctx)
	if !ok {
		return "", application.ErrRequiredRefreshToken
	}

	if t, found := cookies.RefreshToken(req); found {
		return t, nil
	}

	return "", application.ErrRequiredRefreshToken
}
