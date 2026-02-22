package domain

import (
	"time"

	"api/internal/shared/id"
)

type NewCommentParams struct {
	PostSlug string
	OwnerID  string
	Content  string
	ParentID *CommentID
	Now      time.Time
}

func NewComment(params NewCommentParams) *Comment {
	return &Comment{
		ID:        CommentID(id.Make()),
		PostSlug:  params.PostSlug,
		OwnerID:   params.OwnerID,
		Content:   params.Content,
		ParentID:  params.ParentID,
		CreatedAt: params.Now,
		UpdatedAt: params.Now,
	}
}
