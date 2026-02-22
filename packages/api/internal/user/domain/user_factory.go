package domain

import (
	"time"

	"api/internal/shared/id"
)

type (
	NewUserParams struct {
		Now time.Time
	}
)

func NewUser(params NewUserParams) *User {
	return &User{
		ID:        UserID(id.Make()),
		CreatedAt: params.Now,
	}
}
