const axios = require("axios");
const { Type } = require("../db");
const { API_TYPE } = process.env;

const getTypes = async () => {
  // Hacemos la solicitud a la api
  const response = await axios.get(API_TYPE);
  // Asignamos el array de tipos a la vairbale
  const typesAPI = response.data.results;

  // Iteramos sobre cada tipo y si no existe en la DB lo creamos
  typesAPI.forEach((type) => {
    Type.findOrCreate({
      where: {
        name: type.name,
      },
    });
  });

  return "typesCreated";
};

module.exports = getTypes;