package id

import "api/internal/shared/ulid"

func Make() string {
	return ulid.Make()
}
