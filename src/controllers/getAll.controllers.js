const { Pokemon } = require('../db');
const { API_URL } = process.env;
const axios = require("axios");

const getAllPokemons = async () => {
  
  //Traigo de la API
  const getPokemonDetails = (url) => {
    //Obtengo los detalles de un pokemon
    return axios.get(url)
      .then(response => response.data)
      .catch(error => console.log(error));
  }
  
  //Obtengo la lista de URLs de todos los pokemon
  const response = await axios.get(API_URL);
  const urls = response.data.results.map(pokemon => pokemon.url);

  //Obtengo los detalles de todos los pokemon
  const pokemonDetails = await Promise.all(urls.map(url => getPokemonDetails(url)));

  //Convertimos el array de detalles
  const pokemonsAPI = pokemonDetails.map(pokemon => {
    return {
      id: pokemon.id,
      name: pokemon.name,
      image: pokemon.sprites.other.home.front_default,
      hp: pokemon.stats[0].base_stat,
      attack: pokemon.stats[1].base_stat,
      defense: pokemon.stats[2].base_stat,
      speed: pokemon.stats[5].base_stat,
      height: pokemon.height,
      weight: pokemon.weight,
      types: pokemon.types.map(type => type.type.name),
    };
  });
  //Busco en la base de datos
  const pokemonsDB = await Pokemon.findAll()

  //Guardo ambas respuestas en un array
  const allPokemons = [...pokemonsAPI, ...pokemonsDB]

  return allPokemons;
};

module.exports = getAllPokemons;

