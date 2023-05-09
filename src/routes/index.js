const { Router } = require('express');
const pokeRouter = require('./pokemonRouter'); 

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const router = Router();

router.use('/pokemons', pokeRouter);
router.use('/pokemons/:id', pokeRouter);

module.exports = router;
