const getAllPokemons = require("./getAll.controllers")

const getPokemonByName = async (name) => {
    const allPokemons = await getAllPokemons();
    if(!allPokemons) throw new Error('No pokemons found');

    const pokemonsFiltered = allPokemons.filter(dog => dog.name === name);
    if(!pokemonsFiltered) throw new Error('The searched pokemon is not in the pokedex. Go find it and hunt it!!');

    return pokemonsFiltered;
}

module.exports = getPokemonByName;