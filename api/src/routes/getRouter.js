const {Router} = require("express");
const getRouter = Router();

//Modularizando
const { getPokemonsHandler, 
        getPokemonsGroupHandler,
        getPokemonByIdHandler,
        getTypesPokemonHandler   } = require("../handlers/pokemonsHandlers")

//Aca irian los middlewares que necesitamos y luego enviarlos a una carpeta de middlewares

getRouter.get("/home",           getPokemonsHandler);
getRouter.get("/home/:from/:to", getPokemonsGroupHandler)
getRouter.get("/home/:id",       getPokemonByIdHandler)
getRouter.get("/types",     getTypesPokemonHandler)

module.exports = getRouter;