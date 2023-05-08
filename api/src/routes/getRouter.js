const {Router} = require("express");
const getRouter = Router();

//Modularizando
const { getPokemonsHandler, 
        getPokemonsGroupHandler,
        getPokemonByIdHandler,
                } = require("../handlers/pokemonsHandlers")

//Aca irian los middlewares que necesitamos y luego enviarlos a una carpeta de middlewares

getRouter.get("/",           getPokemonsHandler);
getRouter.get("/:from/:to", getPokemonsGroupHandler)
getRouter.get("/:id",       getPokemonByIdHandler)


module.exports = getRouter;