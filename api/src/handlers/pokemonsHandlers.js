const {createPokemon} = require("../controllers/pokemonController")


const getPokemonsHandler = (req, res)=>{
    //Vamos a llamar a una funcion que llame a la BDD
    //Vamos a llamar a una funcion que llame al API externa
    //Va a unificar todo cuidando el formato
    //Responder con los datos
    
    const {name,type} = req.query

    if(name && type){
        res.send(`Quiero buscar todos los pokemon que sean tipo ${type} y tenga el nombre de ${name}`)
    }else if(name){
        res.send(`Quiero buscar todos los pokemon que se llamen ${name}`)
    }else if(type){
        res.send(`Quiero buscar todos los pokemon que sean tipo ${type}`)
    }else{
        res.send("NIY: Esta ruta trae a todos los pokemons")
    }
    
}

const getPokemonsGroupHandler = (req, res)=>{
    res.send("NIY: Esta ruta trae a los pokemons desde un id a otro, FROM - TO")
}


const getPokemonByIdHandler = (req, res)=>{
    //Extraemos el id del params
    const {id} = req.params

    res.send(`Data de pokemon con id ${id}`)
}

const createPokemonHandler = async (req, res) => {
    //Siempre es preferible un Trycatch en el handler =D
    try {
        const {name, type, stats} = req.body
        const newPokemon = await createPokemon(name, type, stats)
        res.status(201).json(newPokemon)
    } catch (error) {
        res.status(400).json({error: error.message})
    }

}
module.exports = {
    getPokemonsHandler,
    getPokemonsGroupHandler,
    getPokemonByIdHandler,
    createPokemonHandler,
}
