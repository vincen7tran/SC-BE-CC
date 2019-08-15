# SmartCar Back-End Coding Challenge

SmartCar API that interfacts with the General Motors' API to allow the client to:
  - Fetch General Vehicle Information
  - Fetch Vehicle Security Information
  - Fetch Vehicle Energy Information
  - Remotely START or STOP Vehicle Engine

## Quick Start

- npm install -- Install Dependencies
- npm run dev -- Run Server with Nodemon
- npm start -- Run Server without Nodemon
- npm test -- Run Jest & Supertest API Test Suite 

## API Information

| API Endpoints  | Request Type | Input | Output | Description  |
| ------------- | ------------- | ------------- | ------------- | ------------- | 
| /vehicles/:id | GET  | Vehicle ID  | STATUS CODE 200, JSON | Get General Vehicle Info  |
| /vehicles/:id/doors | GET  | Vehicle ID   | STATUS CODE 200, JSON  | Get Vehicle Security Info  | 
| /vehicles/:id/fuel | GET  | Vehicle ID  | STATUS CODE 200, JSON  | Get Vehicle Fuel Range  |
| /vehicles/:id/battery | GET  | Vehicle ID  | STATUS CODE 200, JSON  | Get Vehicle Battery Range  |
| /vehicles/:id/engine | POST  | Vehicle ID, Action  | STATUS CODE 200 or 500, JSON  | Remotely Start or Stop Engine |

API JSON Shape
```javascript
// GET Vehicle General Info
{
  "vin": "1213231",
  "color": "Metallic Silver",
  "doorCount": 4,
  "driveTrain": "v8"
}

// GET Vehicle Security Info
[
  {
    "location": "frontLeft",
    "locked": true
  },
  {
    "location": "frontRight",
    "locked": true
  },
  {
    "location": "backLeft",
    "locked": true
  },
  {
    "location": "backRight",
    "locked": false
  }
]

// GET Vehicle Fuel Range or Battery Range
{
  "percent": 30.2
}

// POST Vehicle Engine Service
// Input
{
  "action": "START|STOP"
}

// Output
// Status Code 200 for 'success', Status Code 500 for 'error'
{
  "status": "success|error"
}
```
