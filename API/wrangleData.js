// This file contains all the functions that take GM API's responses
// and restructure the data to fit SmartCar's API specs
// refer to exampleDataShapeGM.js for inputs to these functions

const wrangleVehicleInfo = ({ vin, color, fourDoorSedan, twoDoorCoupe, driveTrain }) => {
  let doorCount = 'N/A';

  // return doorCount is a number type
  if (fourDoorSedan.value === 'True') doorCount = 4;
  else if (twoDoorCoupe.value === 'True') doorCount = 2;

  return {
    vin: vin.value,
    color: color.value,
    doorCount,
    driveTrain: driveTrain.value
  };
};

const wrangleSecurityInfo = ({ doors }) => {
  const { values } = doors; // values is the array of door objects
  const result = [];

  for (let door of values) {
    const { location, locked } = door;
    let isLocked = locked.value === 'True' ? true : false;

    result.push({ location: location.value, locked: isLocked }); // return locked as a boolean type
  }

  return result;
};

// This function works for both the battery and fuel endpoint
// The levelType parameter is specific for each endpoint
// Fuel = tankLevel, Battery = batteryLevel
const wrangleEnergyInfo = (data, levelType) => {
  const level = data[levelType].value;

  // If level is 'null', client specified the wrong energy type
  // i.e. battery endpoint with a fuel vehicle ID
  if (level === 'null') return { error: 'Value not found, please verify vehicle energy type!' };

  return { percent: parseFloat(level) }; // return percent as a number type
};

const wrangleEngineInfo = ({ status }) => {
  if (status === 'EXECUTED') {    
    return {
      statusCode: 200,
      statusMessage: 'success'
    };
  }

  // TODO: Validate HTTP Status Code for actionResult status = 'FAILED'
  // Currently set to 500 for 'FAILED'
  return {
    statusCode: 500,
    statusMessage: 'error'
  };
};

module.exports = {
  wrangleVehicleInfo,
  wrangleSecurityInfo,
  wrangleEnergyInfo,
  wrangleEngineInfo
};