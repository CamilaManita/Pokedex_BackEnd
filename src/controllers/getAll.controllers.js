const { API_URL } = process.env;
const axios = require("axios");

const getAllPokemons = async () => {
  const response = await axios.get(`${API_URL}?limit=50`);

  if (!response.data) throw new Error("No tenes personaje en el pokedex pobre");

  return response.data.results
};

module.exports = getAllPokemons;
