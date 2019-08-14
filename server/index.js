const express = require('express');
const bodyParser = require('body-parser');

const GM = require('../API/GM');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

// SmartCar API
app.get('/vehicles/:id', async (req, res) => {
  const { id } = req.params;
  const vehicleInfo = await GM.getVehicleInfoService(id);
  const { data } = vehicleInfo.data;
  const { status, reason, vin, color, fourDoorSedan, twoDoorCoupe, driveTrain } = data;
  
  if (status === '404') res.status(404).send(`Status: ${status}, ${reason}`);

  const doorCount = fourDoorSedan.value ? 4 : twoDoorCoupe.value ? 2 : 'N/A';
  
  const result = {
    vin: vin.value,
    color: color.value,
    doorCount,
    driveTrain: driveTrain.value
  };

  res.status(200).send(result);
});

app.listen(PORT, () => console.log(`Listening on Port: ${PORT}`));