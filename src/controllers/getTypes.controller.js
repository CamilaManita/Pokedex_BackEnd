const axios = require('axios');
const {Type} = require('../db');
const {API_TYPE} = process.env;

const getTypes = async () => {
    const response = await axios.get(API_TYPE);
    const typesAPI = response.data.results

    typesAPI.forEach( type => {
        Type.findOrCreate({
            where: {
                name: type.name
            }
        });
    });
    console.log(typesAPI);

    const typesDB = await Type.findAll();

    const allTypes = [...typesAPI, ...typesDB];
    
    return allTypes;
}

module.exports = getTypes;