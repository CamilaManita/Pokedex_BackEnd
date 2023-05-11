const { Router } = require("express");

const pokeRouter = Router();

const getPokemonById = require("../controllers/getById.controllers");
const getAllPokemons = require("../controllers/getAll.controllers");
const getPokemonByName = require("../controllers/getByName.controllers");

pokeRouter.get("/", async (req, res) => {
  try {
    const response = await getAllPokemons();
    return res.status(200).send(response);
  } catch (error) {
    return res.status(500).send('Error al obtener los pokemons');
  }
});

pokeRouter.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const pokemon = await getPokemonById(id);

    return res.status(200).json(pokemon);
  } catch (error) {
    return res.status(400).send(error.message);
  }
});

pokeRouter.get('/name', async (req,res) => {
  try {
    const {name} = req.query;
    const pokemon = await getPokemonByName(name);

    return res.status(200).json(pokemon);
  } catch (error) {
    return res.status(400).send(error.message)
  }
})

module.exports = pokeRouter;
