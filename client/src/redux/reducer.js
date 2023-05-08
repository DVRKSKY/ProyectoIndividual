import { GET_POKEMONS, GET_POKEMON, GET_COLORS, SET_COLOR_BACKGROUND, FILTER_BY_ORIGIN } from './actions'

const initialState = {
    pokemons: [],
    pokemonDetail: [],
    pokemonsFiltered: [],
    colors: [],
    colorBackground: "rgba(250, 113, 121, 1)",
}
//Nuestra personita encargada de hacer todo
const rootReducer = (state=initialState, action) => {
    switch (action.type){
        case GET_POKEMONS:
            return {...state, pokemons: action.payload, pokemonsFiltered: action.payload}
        case GET_POKEMON:
            return {...state, pokemonDetail: action.payload}
        case GET_COLORS:
            return {...state, colors: action.payload}
        case SET_COLOR_BACKGROUND:
            return {...state, colorBackground: action.payload}
        case FILTER_BY_ORIGIN:
            if(action.payload === "db"){
                const newFilter = state.pokemons.filter((pokemon) => pokemon.created === true )
                return {...state, pokemonsFiltered: newFilter}
            }else if(action.payload ==="api"){
                const newFilter = state.pokemons.filter((pokemon) => pokemon.created === false )
                return {...state, pokemonsFiltered: newFilter}
            }else if(action.payload === "all"){
                return {...state, pokemonsFiltered: state.pokemons}

            //Ordenamiento por nombre
            } else if(action.payload === "asc"){
                //evitamos mutar el estado original y creamos un nuevo array
                const newOrd = [...state.pokemonsFiltered].sort((a,b)=> a.name.localeCompare(b.name))
                return {...state, pokemonsFiltered: newOrd}

            } else if(action.payload === "des"){
                //evitamos mutar el estado original y creamos un nuevo array
                const newOrd = [...state.pokemonsFiltered].sort((a,b)=> b.name.localeCompare(a.name))
                return {...state, pokemonsFiltered: newOrd}
            //Ordenamiento por ataque
            }else if( action.payload === "ataqueAsc"){
                const newOrd = [...state.pokemonsFiltered].sort((a,b)=> a.ataque - b.ataque)
                console.log(newOrd);
                return {...state, pokemonsFiltered: newOrd}
            }else if( action.payload === "ataqueDes"){
                const newOrd = [...state.pokemonsFiltered].sort((a,b)=> b.ataque - a.ataque);
                console.log(newOrd);
                return {...state, pokemonsFiltered: newOrd};

            //Filtro por tipo
            }else{
                const newFilter = state.pokemonsFiltered.filter((pokemon)=> pokemon.tipo[0] === action.payload )
                if(newFilter.length <= 0){
                    console.log("NO HAY POKEMONS")
                }else{
                    console.log(newFilter, ":::Filtros por tipo")
                }
                return {...state, pokemonsFiltered: newFilter}
            }
            
        default:
            return {...state, colorBackground: action.payload}
    }
}

export default rootReducer