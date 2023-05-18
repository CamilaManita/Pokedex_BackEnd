const getAllPokemons = require('./getAll.controllers');

const getName = async (name) => {
    const response = await getAllPokemons();
    if(!response) throw new Error('No existen los pokemones')

    const pokemonFound = response.find(poke => poke.name == name);
    return pokemonFound;
}

module.exports = getName;