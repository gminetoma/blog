package infrastructure

import (
	"context"
	"database/sql"
	"errors"

	"api/internal/user/domain"
	"api/internal/user/infrastructure/sqlc"

	"api/internal/shared/errs"
)

type (
	PGUserRepository struct {
		Queries *sqlc.Queries
	}
)

func (r *PGUserRepository) Create(ctx context.Context, user domain.User) error {
	return r.Queries.CreateUser(ctx, sqlc.CreateUserParams{
		ID:        string(user.ID),
		CreatedAt: user.CreatedAt,
	})
}

func (r *PGUserRepository) FindByID(ctx context.Context, id domain.UserID) (*domain.User, error) {
	user, err := r.Queries.FindUserByID(ctx, string(id))
	if err != nil {
		if errors.Is(err, sql.ErrNoRows) {
			return nil, errs.ErrNotFound
		}

		return nil, err
	}

	return &domain.User{
		ID:        domain.UserID(user.ID),
		CreatedAt: user.CreatedAt,
	}, nil
}
