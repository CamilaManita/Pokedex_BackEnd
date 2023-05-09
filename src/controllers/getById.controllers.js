require("dotenv").config();

const { API_URL } = process.env;
const axios = require("axios");

const getPokemonById = async (id) => {
  const res = await axios.get(`${API_URL}/${id}`);

  if (!res) throw new Error(`No se encuentra el personaje`);
  
  const pokemon = {
    id: res.data.id,
    name: res.data.name,
    height: res.data.height,
    weight: res.data.weight
  };

  return pokemon;
};

module.exports = getPokemonById;
