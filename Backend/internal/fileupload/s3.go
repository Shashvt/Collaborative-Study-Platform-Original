package file_upload

import (
	"os"

	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/credentials"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/aws/aws-sdk-go/service/s3"
)

func getS3Config() (*s3.S3, string, error) {
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
