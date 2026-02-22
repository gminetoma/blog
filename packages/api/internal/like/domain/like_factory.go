package domain

import (
	"time"

	"api/internal/shared/id"
)

type NewLikeParams struct {
	PostSlug string
	OwnerID  string
	Now      time.Time
}

func NewLike(params NewLikeParams) *Like {
	return &Like{
		ID:        LikeID(id.Make()),
		PostSlug:  params.PostSlug,
		OwnerID:   params.OwnerID,
		CreatedAt: params.Now,
	}
}
