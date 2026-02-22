package application

import "errors"

var (
	ErrCommentNotFound = errors.New("comment.not-found")
	ErrNotCommentOwner = errors.New("comment.not-owner")
	ErrCommentDeleted  = errors.New("comment.already-deleted")
)
