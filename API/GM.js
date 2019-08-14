const axios = require('axios');

const GM_URL = 'http://gmapi.azurewebsites.net';

const getVehicleInfoService = id => {
    return axios.post(`${GM_URL}/getVehicleInfoService`, {
      id,
      responseType: 'JSON'
    });
};

module.exports = {
  getVehicleInfoService,
};