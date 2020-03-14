package main

import (
	"fmt"
	"net/http"

	"github.com/gin-gonic/contrib/static"
	"github.com/gin-gonic/gin"
)

func main() {
	// Set the router as the default one shipped with Gin
	router := gin.Default()

	// Serve frontend static files
	router.Use(static.Serve("/", static.LocalFile("./../flip-reset/build", true)))

	// Setup route group for the API
	api := router.Group("/api")
	{
		api.GET("/", func(c *gin.Context) {
			c.JSON(http.StatusOK, gin.H{
				"message": "pong",
			})
		})
	}
	fmt.Println("Server started at localhost:3000")
	// Start and run the server
	router.Run(":8000")
}

func directmessage(c *gin.Context) {
	c.Header("Content-Type", "html/text")
	c.JSON(http.StatusOK, gin.H{
		"message": "direct message handler not implemented ",
	})

}

func upload(c *gin.Context) {
	c.Header("Content-Type", "html/text")
	c.JSON(http.StatusOK, gin.H{
		"message": "upload handler not implemented ",
	})
}
