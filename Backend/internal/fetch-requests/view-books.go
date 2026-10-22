package fetchrequests

import (
	config "backend/internal/db-config"
	file_upload "backend/internal/fileupload"
	models "backend/pkg/model"

	"github.com/gin-gonic/gin"
)

func ViewBooks(c *gin.Context){
	db := config.GetDB()

	var books []models.Book

	// Fetching books with associated user data (including email)
	result := db.Preload("User").Find(&books)

	if result.Error != nil {
		c.JSON(500, gin.H{"error": "Failed to fetch books"})
		return
	}
	
	var response []gin.H
	for _, book := range books {
		response = append(response, gin.H{
			"book": gin.H{
				"id":          book.ID,
				"title":       book.Title,
				"author":      book.Author,
				"description": book.Description,
				"price":       book.Price,
				"image":       file_upload.RefreshS3URL(book.Image),
				"status":      book.Status,
			},
			"user_email": book.User.Email, 
		})
	}

	c.JSON(200, gin.H{"books": response})
}
