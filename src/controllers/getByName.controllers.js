const axios = require("axios");
const { API_URL } = process.env;
const {Op} = require('sequelize');
const {Pokemon, Type} = require('../db')

const getNameDB = async (name) => {
  const pokemonDB = await Pokemon.findAll({
    where: {
      name: {[Op.iLike]: `%${name}%`}
    },
    include: {
      model: Type,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  })
  
  return [...pokemonDB]
}

const getNameAPI = async (name) => {
  try {
    const pokemonAPI = []
    const response = (await axios.get(`${API_URL}/${name}`)).data;
    const {id, sprites, stats, height, weight, types} = response;
    if(response){
      pokemonAPI.push({
          id,
          name: response.name, //Esto se coloca así porque en el destructuring me tira error
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

const getPokemonByName = async (name) => {
  const pokemonDB = await getNameDB(name);
  const pokemonAPI = await getNameAPI(name);

  const response = [...pokemonDB, ...pokemonAPI];

  if(response.length === 0) return 'El pokemon no existe';

  return response;
};

module.exports = getPokemonByName;