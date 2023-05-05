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
        imagenOriginal: data?.sprites?.other?.['official-artwork']?.front_default ?? "",
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
    if( source === "api" ){
        const pokemon = await formatArrayApi(arr)    
        return pokemon
    }else{
        const data = await Pokemon.findByPk(id, 
            {include:{
                model: Score,
                attributes: ["id","record"]
            }}
        )
        const pokemon = []
        pokemon.push(data)

        return pokemon
    }
    
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
    //Creamos el array de colors
    const typeColors = {
        normal: "rgba(145, 154, 162, 1)",
        fighting: "rgba(206, 65, 107, 1)",
        flying: "rgba(137, 170, 227, 1)",
        poison: "rgba(181, 103, 206, 1)",
        ground: "rgba(217, 120, 69, 1)",
        rock: "rgba(197, 183, 140, 1)",
        bug: "rgba(145, 193, 47, 1)",
        ghost: "rgba(82, 105, 173, 1)",
        steel: "rgba(90, 142, 162, 1)",
        fire: "rgba(255, 157, 85, 1)",
        water: "rgba(80, 144, 214, 1)",
        grass: "rgba(99, 188, 90, 1)",
        electric: "rgba(244, 210, 60, 1)",
        psychic: "rgba(250, 113, 121, 1)",
        ice: "rgba(115, 206, 192, 1)",
        dragon: "rgba(11, 109, 195, 1)",
        dark: "rgba(90, 84, 101, 1)",
        fairy: "rgba(236, 143, 230, 1)",
        unknown: "rgba(90, 84, 101, 1)",
        shadow: "rgba(90, 84, 101, 1)",
      };
      
    // Verificamos si la base de datos está vacía
    const dbPromise = await Types.findAll();
    if (dbPromise.length === 0) {
    // Hacemos una solicitud a la API para obtener todos los tipos de Pokémon
    const endpoint = (await axios.get("https://pokeapi.co/api/v2/type")).data.results;
    // Creamos registros en la base de datos
    const createdTypes = await Promise.all(
      endpoint.map((type) => {
        // Creamos un objeto con solo el name, url y color
        const modifiedType = {
            name: type.name,
            url: type.url,
            color: typeColors[type.name],
        };
        // Creamos el registro en la base de datos
        return Types.create(modifiedType);
        })
    );
    // Devolvemos los tipos creados
    return createdTypes;
    } else {
        // Devolvemos los tipos almacenados en la base de datos
        return dbPromise;
    }
}

module.exports = {
    createPokemon, 
    getPokemonById, 
    getAllPokemons, 
    searchPokemonByName,
    getTypesPokemon,
}