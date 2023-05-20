const {formatear, formatearTypes} = require('../Helpers/Helpers');
const {Pokemon, Type} = require('../db');
const axios = require('axios');

const getName = async (name) => {
    const responseDB = await Pokemon.findOne({
        where: {
            name
        },
            include: {
              model: Type,
              attributes: ['name'],
              through: {
                attributes: []
              }
            }
    });
    if(responseDB) {
        return formatearTypes(responseDB);
    }
    
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`)
        
    return formatear(response.data);
}

module.exports = getName;