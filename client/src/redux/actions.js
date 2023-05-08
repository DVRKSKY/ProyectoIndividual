import axios from "axios"

export const GET_POKEMONS = "GET_POKEMONS"
export const GET_POKEMON  =  "GET_POKEMON"
export const GET_COLORS = "GET_COLORS"
export const SET_COLOR_BACKGROUND = "SET_COLOR_BACKGROUND"
export const FILTER_BY_ORIGIN = "FILTER_BY_ORIGIN"


//Mover carrusel
export const MOVE_CARRUSEL = "MOVE_CARRUSEL"
export const ACTIVE_INDEX = "ACTIVE_INDEX"

export const getPokemons = (pagina) => {
    return async function(dispatch){
        let apiData
        if( !pagina){
            apiData = await axios.get("http://localhost:3001/pokemons/home")
        }else{
            apiData = await axios.get(`http://localhost:3001/pokemons/home?pagina=${pagina}`)
        }
        const pokemons = apiData.data
        dispatch({type: GET_POKEMONS, payload: pokemons})
    }
}

export const getPokemon = (id) => {
    return async function(dispatch){
        const apiData = await axios.get(`http://localhost:3001/pokemons/home/${id}`)
        const pokemon = apiData.data
        dispatch({type: GET_POKEMON, payload: pokemon})
    }
}

export const getColors = () => {
    return async function(dispatch) {
        const apiData = await axios.get(`http://localhost:3001/pokemons/types`)
        const pokemonTypes = apiData.data
        dispatch({type: GET_COLORS, payload: pokemonTypes})
    }
}

export const setColorBackground = (type) => {
    return async function(dispatch){
        const apiData = await axios.get(`http://localhost:3001/pokemons/types`)
        const pokemonColor = apiData.data.filter(c => c.name === type)
        const color = pokemonColor[0]?.color
        dispatch({type: SET_COLOR_BACKGROUND, payload: color})
    }
}
export const filterByOrigin = (origen) => {
    return {type: FILTER_BY_ORIGIN, payload: origen}
}

export const moveCarrusel = (valor) => {
    return function(dispatch, getState){
        const currentValueI = getState().i
        const currentValueF = getState().f

        const newValueI = currentValueI + valor
        const newValueF = currentValueF + valor
        const mover = [newValueI, newValueF]
        dispatch({type: MOVE_CARRUSEL, payload: mover})
    }
}


export const activeIndexHandler = (valor) => {
    return {type: ACTIVE_INDEX, payload: valor}

}
/*

Action creator normalita
export const filterRamdom = () => {
    dispatch({type:"FILTER_BY_SOURCE"})
}
*/