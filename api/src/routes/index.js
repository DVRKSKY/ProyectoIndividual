const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const {getTypesPokemonHandler} = require('../handlers/pokemonsHandlers')
const getRouter = require("./getRouter")
const postsRouter = require("./postsRouter")
const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);'

router.use("/pokemons", getRouter);
router.use("/types", getTypesPokemonHandler)
router.use("/posts", postsRouter);

module.exports = router;
