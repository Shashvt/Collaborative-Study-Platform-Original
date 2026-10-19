package file_upload

import (
	config "backend/internal/db-config"
	models "backend/pkg/model"
	"fmt"
	"log"
	"path/filepath"
	"time"

	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/service/s3"
	"github.com/gin-gonic/gin"
)

func BookRequest(c *gin.Context) {
    // Retrieve query parameters for file path and name
    var RequestBody struct {
        Title       string  `json:"title"`
        Author      string  `json:"author"`
        Description string  `json:"description"`
        Price       float64 `json:"price"`
        ImageName   string  `json:"imageName"`
    }

    // Get the user ID from the cookie (or however it is stored in your application)
    userID, err := c.Cookie("user_id")
    if err != nil {
        c.JSON(401, gin.H{"error": "User not authenticated"})
        return
    }

    // Parse the request body
    if err := c.BindJSON(&RequestBody); err != nil {
        c.JSON(400, gin.H{"error": "Invalid request body"})
        return
    }

    var putURL, getURL string
    if RequestBody.ImageName != "" {
        svc, bucket, err := getS3Config()
        if err != nil {
            log.Println("Failed to create AWS session:", err)
        } else {
            cleanName := filepath.Base(RequestBody.ImageName)
            key := fmt.Sprintf("books/%s/%d_%s", userID, time.Now().Unix(), cleanName)

            putReq, _ := svc.PutObjectRequest(&s3.PutObjectInput{
                Bucket: aws.String(bucket),
                Key:    aws.String(key),
            })
            putURL, err = putReq.Presign(15 * time.Minute)
            if err != nil {
                log.Println("Failed to sign PUT request for book image:", err)
            }

            getReq, _ := svc.GetObjectRequest(&s3.GetObjectInput{
                Bucket: aws.String(bucket),
                Key:    aws.String(key),
            })
            getURL, err = getReq.Presign(7 * 24 * time.Hour)
            if err != nil {
                log.Println("Failed to sign GET request for book image:", err)
            }
        }
    }

    db := config.GetDB()
    record := models.Book{
        Title:       RequestBody.Title,
        Author:      RequestBody.Author,
        Description: RequestBody.Description,
        Price:       RequestBody.Price,
        Image:       getURL,
        Status:      "approved",
        UserID:      userID,
    }
    if err := db.Create(&record).Error; err != nil {
        log.Println("Failed to store file record:", err)
        c.JSON(500, gin.H{"error": "Failed to store file record in database"})
        return
    }

    // Return the PUT URL for uploading to the client
    c.JSON(200, gin.H{
        "message":    "Successfully created book request",
        "upload_url": putURL,
        "book":       record,
    })
}
