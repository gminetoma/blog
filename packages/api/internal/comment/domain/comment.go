package domain

import "time"

type (
	CommentID string

	Comment struct {
		ID        CommentID
		PostSlug  string
		OwnerID   string
		Content   string
		ParentID  *CommentID
		CreatedAt time.Time
		UpdatedAt time.Time
		DeletedAt *time.Time
	}
)

func (c *Comment) Edit(content string, now time.Time) {
	c.Content = content
	c.UpdatedAt = now
}

func (c *Comment) Delete(now time.Time) {
	c.DeletedAt = &now
}

func (c *Comment) IsDeleted() bool {
	return c.DeletedAt != nil
}

func (c *Comment) OwnedBy(ownerID string) bool {
	return c.OwnerID == ownerID
}
