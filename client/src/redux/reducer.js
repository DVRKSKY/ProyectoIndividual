import imagenPrueba from '../assets/Treecko.svg'
import { GET_POKEMONS, GET_POKEMON, GET_COLORS, SET_COLOR_BACKGROUND } from './actions'

const initialState = {
    pokemons: [],
    pokemonDetail: [],
    colors: [],
    colorBackground: "",
}
//Nuestra personita encargada de hacer todo
const rootReducer = (state=initialState, action) => {
    switch (action.type){
        case GET_POKEMONS:
            return {...state, pokemons: action.payload}
        case GET_POKEMON:
            return {...state, pokemonDetail: action.payload}
        case GET_COLORS:
            return {...state, colors: action.payload}
        case SET_COLOR_BACKGROUND:
            return {...state, colorBackground: action.payload}
        default:
            return {...state, colorBackground: action.payload}
    }
}

export default rootReducer