package fetchrequests

import (
	config "backend/internal/db-config"
	file_upload "backend/internal/fileupload"
	models "backend/pkg/model"

	"github.com/gin-gonic/gin"
)

func FetchNotes(c *gin.Context) {
	// Retrieve from body in JSON
	var requestBody struct {
		Year        int    `json:"year"`
		SubjectCode string `json:"subjectCode"`
		Stream      string `json:"stream"`
	}

	if err := c.ShouldBindJSON(&requestBody); err != nil {
		c.JSON(400, gin.H{"error": "Invalid request"})
		return
	}

	db := config.GetDB()

	// Create a slice to store the notes
	var notes []models.Note
	query := db.Where("year = ? AND subject = ? AND status != ?", requestBody.Year, requestBody.SubjectCode, "pending")
	if requestBody.Stream != "" {
		query = query.Where("stream = ?", requestBody.Stream)
	}
	result := query.Find(&notes)

	if result.Error != nil {
		c.JSON(500, gin.H{"error": "Failed to fetch notes"})
		return
	}

	// Filter out any pending notes and refresh S3 URLs so they never expire
	var approvedNotes []models.Note
	for _, note := range notes {
		if note.Status != "pending" {
			note.Content = file_upload.RefreshS3URL(note.Content)
			approvedNotes = append(approvedNotes, note)
		}
	}

	c.JSON(200, gin.H{"notes": approvedNotes})
}
