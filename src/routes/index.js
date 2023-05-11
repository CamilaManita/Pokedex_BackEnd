const { Router } = require('express');
const pokeRouter = require('./pokemonRouter');
const typeRouter = require('./typeRouter');
const getTypes = require('../controllers/getTypes.controller');

const router = Router();

router.use('/pokemons', pokeRouter);
router.use('/pokemons/:id', pokeRouter);
router.use('/pokemons/name', pokeRouter);

router.use('/types', typeRouter);

module.exports = router;
