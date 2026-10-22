package file_upload

import (
	"net/url"
	"os"
	"strings"
	"time"

	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/credentials"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/aws/aws-sdk-go/service/s3"
)

func GetS3Config() (*s3.S3, string, error) {
	region := os.Getenv("AWS_REGION")
	if region == "" {
		region = "ap-southeast-2"
	}

	bucket := os.Getenv("AWS_BUCKET")
	if bucket == "" {
		bucket = "csp-vault-storage-2026"
	}

	cfg := &aws.Config{
		Region: aws.String(region),
	}

	accessKey := os.Getenv("AWS_ACCESS_KEY_ID")
	secretKey := os.Getenv("AWS_SECRET_ACCESS_KEY")
	if accessKey != "" && secretKey != "" {
		cfg.Credentials = credentials.NewStaticCredentials(accessKey, secretKey, "")
	}

	sess, err := session.NewSession(cfg)
	if err != nil {
		return nil, "", err
	}

	return s3.New(sess), bucket, nil
}

func getS3Config() (*s3.S3, string, error) {
	return GetS3Config()
}

// RefreshS3URL inspects a stored S3 URL, extracts the S3 key, and generates a fresh 7-day presigned GET URL
// so files remain accessible indefinitely regardless of when they were uploaded.
func RefreshS3URL(rawURL string) string {
	if rawURL == "" || !strings.Contains(rawURL, "amazonaws.com") {
		return rawURL
	}

	u, err := url.Parse(rawURL)
	if err != nil {
		return rawURL
	}

	key := strings.TrimPrefix(u.Path, "/")
	if unescaped, err := url.PathUnescape(key); err == nil {
		key = unescaped
	}

	if key == "" {
		return rawURL
	}

	svc, bucket, err := GetS3Config()
	if err != nil {
		return rawURL
	}

	// In case of path-style URL where bucket is in the path
	if strings.HasPrefix(key, bucket+"/") {
		key = strings.TrimPrefix(key, bucket+"/")
	}

	getReq, _ := svc.GetObjectRequest(&s3.GetObjectInput{
		Bucket: aws.String(bucket),
		Key:    aws.String(key),
	})
	freshURL, err := getReq.Presign(7 * 24 * time.Hour)
	if err != nil {
		return rawURL
	}

	return freshURL
}
