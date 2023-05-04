const {Router} = require('express');
const postsRouter = Router();

const {createPokemonHandler} = require("../handlers/pokemonsHandlers")
const {createRecordHandler} = require("../handlers/recordsHandlers")


postsRouter.post("/", createPokemonHandler)
postsRouter.post("/record", createRecordHandler)


module.exports = postsRouter;