const {Router} = require('express');
const postsRouter = Router();

const {createPokemonHandler} = require("../handlers/pokemonsHandlers")

postsRouter.post("/", createPokemonHandler)

module.exports = postsRouter;