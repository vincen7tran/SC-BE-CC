const express = require('express');
const bodyParser = require('body-parser');

const GM = require('../API/GM');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

// SmartCar API
app.get('/vehicles/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const vehicleInfo = await GM.getVehicleInfoService(id);
    const { data } = vehicleInfo.data;
    const { status, reason, vin, color, fourDoorSedan, twoDoorCoupe, driveTrain } = data;
    
    if (status === '404') res.status(404).send(`Status: ${status}, ${reason}`);
  
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
  } catch (e) {
    res.status(500).send('Status: 500, Internal Server Error');
  }
});

app.listen(PORT, () => console.log(`Listening on Port: ${PORT}`));