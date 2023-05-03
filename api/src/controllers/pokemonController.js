const {Pokemon} = require("../db")
//Importamos el modelo para poder crear un nuevo pokemon
//.create devuelve una promesa
//Asinc y await devuelve una promesa
const createPokemon = async (name, type, stats) => await Pokemon.create({name, type, stats})

module.exports = {createPokemon}