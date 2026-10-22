package middleware

import (
	config "backend/internal/db-config"
	models "backend/pkg/model"
	"net/http"
	"strings"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

// ExtractUserID retrieves the authenticated user's ID from cookies or Authorization Bearer header
func ExtractUserID(c *gin.Context) string {
	if userID, err := c.Cookie("user_id"); err == nil && userID != "" {
		return userID
	}
	authHeader := c.GetHeader("Authorization")
	if strings.HasPrefix(authHeader, "Bearer ") {
		return strings.TrimSpace(strings.TrimPrefix(authHeader, "Bearer "))
	}
	if idVal, exists := c.Get("userID"); exists {
		if idStr, ok := idVal.(string); ok && idStr != "" {
			return idStr
		}
	}
	return ""
}

func AuthMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		userID := ExtractUserID(c)
		if userID == "" {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Unauthorized, no session or authorization token found"})
			c.Abort()
			return
		}

		// Check if the user exists in the database
		var user models.User
		db := config.GetDB()
		if err := db.Where("id = ?", userID).First(&user).Error; err != nil {
			if err == gorm.ErrRecordNotFound {
				c.JSON(http.StatusUnauthorized, gin.H{"error": "Unauthorized, user not found"})
			} else {
				c.JSON(http.StatusInternalServerError, gin.H{"error": "Database error"})
			}
			c.Abort()
			return
		}

		// Pass the user data through context
		c.Set("user", user)
		c.Set("userID", userID)

		// Continue with the next handler
		c.Next()
	}
}
