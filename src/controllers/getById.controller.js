const getAllPokemons = require('./getAll.controllers');

const getPokemonById = async (id) => {
    const response = await getAllPokemons();
    if(!response) throw new Error('No existen los pokemones')

    const pokemonFound = response.find(poke => poke.id == id);
    return pokemonFound;
}

module.exports = getPokemonById;