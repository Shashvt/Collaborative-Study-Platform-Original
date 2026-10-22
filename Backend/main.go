package main

import (
	config "backend/internal/db-config"
	routes "backend/pkg"
	"net/http"
	"os"
	"strconv"
	"strings"

	"github.com/gin-gonic/gin"
)

func main() {
	r := gin.Default()

	// CORS Middleware supporting local development and deployed frontend URLs
	r.Use(func(c *gin.Context) {
		origin := c.Request.Header.Get("Origin")
		allowedOrigin := os.Getenv("FRONTEND_URL")

		if origin != "" {
			if origin == "http://localhost:3000" ||
				origin == "http://127.0.0.1:3000" ||
				(allowedOrigin != "" && (origin == allowedOrigin || strings.TrimSuffix(origin, "/") == strings.TrimSuffix(allowedOrigin, "/"))) {
				c.Writer.Header().Set("Access-Control-Allow-Origin", origin)
			} else if allowedOrigin == "*" || allowedOrigin == "" {
				// Fallback allows preview deployments and testing
				c.Writer.Header().Set("Access-Control-Allow-Origin", origin)
			}
		}

		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With, Accept")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(http.StatusNoContent)
			return
		}
		c.Next()
	})

	// Health check endpoint for cloud monitoring and deployment health checks
	r.GET("/health", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"status":  "ok",
			"message": "Collaborative Study Platform backend is active",
		})
	})

	routes.Routes(r)

	// Database configuration with environment variable support
	dbPort := 5432
	if pStr := os.Getenv("DB_PORT"); pStr != "" {
		if p, err := strconv.Atoi(pStr); err == nil {
			dbPort = p
		}
	}

	dbConfig := config.Config{
		Host:     getEnv("DB_HOST", "localhost"),
		Port:     dbPort,
		User:     getEnv("DB_USER", "shashvtsharma"),
		Password: getEnv("DB_PASSWORD", "password"),
		DBName:   getEnv("DB_NAME", "collab"),
		SSLMode:  getEnv("DB_SSLMODE", "disable"),
	}

	config.InitializeDB(dbConfig)

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	r.Run(":" + port)
}

func getEnv(key, fallback string) string {
	if val := os.Getenv(key); val != "" {
		return val
	}
	return fallback
}
