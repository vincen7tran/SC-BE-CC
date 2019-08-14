const express = require('express');
const bodyParser = require('body-parser');

const GM = require('../API/GM');

const app = express();

app.use(bodyParser.json());

// SmartCar API
app.get('/vehicles/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const vehicleInfo = await GM.getVehicleInfoService(id);
    const { status, reason } = vehicleInfo.data;

    if (status === '404') return res.status(404).send({ status, reason });

    const { data } = vehicleInfo.data;
    const { vin, color, fourDoorSedan, twoDoorCoupe, driveTrain } = data;
  
    let doorCount = 'N/A';

    if (fourDoorSedan.value === 'True') doorCount = 4;
    else if (twoDoorCoupe.value === 'True') doorCount = 2;
  
    const result = {
      vin: vin.value,
      color: color.value,
      doorCount,
      driveTrain: driveTrain.value
    };
  
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send({ status: 500, error });
  }
});

module.exports = app;