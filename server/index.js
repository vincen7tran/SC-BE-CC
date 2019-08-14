const express = require('express');
const bodyParser = require('body-parser');

const GM = require('../API/GM'); // Handles getting data from GM API
const util = require('../API/wrangleData'); // Wrangles data from GM API to desired shape

const app = express();

app.use(bodyParser.json());

// SmartCar API

// GET Vehicle Information
app.get('/vehicles/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const vehicleInfo = await GM.getVehicleInfoService(id);
    const { status, reason, data } = vehicleInfo.data;

    // If status code is a 404, GM API did not find a vehicle with the specified ID
    // send error reason and return immediately
    if (status === '404') return res.status(404).send({ reason });

    const result = util.wrangleVehicleInfo(data);
  
    res.status(200).send(result);
  } catch (error) {
    // If GM API is Down
    res.status(500).send({ error });
  }
});

// GET Vehicle Security Info
app.get('/vehicles/:id/doors', async (req, res) => {
  const { id } = req.params;

  try {
    const securityInfo = await GM.getSecurityStatusService(id);
    const { status, reason, data } = securityInfo.data;

    // If status code is a 404, GM API did not find a vehicle with the specified ID
    // send error reason and return immediately
    if (status === '404') return res.status(404).send({ reason });
    
    const result = util.wrangleSecurityInfo(data);

    res.status(200).send(result);

  } catch (error) {
    // If GM API is Down
    res.status(500).send({ error });
  }
});

// GET Vehicle Fuel Range
app.get('/vehicles/:id/fuel', async (req, res) => {
  const { id } = req.params;

  try {
    const fuelInfo = await GM.getEnergyService(id);
    let { status, reason, data } = fuelInfo.data;

    // If status code is a 404, GM API did not find a vehicle with the specified ID
    // send error reason and return immediately
    if (status === '404') return res.status(404).send({ reason });

    const result = util.wrangleEnergyInfo(data, 'tankLevel');

    ({ reason, percent } = result);

    // If reason, the vehicle did exist, but had no value for tankLevel
    if (reason) return res.status(400).send({ reason });

    res.status(200).send({ percent });
  } catch (error) {
    // If GM API is Down
    res.status(500).send({ error });
  }
});

// GET Vehicle Battery Range
app.get('/vehicles/:id/battery', async (req, res) => {
  const { id } = req.params;

  try {
    const batteryInfo = await GM.getEnergyService(id);
    let { status, reason, data } = batteryInfo.data;

    // If status code is a 404, GM API did not find a vehicle with the specified ID
    // send error reason and return immediately
    if (status === '404') return res.status(404).send({ reason });

    const result = util.wrangleEnergyInfo(data, 'batteryLevel');

    ({ reason, percent } = result);

    // If reason, the vehicle did exist, but had no value for batteryLevel
    if (reason) return res.status(400).send({ reason });

    res.status(200).send({ percent });
  } catch (error) {
    // If GM API is Down
    res.status(500).send({ error });
  }
});

// POST Vehicle Engine Command Service
app.post('/vehicles/:id/engine', async (req, res) => {
  const { id } = req.params;
  const { action } = req.body;
  
  try {
    const engineInfo = await GM.postEngineService(id, action);
    let { status, reason, data } = engineInfo.data;

    // An invalid command results in a 400 status code
    // An invalid vehicle ID results in a 404 status code
    if (status !== '200') return res.status(status).send({ reason });

    const result = util.wrangleEngineInfo(data);

    console.log(result)

  } catch (error) {
    // If GM API is Down
    res.status(500).send({ error });
  }
});

module.exports = app;