const wrangleVehicleInfo = data => {
  const { vin, color, fourDoorSedan, twoDoorCoupe, driveTrain } = data;
  
  let doorCount = 'N/A';

  if (fourDoorSedan.value === 'True') doorCount = 4;
  else if (twoDoorCoupe.value === 'True') doorCount = 2;

  return {
    vin: vin.value,
    color: color.value,
    doorCount,
    driveTrain: driveTrain.value
  };
};

const wrangleSecurityInfo = data => {
  const { values } = data.doors; // values is the array of door objects
  const result = [];

  for (let door of values) {
    const { location, locked } = door;
    let isLocked = locked.value === 'True' ? true : false;

    result.push({ location: location.value, locked: isLocked });
  }

  return result;
};

const wrangleEnergyInfo = (data, levelType) => {
  console.log(data, levelType);

  const level = data[levelType].value;

  if (level === 'null') return { reason: 'Value not found, please verify vehicle fuel type!' };

  return { percent: level };
};

module.exports = {
  wrangleVehicleInfo,
  wrangleSecurityInfo,
  wrangleEnergyInfo
};