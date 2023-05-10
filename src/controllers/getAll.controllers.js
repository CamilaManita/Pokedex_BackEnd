const { API_URL } = process.env;
const axios = require("axios");

const getAllPokemons = async () => {
  const urlBase = `${API_URL}`;
  
  //Intento 2
  const getPokemonDetails = (url) => {
    //Obtengo los detalles de un pokemon
    return axios.get(url)
      .then(response => response.data)
      .catch(error => console.log(error));
  }
  
  //Obtengo la lista de URLs de todos los pokemon
  const response = await axios.get(urlBase);
  const urls = response.data.results.map(pokemon => pokemon.url);

  //Obtengo los detalles de todos los pokemon
  const pokemonDetails = await Promise.all(urls.map(url => getPokemonDetails(url)));

  //Convertimos el array de detalles
  const pokemons = pokemonDetails.map(pokemon => {
    const stats = {};
    pokemon.stats.forEach(stat => {
      switch (stat.stat.name) {
        case 'hp':
          stats.hp = stat.base_stat;
          break;
        case 'attack':
          stats.attack = stat.base_stat;
          break;
          case 'defense':
            stats.defense = stat.base_stat;
            break;
            case 'speed':
          stats.speed = stat.base_stat;
          break;
      }
    });

    return {
      id: pokemon.id,
      name: pokemon.name,
      height: pokemon.height,
      weight: pokemon.weight,
      types: pokemon.types.map(type => type.type.name),
      abilities: pokemon.abilities.map(ability => ability.ability.name),
      image: pokemon.sprites.front_default,
      stats
    };
  });

  console.log(pokemons);
};

module.exports = getAllPokemons;

//FUNCION AUXILIAR Y POR LAS DUDAS DE QUE LA OTRA ESTÉ MAL
      //Intento 1
      // const response = await axios.get(`${API_URL}?limit=50`);
      // if (!response.data) throw new Error("No tenes personaje en el pokedex");
      // console.log(response.data.results);
      // axios.get(urlBase).then(response => { //con esto hago un array de urls
      //   const urls = response.data.results.map(pokemon => urlBase + pokemon.name);
      //   console.log(urls);
      // })
      // .catch(error => console.log(error));
      // return response.data.results //Retorno un array de objetos con el nombre y la url de c/pokemon