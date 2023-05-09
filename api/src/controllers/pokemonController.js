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
        types: data?.types?.map(({type}) => type.name),
        created: false,
      };
    }));
    return format;
};
  
//Importamos el modelo para poder crear un nuevo pokemon
//.create devuelve una promesa
//Asinc y await devuelve una promesa
const createPokemon = async (name, imagen, imagenGame, poderes, vida, ataque, defensa, ataqueEspecial, defenzaEspecial, velocidad, altura, peso, tipo,) => {
  const newPokemon = await Pokemon.create(
      {name, imagen, imagenGame, poderes, vida, ataque, defensa, ataqueEspecial, defenzaEspecial, velocidad, altura, peso}
  );
  
  // Convertimos 'tipo' en un array si no lo es ya
  const tipoArray = Array.isArray(tipo) ? tipo : [tipo];

  // Ahora asociamos los types a este nuevo Pokemon.
  const types = await Types.findAll({
      where: {
          name: tipoArray,
      },
  });
  console.log(types, "::::TYPES")
  if (types.length !== tipoArray.length) {
    throw new Error('Some types could not be found.');
  }
  await newPokemon.setTypes(types);

  // Devolvemos el Pokémon que ya tienes y los tipos que acabas de asociar a él.

  return { 
    ...newPokemon.get({ plain: true }), 
    types: types.map(type => type.get({ plain: true })) 
  };
}


const getPokemonById = async (id, source) => {
  if( source === "api" ){
      const arr = [{url:`https://pokeapi.co/api/v2/pokemon/${id}`}]
      const pokemon = await formatArrayApi(arr)    
      return pokemon
  }else{
      const data = await Pokemon.findByPk(id, 
          {include:{
              model: Types,
          }}
      )
      if (!data) {
          throw new Error(`No Pokemon found with id: ${id}`);
      }
      const pokemon = [data.toJSON()]
      pokemon[0].types = pokemon[0].types.map(type => type.name)
      return pokemon
  }
}

const getAllPokemons = async (offset) => {
    //Vamos a buscar en Db y vamos a incluir los tipos relacionados
    const dbPromise = Pokemon.findAll({
      include: Types,
    });
    
    //Vamos a buscar en Api, Limitando la cantidad de datos traidos
    const apiPromise = axios.get(`https://pokeapi.co/api/v2/pokemon/?limit=12&offset=${offset}`)
    //Traemos la data
    const [databasePokemon, apiResponse] = await Promise.all([dbPromise, apiPromise]);
    const apiPokemons = apiResponse.data.results;
    //Le damos formato a la data que viene por la Api , es una promesa no olvidar
    const formatDataApi = await formatArrayApi(apiPokemons)
    
    //Le damos formato a nuestos tipos de la base de datos
    const databasePokemonFormatted = databasePokemon.map(pokemon => {
      const pokemonJson = pokemon.toJSON();
      return {
          ...pokemonJson,
          types: pokemonJson.types.map(type => type.name)
      };
    });
    const data = [...databasePokemonFormatted, ...formatDataApi];
    return data
}
const searchPokemonByName = async (name) => {
  // Pidiendo al database
  const dataBasePokemon = await Pokemon.findAll({ where: { name: name } });
  const dataBasePokemonPlain = dataBasePokemon.map((pokemon) => pokemon.toJSON());
  
  if (dataBasePokemonPlain.length > 0) {
    // Si el pokemon se encuentra en la base de datos, devuelve los datos del pokemon de la base de datos
    return dataBasePokemonPlain;
  } else {
    // Si el pokemon no se encuentra en la base de datos, continua con la búsqueda en la API
    const arr = [{ name: name, url: `https://pokeapi.co/api/v2/pokemon/${name}` }];
    let formatData = [];
    try {
      formatData = await formatArrayApi(arr);
      if (formatData.length === 0) {
        // Si no se encontró ningún pokemon en la API, lanza un error
        throw new Error("El pokemon no se encuentra.");
      } else {
        // Si el pokemon se encuentra en la API, devuelve los datos del pokemon de la API
        return formatData;
      }
    } catch (error) {
      // Si hay algún otro error al buscar en la API, lanza un error con el mensaje original
      throw new Error("El Pokémon no se encuentra en la base de datos ni en la API.");
    }
  }
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