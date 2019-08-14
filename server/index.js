const express = require('express');
const bodyParser = require('body-parser');

const GM = require('../API/GM');
const util = require('../API/wrangleData');

const app = express();

app.use(bodyParser.json());

// SmartCar API
app.get('/vehicles/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const vehicleInfo = await GM.getVehicleInfoService(id);
    const { status, reason, data } = vehicleInfo.data;

    // If status code is a 404, GM API did not find a vehicle with the specified ID
    // send error reason and return immediately
    if (status === '404') return res.status(404).send({ status, reason });

    const result = util.wrangleVehicleInfo(data);
  
    res.status(200).send(result);
  } catch (error) {
    // If GM API is Down
    res.status(500).send({ status: 500, error });
  }
});

app.get('/vehicles/:id/doors', async (req, res) => {
  const { id } = req.params;

  try {
    const securityInfo = await GM.getSecurityStatusService(id);
    const { status, reason, data } = securityInfo.data;

    // If status code is a 404, GM API did not find a vehicle with the specified ID
    // send error reason and return immediately
    if (status === '404') return res.status(404).send({ status, reason });
    
    const result = util.wrangleSecurityInfo(data);

    res.status(200).send(result);

  } catch (error) {
    // If GM API is Down
    res.status(500).send({ status: 500, error });
  }
})

module.exports = app;