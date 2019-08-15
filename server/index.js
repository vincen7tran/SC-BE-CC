const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

const GM = require('../API/GM'); // Fetches data from GM API. GM API data shape samples in exampleDataShapeGM.js
const util = require('../API/wrangleData'); // Wrangles data from GM API to desired shape

const app = express();

const homePage = path.join(__dirname, '/../public/index.html');
const page404 = path.join(__dirname, '/../public/404.html');

app.use(bodyParser.json());

// SmartCar API

// Home Page
const sendHome = (req, res) => res.status(200).sendFile(homePage);

app.get('/', sendHome);
app.get('/vehicles', sendHome);

// GET Vehicle Information
app.get('/vehicles/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const vehicleInfo = await GM.getVehicleInfoService(id);
    const { status, reason, data } = vehicleInfo.data;

    // If status code is a 404, GM API did not find a vehicle with the specified ID
    // send error reason and return immediately
    if (status === '404') return res.status(404).send({ error: reason });

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
    if (status === '404') return res.status(404).send({ error: reason });
    
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
    if (status === '404') return res.status(404).send({ error: reason });

    const result = util.wrangleEnergyInfo(data, 'tankLevel');

    ({ error, percent } = result); // destructuring syntax for variables that are already declared

    // If reason, the vehicle did exist, but had no value for tankLevel
    if (error) return res.status(400).send({ error });

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
    if (status === '404') return res.status(404).send({ error: reason });

    const result = util.wrangleEnergyInfo(data, 'batteryLevel');

    ({ error, percent } = result); // destructuring syntax for variables that are already declared

    // If reason, the vehicle did exist, but had no value for batteryLevel
    if (error) return res.status(400).send({ error });

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
    const { data } = engineInfo;
    const { status, reason, actionResult } = data;

    // Status 400: Invalid Command
    // Status 404: GM API did not find a vehicle with the specified ID
    if (status !== '200') return res.status(status).send({ error: reason });

    // TODO: Validate HTTP Status Code for actionResult status = 'FAILED' inside util.wrangleEngineInfo
    // GM API gives '200' on 'FAILED', but what should the SmartCar API give?
    const result = util.wrangleEngineInfo(actionResult);

    const { statusCode, statusMessage } = result;

    res.status(statusCode).send({ status: statusMessage });
  } catch (error) {
    // If GM API is Down
    res.status(500).send({ error });
  }
});

// 404 Page for all other possible routes
app.get('*', (req, res) => {
  res.status(404).sendFile(page404);
});

module.exports = app;