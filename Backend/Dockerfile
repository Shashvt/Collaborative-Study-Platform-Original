# Multi-stage build for Go Backend
FROM golang:1.24-alpine AS builder

WORKDIR /app

RUN apk add --no-cache git ca-certificates

# Cache dependencies
COPY go.mod go.sum ./
RUN go mod download

# Copy source code
COPY . .

# Build statically linked binary
RUN CGO_ENABLED=0 GOOS=linux go build -ldflags="-w -s" -o server .

# Final minimal runtime image
FROM alpine:3.20

WORKDIR /app

RUN apk add --no-cache ca-certificates tzdata

COPY --from=builder /app/server .

EXPOSE 8080

CMD ["./server"]
