package application

import "api/internal/auth/domain"

type TokenService interface {
	Generate(ownerID domain.OwnerID) (string, error)
	Verify(token string) (domain.OwnerID, error)
}
