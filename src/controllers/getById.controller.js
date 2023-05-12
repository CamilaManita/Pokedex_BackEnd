require('dotenv').config();
const { API_URL } = process.env;
const axios = require("axios");
const { Pokemon, Type } = require('../db');

const getIdDB = async (id) => {
  const pokemonDB = await Pokemon.findByPk(
    id, {
      include: {
        model: Type,
        attributes: ["id", 'name'],
        through: {
          attributes: [],
        }
      }
    }
  )
  return pokemonDB;
}

const getIdAPI = async (id) => {
  try {
    const pokemonAPI = []
    const response = await axios.get(`${API_URL}/${id}`);
    const {name, sprites, stats, height, weight, types} = response.data;
    if(response){
      pokemonAPI.push({
          id: response.id, //Esto se coloca así porque en el destructuring me tira error
          name, 
          image: sprites.other.home.front_default,
          hp: stats[0].base_stat,
          attack: stats[1].base_stat,
          defense: stats[2].base_stat,
          speed: stats[5].base_stat,
          height: height,
          weight: weight,
          types: types.map((type) => type.type.name),
      });
    }
    return pokemonAPI; 
  } catch (error) {
    return [];
  }
}

const getPokemonById = async (id) => {
  if(!isNaN(id)){
    const pokemonAPI = await getIdAPI(id);
    if(!pokemonAPI.length) throw new Error('El pokemon no existe')
    return pokemonAPI
  } else {
    const pokemonDB = await getIdDB(id);
    if(!pokemonDB) throw new Error('El pokemon no existe en la DB')
    return pokemonDB;
  }
};

module.exports = getPokemonById;
