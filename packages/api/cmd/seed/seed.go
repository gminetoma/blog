package main

import (
	"context"
	"errors"
	"log/slog"
	"os"

	authDomain "api/internal/auth/domain"
	authInfrastructure "api/internal/auth/infrastructure"
	authSQLC "api/internal/auth/infrastructure/sqlc"
	userDomain "api/internal/user/domain"
	userInfrastructure "api/internal/user/infrastructure"
	userSQLC "api/internal/user/infrastructure/sqlc"

	"api/internal/shared/clock"
	"api/internal/shared/config"
	"api/internal/shared/database"
	"api/internal/shared/errs"
)

const (
	adminEmail    = "admin@example.com"
	adminPassword = "Password@123"
)

func main() {
	cfg := config.LoadEnv()

	db := database.PGXConnect(cfg.DatabaseURL)
	defer db.Close()

	ctx := context.Background()

	userRepo := &userInfrastructure.PGUserRepository{
		Queries: userSQLC.New(db),
	}

	credsRepo := &authInfrastructure.PGCredentialsRepository{
		Queries: authSQLC.New(db),
	}

	existing, err := credsRepo.FindByEmail(ctx, adminEmail)
	if err != nil {
		if !errors.Is(errs.ErrNotFound, err) {
			slog.Error("failed to check existing credentials", "error", err)
			os.Exit(1)
		}
	}

	if existing != nil {
		slog.Info("seed already exists, skipping", "email", adminEmail, "password", adminPassword)
		return
	}

	c := clock.New()

	user := userDomain.NewUser(userDomain.NewUserParams{
		Now: c.Now(),
	})

	if err := userRepo.Create(ctx, *user); err != nil {
		slog.Error("failed to create user", "error", err)
		os.Exit(1)
	}

	creds, errs := authDomain.NewCredentials(authDomain.NewCredentialsParams{
		OwnerID:  authDomain.OwnerID(user.ID),
		Email:    adminEmail,
		Password: adminPassword,
		Now:      c.Now(),
	})
	if errs != nil {
		slog.Error("failed to create credentials", "error", err)
		os.Exit(1)
	}

	if err := credsRepo.Create(ctx, *creds); err != nil {
		slog.Error("failed to persist credentials", "error", err)
		os.Exit(1)
	}

	slog.Info("seed completed", "email", adminEmail, "password", adminPassword)
}
