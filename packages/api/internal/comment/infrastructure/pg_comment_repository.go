package infrastructure

import (
	"context"
	"database/sql"
	"errors"
	"time"

	"api/internal/comment/domain"
	"api/internal/comment/infrastructure/sqlc"

	"api/internal/shared/errs"
)

type PGCommentRepository struct {
	Queries *sqlc.Queries
}

func (r *PGCommentRepository) Create(ctx context.Context, comment domain.Comment) error {
	var parentID sql.NullString
	if comment.ParentID != nil {
		parentID = sql.NullString{String: string(*comment.ParentID), Valid: true}
	}

	return r.Queries.CreateComment(ctx, sqlc.CreateCommentParams{
		ID:        string(comment.ID),
		PostSlug:  comment.PostSlug,
		OwnerID:   comment.OwnerID,
		Content:   comment.Content,
		ParentID:  parentID,
		CreatedAt: comment.CreatedAt,
		UpdatedAt: comment.UpdatedAt,
	})
}

func (r *PGCommentRepository) FindByID(ctx context.Context, id domain.CommentID) (*domain.Comment, error) {
	row, err := r.Queries.FindCommentByID(ctx, string(id))
	if err != nil {
		if errors.Is(err, sql.ErrNoRows) {
			return nil, errs.ErrNotFound
		}
		return nil, err
	}

	return toDomain(row), nil
}

func (r *PGCommentRepository) FindByPostSlug(ctx context.Context, postSlug string) ([]domain.Comment, error) {
	rows, err := r.Queries.FindCommentsByPostSlug(ctx, postSlug)
	if err != nil {
		return nil, err
	}

	comments := make([]domain.Comment, len(rows))
	for i, row := range rows {
		comments[i] = *toDomain(row)
	}

	return comments, nil
}

func (r *PGCommentRepository) Update(ctx context.Context, comment domain.Comment) error {
	var deletedAt sql.NullTime
	if comment.DeletedAt != nil {
		deletedAt = sql.NullTime{Time: *comment.DeletedAt, Valid: true}
	}

	return r.Queries.UpdateComment(ctx, sqlc.UpdateCommentParams{
		ID:        string(comment.ID),
		Content:   comment.Content,
		UpdatedAt: comment.UpdatedAt,
		DeletedAt: deletedAt,
	})
}

func toDomain(row sqlc.Comment) *domain.Comment {
	c := &domain.Comment{
		ID:        domain.CommentID(row.ID),
		PostSlug:  row.PostSlug,
		OwnerID:   row.OwnerID,
		Content:   row.Content,
		CreatedAt: row.CreatedAt,
		UpdatedAt: row.UpdatedAt,
	}

	if row.ParentID.Valid {
		p := domain.CommentID(row.ParentID.String)
		c.ParentID = &p
	}

	if row.DeletedAt.Valid {
		t := row.DeletedAt.Time
		c.DeletedAt = &t
	}

	return c
}

func nullTime(t *time.Time) sql.NullTime {
	if t == nil {
		return sql.NullTime{}
	}
	return sql.NullTime{Time: *t, Valid: true}
}
