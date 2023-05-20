const axios = require('axios');
const {formatear, formatearTypes} = require('../Helpers/Helpers');
const {Pokemon, Type} = require('../db')

const getPokemonById = async (id) => {

    if(!isNaN(id)){
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
        return formatear(response.data);
    } else {
        const responseDB = await Pokemon.findByPk(id,{
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

        return 'No se encontro el pokemon'
    }
}

module.exports = getPokemonById;