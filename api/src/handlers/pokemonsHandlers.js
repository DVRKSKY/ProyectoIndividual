const {createPokemon, getPokemonById, getAllPokemons, searchPokemonByName, getTypesPokemon} = require("../controllers/pokemonController")


const getPokemonsHandler = async (req, res)=>{
    const {name} = req.query
    try {
        const results = name ? await searchPokemonByName(name) : await getAllPokemons(12,1) 
        res.status(200).json(results)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

const getPokemonsGroupHandler = (req, res)=>{
    res.send("NIY: Esta ruta trae a los pokemons desde un id a otro, FROM - TO")
}

//Debemos identificar que tipo de Id estamos recibiendo
//Puede llegar un id que noexiste en DB ni en el Api

const getPokemonByIdHandler = async (req, res)=>{
    //Extraemos el id del params
    const {id} = req.params
    //Establecemos la fuente y le pasamos por parametro para determinar de donde
    const source = isNaN(id) ? "bdd" : "api"
    try {
        const pokemon = await getPokemonById(id, source)  
        res.status(200).json(pokemon)
    } catch (error) {
        res.status(400).json({error: error.message})        
    }
}

const createPokemonHandler = async (req, res) => {
    //Siempre es preferible un Trycatch en el handler =D
    const {name, 
        imagen,
        imagenGame, 
        poderes, 
        vida, 
        ataque, 
        defensa,
        ataqueEspecial,
        defenzaEspecial,
        velocidad,
        altura,
        peso,
        tipo,} = req.body
    try {
        const newPokemon = await createPokemon(name, 
            imagen,
            imagenGame, 
            poderes, 
            vida, 
            ataque, 
            defensa,
            ataqueEspecial,
            defenzaEspecial,
            velocidad,
            altura,
            peso,
            tipo,)
        res.status(201).json(newPokemon)
    } catch (error) {
        res.status(400).json({error: error.message})
    }

}

const getTypesPokemonHandler = async (req, res) => {
    try {
        const getTypes = await getTypesPokemon()
        res.status(200).json(getTypes)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}
module.exports = {
    getPokemonsHandler,
    getPokemonsGroupHandler,
    getPokemonByIdHandler,
    createPokemonHandler,
    getTypesPokemonHandler
}
