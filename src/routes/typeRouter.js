const { Router } = require('express');

const typeRouter = Router();

const getTypes = require('../controllers/getTypes.controller');

typeRouter.get('/', async (req,res) => {
    try {
        const response = await getTypes();
        return res.status(200).send(response);
    } catch (error) {
        return res.status(500).send('Error al obtener los tipos');
    }
})

module.exports = typeRouter;