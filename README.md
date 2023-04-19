# Demo Structure

# Environment vars
This project uses the following environment variables:

| Name                          | Description                         | Default Value                                  |
| ----------------------------- | ------------------------------------| -----------------------------------------------|
|PORT           | Custom port that the application will be running on           | 3001     |
|SERVICE_NAME           | The name of the current service          | LMS Admin     |
|BASE_URL           | Project base url         | /api/v1     |
|DEFAULT_PAGE_SIZE           | Default page size for the pagination        | 5    |
|DEFAULT_PAGE_NUMBER           | Default page number for the pagination        | 0    |
|NODE_ENV           | Current environment      | dev    |
|DB_TYPE           |  Database type    | postgres    |
|DB_HOST           |  Database server host    | localhost    |
|DB_PORT           |  Database port   | 5432    |
|DB_USERNAME           |  Database username   | postgres    |
|DB_PASSWORD           |  Database password   | postgres    |
|DB_INSTANCE           |  Database name   | auth_db    |

# Pre-requisites [Development]
- Install [Node.js](https://nodejs.org/en/)
- Install typorm globally
```
npm install typeorm -g --save
```

# Getting started
- Clone the repository
```
https://github.com/TransformUs/authenticator.git
```
- Install dependencies
```
cd authenticator
npm install
```
- Build and run the project
```
docker-compose build
docker-compose up
```
- Applying DB migrations
```
npm run migration:run
```

- Build and run the project (development)
```
npm run start
```

Navigate to `http://localhost:3001`

- Testing the application
```
      http://localhost:3001/api/v1/misc/ping
      Expected Response:
      "PONG !! from authenticator - Mon Aug 22 2022 20:06:13 GMT+0200 (Eastern European Standard Time)"
```


## Project Structure
The folder structure of this app is explained below:

| Name | Description |
| ------------------------ | ---------------------------------------------------------------------------------------------
| **node_modules**         | Contains all  npm dependencies    
| **src**                  | Contains  source code that will be compiled to the dist dir                               |
| **tests**        | Contains the projects tests
| **src/config**      | Contains project configurations i.e. database connection & migrations
| **src/domains**              | Contains the project domains (features) 
| **src/routes**           | Contain all express routes    
| **src**/server.js         | node js server configurations 
| **src**/app.js         | Entry point to express app                                                               |
| dockerfile.be        | backend docker image                                                         |
| dockerfile.postgres        | database docker image                                                         |
| docker-compose.yml        | docker compose file                                                     |
| package.json             | Contains npm dependencies as well as build scripts
| .env.local             | environment file                                           |
| global.d.ts            | environment file types                                           |
| config.ts            | project configurations module                                         |


## Testing
The tests are  written in Jest

```
"jest": "^28.1.3"
```


### Running tests using NPM Scripts
````
npm run test
````
Test files are created under test folder.