const {Router} = require("express");
const getRouter = Router();

//Modularizando
const { getPokemonsHandler, 
        getPokemonsGroupHandler,
        getPokemonByIdHandler   } = require("../handlers/pokemonsHandlers")


getRouter.get("/home",           getPokemonsHandler);
getRouter.get("/home/:from/:to", getPokemonsGroupHandler)
getRouter.get("/home/:id",       getPokemonByIdHandler)


module.exports = getRouter;