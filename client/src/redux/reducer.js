import imagenPrueba from '../assets/Treecko.svg'
import { GET_POKEMONS, GET_POKEMON } from './actions'

const initialState = {
    pokemons: [],
    pokemonDetail: [],
}
//Nuestra personita encargada de hacer todo
const rootReducer = (state=initialState, action) => {
    switch (action.type){
        case GET_POKEMONS:
            return {...state, pokemons: action.payload}
        case GET_POKEMON:
            return {...state, pokemonDetail: action.payload}
        default:
            return {...state}
    }
}

export default rootReducer