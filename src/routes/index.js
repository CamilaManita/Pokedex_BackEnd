const { Router } = require('express');
const pokeRouter = require('./pokemonRouter');
const typeRouter = require('./typeRouter');

const router = Router();

router.use('/pokemons', pokeRouter);
router.use('/types', typeRouter);

module.exports = router;
