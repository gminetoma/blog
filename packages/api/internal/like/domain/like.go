package domain

import "time"

type (
	LikeID string

	Like struct {
		ID        LikeID
		PostSlug  string
		OwnerID   string
		CreatedAt time.Time
	}
)
