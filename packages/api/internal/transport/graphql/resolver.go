package graphql

import (
	"time"

	authApplication "api/internal/auth/application"
)

// This file will not be regenerated automatically.
//
// It serves as dependency injection for your app, add any dependencies you require
// here.

type Resolver struct {
	AuthService             authApplication.AuthService
	AccessTokenExpiry       time.Duration
	RefreshTokenExpiry      time.Duration
	RefreshTokenGracePeriod time.Duration
}
