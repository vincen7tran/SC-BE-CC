// GM API Request and Response Examples

// Vehicle Info
// POST /getVehicleInfoService
// Content-Type: application/json

const vehicleInfoRequest = {
  "id": "1234",
  "responseType": "JSON"
};

const vehicleInfoResponse = {
  "service": "getVehicleInfo",
  "status": "200",
  "data": {
    "vin": {
      "type": "String",
      "value": "123123412412"
    },
    "color": {
      "type": "String",
      "value": "Metallic Silver"
    },
    "fourDoorSedan": {
      "type": "Boolean",
      "value": "True"
    },
    "twoDoorCoupe": {
      "type": "Boolean",
      "value": "False"
    },
    "driveTrain": {
      "type": "String",
      "value": "v8"
    }
  }
};

// Security Info
// POST /getSecurityStatusService
// Content-Type: application/json

const securityInfoRequest = {
  "id": "1234",
  "responseType": "JSON"
};

const securityInfoResponse = {
  "service": "getSecurityStatus",
  "status": "200",
  "data": {
    "doors": {
      "type": "Array",
      "values": [
        {
          "location": {
            "type": "String",
            "value": "frontLeft"
          },
          "locked": {
            "type": "Boolean",
            "value": "False"
          }
        },
        {
          "location": {
            "type": "String",
            "value": "frontRight"
          },
          "locked": {
            "type": "Boolean",
            "value": "True"
          }
        },
        {
          "location": {
            "type": "String",
            "value": "backLeft"
          },
          "locked": {
            "type": "Boolean",
            "value": "False"
          }
        },
        {
          "location": {
            "type": "String",
            "value": "backRight"
          },
          "locked": {
            "type": "Boolean",
            "value": "True"
          }
        }
      ]
    }
  }
};

// Energy Info for Fuel & Battery
// POST /getEnergyService
// Content-Type: application/json

const energyInfoRequest = {
  "id": "1234",
  "responseType": "JSON"
};

const energyInfoResponse = {
  "service": "getEnergy",
  "status": "200",
  "data": {
    "tankLevel": {
      "type": "Number",
      "value": "30.2"
    },
    "batteryLevel": {
      "type": "Null",
      "value": "null"
    }
  }
};

// Engine Service Info
// POST /actionEngineService
// Content-Type: application/json

const engineServiceRequest = {
  "id": "1234",
  "command": "START_VEHICLE|STOP_VEHICLE",
  "responseType": "JSON"
};

const engineServiceResponse = {
  "service": "actionEngine",
  "status": "200",
  "actionResult": {
    "status": "EXECUTED|FAILED"
  }
};


