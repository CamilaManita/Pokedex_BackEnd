const {Pokemon, Type} = require('../db');

const postPokemon = async (name, image, hp, attack, defense, speed, height, weight, types) => {
    if(!name || !image || !hp || !attack || !defense || !speed || !height || !weight || !types) throw new Error('There is not all the required information');

    const newPokemon = await Pokemon.create({
        name,
        image,
        hp,
        attack,
        defense,
        speed,
        height,
        weight
    })

    await newPokemon.addTypes(types)

    return newPokemon;
}


module.exports = postPokemon;