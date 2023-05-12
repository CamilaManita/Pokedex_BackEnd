const { Router } = require('express');

const typeRouter = Router();

const getTypes = require('../controllers/getTypes.controller');
const {Type} = require('../db');

typeRouter.get('/', async (req,res) => {
    try {
        await getTypes();
        const response = await Type.findAll();
        return res.status(200).send(response);
    } catch (error) {
        return res.status(500).send('Error al obtener los tipos');
    }
})

module.exports = typeRouter;