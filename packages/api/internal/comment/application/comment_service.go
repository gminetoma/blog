package application

import (
	"context"
	"errors"

	"api/internal/comment/domain"
	"api/internal/comment/infrastructure"
	"api/internal/comment/infrastructure/sqlc"
	"api/internal/shared/errs"

	"api/internal/shared/clock"
	"api/internal/shared/identity"
)

type (
	CommentService interface {
		Add(ctx context.Context, postSlug, content string, parentID *string) (*domain.Comment, error)
		Edit(ctx context.Context, id, content string) (*domain.Comment, error)
		Remove(ctx context.Context, id string) error
		List(ctx context.Context, postSlug string) ([]domain.Comment, error)
	}

	commentService struct {
		repo  CommentRepository
		clock clock.Clock
	}

	NewCommentServiceParams struct {
		DB    sqlc.DBTX
		Clock clock.Clock
	}
)

func NewCommentService(params NewCommentServiceParams) CommentService {
	return &commentService{
		repo:  &infrastructure.PGCommentRepository{Queries: sqlc.New(params.DB)},
		clock: params.Clock,
	}
}

func (s *commentService) Add(ctx context.Context, postSlug, content string, parentID *string) (*domain.Comment, error) {
	ownerID, err := identity.Require(ctx)
	if err != nil {
		return nil, err
	}

	var parent *domain.CommentID
	if parentID != nil {
		p := domain.CommentID(*parentID)
		parent = &p
	}

	comment := domain.NewComment(domain.NewCommentParams{
		PostSlug: postSlug,
		OwnerID:  ownerID,
		Content:  content,
		ParentID: parent,
		Now:      s.clock.Now(),
	})

	if err := s.repo.Create(ctx, *comment); err != nil {
		return nil, err
	}

	return comment, nil
}

func (s *commentService) Edit(ctx context.Context, id, content string) (*domain.Comment, error) {
	ownerID, err := identity.Require(ctx)
	if err != nil {
		return nil, err
	}

	comment, err := s.repo.FindByID(ctx, domain.CommentID(id))
	if err != nil {
		if errors.Is(err, errs.ErrNotFound) {
			return nil, ErrCommentNotFound
		}
		return nil, err
	}

	if comment.IsDeleted() {
		return nil, ErrCommentDeleted
	}

	if !comment.OwnedBy(ownerID) {
		return nil, ErrNotCommentOwner
	}

	comment.Edit(content, s.clock.Now())

	if err := s.repo.Update(ctx, *comment); err != nil {
		return nil, err
	}

	return comment, nil
}

func (s *commentService) Remove(ctx context.Context, id string) error {
	ownerID, err := identity.Require(ctx)
	if err != nil {
		return err
	}

	comment, err := s.repo.FindByID(ctx, domain.CommentID(id))
	if err != nil {
		if errors.Is(err, errs.ErrNotFound) {
			return ErrCommentNotFound
		}
		return err
	}

	if comment.IsDeleted() {
		return ErrCommentDeleted
	}

	if !comment.OwnedBy(ownerID) {
		return ErrNotCommentOwner
	}

	comment.Delete(s.clock.Now())

	return s.repo.Update(ctx, *comment)
}

func (s *commentService) List(ctx context.Context, postSlug string) ([]domain.Comment, error) {
	return s.repo.FindByPostSlug(ctx, postSlug)
}
