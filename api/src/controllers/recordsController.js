const {Score} = require("../db")

const createRecord = async (record, pokemonId) => {
    //Pasamos los datos que necesita el modelo
    const newRecord = await Score.create({record})
    //Ejecutamos la funcion creada por secual
    await newRecord.setPokemon(pokemonId)
    return newRecord
}
module.exports = {createRecord}