const {Pokemon} = require('../db');

const postPokemon = async (name, image, hp, attack, defense, speed, height, weight, types) => {
    if(!name || !image || !hp || !attack || !defense || !speed || !height || !weight || !types) throw new Error('There is not all the required information');

    const existPokemon = await Pokemon.findOne({
        where: {name: name }
    })
    
    if(existPokemon) throw new Error('The name of this pokemon already exists, please try another name');

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