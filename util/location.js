const axios = require('axios');
const AUTH_CODE = process.env.GEO_AUTH_CODE;

const getCoordinatesForAddress = async (address) => {
  const params = {
    auth: AUTH_CODE,
    locate: address,
    json: '1',
  };

  const response = await axios.get('https://geocode.xyz', { params });

  const data = await response.data;

  return {
    lat: data.latt,
    lng: data.longt,
  };
};

module.exports = getCoordinatesForAddress;
