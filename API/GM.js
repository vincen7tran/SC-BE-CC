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

const postEngineService= (id, action) => {
  if (action !== 'START' && action !== 'STOP') {
    return {
      data: {
        status: '400',
        error: 'Invalid action, please try "START" or "STOP"'
      }
    };
  }

  const command = action === 'START' ? 'START_VEHICLE' : 'STOP_VEHICLE';

  return axios.post(`${GM_URL}/actionEngineService`, {
    id,
    command,
    responseType: 'JSON'  
  });
};

module.exports = {
  getVehicleInfoService,
  getSecurityStatusService,
  getEnergyService,
  postEngineService
};