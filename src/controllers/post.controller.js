const {Pokemon} = require('../db');

const postPokemon = async ({name, image, hp, attack, defense, speed, height, weight, types}) => {
    const findPokemon = await Pokemon.findOne({
        where: { name: name.toLowerCase() }
    })
}

module.exports = postPokemon;