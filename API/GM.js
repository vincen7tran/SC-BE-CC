const axios = require('axios');

const GM_URL = 'http://gmapi.azurewebsites.net';

// GM API
const getVehicleInfoService = id => {
    return axios.post(`${GM_URL}/getVehicleInfoService`, {
      id,
      responseType: 'JSON'
    });
};

const getSecurityStatusService = id => {
  return axios.post(`${GM_URL}/getSecurityStatusService`, {
    id,
    responseType: 'JSON'
  });
};

const getEnergyService = id => {
  return axios.post(`${GM_URL}/getEnergyService`, {
    id,
    responseType: 'JSON'  
  });
};

module.exports = {
  getVehicleInfoService,
  getSecurityStatusService,
  getEnergyService
};