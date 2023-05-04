const {Pokemon, Types, Score} = require("../db")
const axios = require("axios")

//Hay que ponerla en utils o helpers
const formatArrayApi = async (arr) => {
    const format = await Promise.all(arr.map(async (e) => {
      const { data } = (await axios.get(e.url)); // Hacemos un segundo llamado a la API
      return {
        id: data?.id,
        name: data?.name,
        imagen: data?.sprites?.other?.dream_world?.front_default ?? "",
        imagenGame: data?.sprites?.front_default ?? "",
        poderes: data?.abilities?.map(({ability}) => ability.name),
        vida: data?.stats?.find(i => i.stat.name === "hp")?.base_stat ?? 0,
        ataque: data?.stats?.find(i => i.stat.name === "attack")?.base_stat ?? 0,
        defensa: data?.stats?.find(i => i.stat.name === "defense")?.base_stat ?? 0,
        ataqueEspecial: data?.stats?.find(i => i.stat.name === "special-attack")?.base_stat ?? 0,
        defenzaEspecial: data?.stats?.find(i => i.stat.name === "special-defense")?.base_stat ?? 0,
        velocidad: data?.stats?.find(i => i.stat.name === "speed")?.base_stat ?? 0,
        altura: data?.height ?? 0,
        peso: data?.weight ?? 0,
        tipo: data?.types?.map(({type}) => type.name),
        created: false,
      };
    }));
    return format;
};
  
//Importamos el modelo para poder crear un nuevo pokemon
//.create devuelve una promesa
//Asinc y await devuelve una promesa

const createPokemon = async (name, imagen, imagenGame, poderes, vida, ataque, defensa, ataqueEspecial, defenzaEspecial, velocidad, altura, peso, tipo,) => await Pokemon.create(
    {name, imagen, imagenGame, poderes, vida, ataque,defensa,ataqueEspecial,defenzaEspecial, velocidad,altura,peso,tipo})
const getPokemonById = async (id, source) => {
    //Falta darle formato al id y ademas traemos los scores relacionados a ese pokemon
    const arr = [{url:`https://pokeapi.co/api/v2/pokemon/${id}`}]
    const pokemon = 
        source === "api" 
            ? await formatArrayApi(arr)               
            : await Pokemon.findByPk(id, 
                {include:{
                    model: Score,
                    attributes: ["id","record"]
                }}
            )
    return pokemon
}

const getAllPokemons = async (limit, offset) => {
    //Vamos a buscar en Db
    const dbPromise = Pokemon.findAll();
    //Vamos a buscar en Api, Limitando la cantidad de datos traidos
    const apiPromise = axios.get(`https://pokeapi.co/api/v2/pokemon/?limit=${limit}&offset=${offset}`)
    //Traemos la data
    const [databasePokemon, apiResponse] = await Promise.all([dbPromise, apiPromise]);
    const apiPokemons = apiResponse.data.results;
    //Le damos formato a la data que viene por la Api , es una promesa no olvidar
    const formatDataApi = await formatArrayApi(apiPokemons)
    const data = [...databasePokemon, ...formatDataApi];
    return data
}
const searchPokemonByName = async (name) => {
     // Pidiendo al database
    const dataBasePokemon = await Pokemon.findAll({ where: { name: name } });
    const dataBasePokemonPlain = dataBasePokemon.map((pokemon) => pokemon.toJSON());
    // Pidiendo data al Api, usando nuestro utils
    const arr = [{ name: name, url: `https://pokeapi.co/api/v2/pokemon/${name}` }];
    let formatData = [];
    try {
        formatData = await formatArrayApi(arr);
    } catch (error) {
        console.error("El Pokémon no se encuentra en la API:", error.message);
    }
    return [...formatData, ...dataBasePokemonPlain];
};
  
const getTypesPokemon = async () =>{
    // Verificamos si la base de datos está vacía
    const dbPromise = await Types.findAll()
    if (dbPromise.length === 0) {
        // Hacemos una solicitud a la API para obtener todos los tipos de Pokémon
        const endpoint = (await axios.get('https://pokeapi.co/api/v2/type')).data.results
        // Creamos registros en la base de datos
        const createdTypes = await Promise.all(
            endpoint.map((type) => Types.create({ name: type.name, url: type.url }))
        )
        // Devolvemos los tipos creados
        return createdTypes
    } else {
        // Devolvemos los tipos almacenados en la base de datos
        return dbPromise
  }
}

module.exports = {
    createPokemon, 
    getPokemonById, 
    getAllPokemons, 
    searchPokemonByName,
    getTypesPokemon,
}