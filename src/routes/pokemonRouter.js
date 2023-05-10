const { Router } = require("express");

const pokeRouter = Router();

const getPokemonById = require("../controllers/getById.controllers");
const getAllPokemons = require("../controllers/getAll.controllers");

pokeRouter.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const pokemon = await getPokemonById(id);

    return res.status(200).json(pokemon);
  } catch (error) {
    return res.status(400).send(error.message);
  }
});

pokeRouter.get("/", async (req, res) => {
  try {
    const response = await getAllPokemons();
    return res.send(response);
  } catch (error) {
    return res.status(500).send('Error al obtener los pokemons');
  }
});

module.exports = pokeRouter;
