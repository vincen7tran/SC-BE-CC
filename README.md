# SmartCar Back-End Coding Challenge

SmartCar API that interfacts with the General Motor's API to allow the client to:
  - Fetch General Vehicle Information
  - Fetch Vehicle Security Information
  - Fetch Vehicle Energy Information
  - Remotely START or STOP Vehicle Engine

## Table of Contents

1. [Quick Start](#Quick Start)
1. [API Information](#API Information)

## Quick Start

An `nvmrc` file is included if using [nvm](https://github.com/creationix/nvm).

- Node 6.13.0
- etc

## Development

### Installing Dependencies

From within the root directory:

Terminal tab 1:
  npm install
  npm install styled-components --save-dev
  npm run react-dev
Terminal tab 2:
  nodemon ./server/index.js (in new tab)
Terminal tab 3:
  mongod --config /usr/local/etc/mongod.conf
  mongo
Terminal tab 4:
  node ./db/seed.js
Open browser at: http://localhost:3002/


Useful terminal commands for db:
  db.restaurants.find({})
  db.dropDatabase()


## API Information

> API CRUD Information

| API Endpoints  | Request Type | Input | Output | Description  |
| ------------- | ------------- | ------------- | ------------- | ------------- | 
| /API/restaurant/photo/:id | GET  | Restaurant ID  | STATUS CODE 200 Restaurant Document with Array of Photos | Gets photos for corresponding restaurant  |
| /API/restaurant/photo/ | POST  | Restaurant Document   | STATUS CODE 201  | Create a Restaurant Document  | 
| /API/restaurant/photo/:id | PATCH  | Restaurant ID  | STATUS CODE 200  | Update a Restaurant Document  |
| /API/restaurant/photo/:id | DELETE  | Restaurant ID  | STATUS CODE 200  | Delete a Restaurant Document  |

API Response Body JSON Shape
```javascript
{
  "photos":[
    {
      "id":1,
      "url":"abc.com/1",
      "username":"JaneDoe32",
      "date":"2019-05-22-12-33",
      "flag":false
    },
    {
      "id":2,
      "url":"abc.com/2",
      "username":"JohnSmith444",
      "date":"1993-11-01-05-10",
      "flag":true
    }
  ]
}
```
