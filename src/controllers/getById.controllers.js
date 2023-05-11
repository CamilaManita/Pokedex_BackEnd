const getAllPokemons = require("./getAll.controllers");

const getPokemonById = async (id) => {
  const allPokemons = await getAllPokemons();
  if(!allPokemons) throw new Error('No pokemons found')

  const pokemonFound = allPokemons.find(pokemon => pokemon.id === id);
  if(!pokemonFound) throw new Error('The searched pokemon is not in the pokedex. Go find it and hunt it!!');
  
  return pokemonFound;
};

module.exports = getPokemonById;
