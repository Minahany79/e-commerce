export const swaggerDocument = {
  "swagger": "2.0",
  "info": {
    "version": "1.0.0",
    "title": "Demo",
    "description": "Demo - The initial structure for the project",
    "license": {
      "name": "MIT",
      "url": "https://opensource.org/licenses/MIT"
    }
  },
  "host": "localhost:3001",
  "tags": [
    {
      "name": "Ping",
      "description": "Check the availability of the application"
    }
  ],
  "paths": {
    "/api/v1/Misc/Ping": {
      "get": {
        "tags": [
          "Ping"
        ],
        "summary": "Checks if the service is working",
        "responses": {
          "200": {
            "description": "success"
          }
        }
      }
    },
  },
  "securityDefinitions": {
    "bearerAuth": {
      "name": "Authorization",
      "in": "header",
      "type": "apiKey",
      "description": "JWT Authorization header"
    }
  },
  "security": [{ "bearerAuth": [] }]
}