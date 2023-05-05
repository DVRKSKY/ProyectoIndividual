import axios from "axios"

export const GET_POKEMONS = "GET_POKEMONS"
export const GET_POKEMON  =  "GET_POKEMON"
export const GET_COLORS = "GET_COLORS"
export const SET_COLOR_BACKGROUND = "SET_COLOR_BACKGROUND"

export const getPokemons = () => {
    return async function(dispatch){
        const apiData = await axios.get("http://localhost:3001/pokemons/home")
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
        const pokemonColor = apiData.data.filter(c => c.name == type)
        const color = pokemonColor[0]?.color
        dispatch({type: SET_COLOR_BACKGROUND, payload: color})
    }
}
/*
Action creator normalita
export const filterRamdom = () => {
    dispatch({type:"FILTER_BY_SOURCE"})
}
*/