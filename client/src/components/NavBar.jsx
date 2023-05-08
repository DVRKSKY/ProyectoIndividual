import React from 'react'
import Chip from './buttons/Chip'
import style from '.././modules/navbar.module.sass'
import { useNavigate  } from "react-router-dom";
export default function NavBar() {
  const navigate = useNavigate ()
  const handleClick = (ruta) => {
    navigate(ruta)
  }
  return (
    <div className={style.contenido}>
        <Chip texto="Buscar" icono="search" funcion={handleClick} ruta="/buscar"/>
        <Chip texto="Agregar" icono="add"  funcion={handleClick} ruta="/create"/>
        {/*<Chip texto="Filtrar" icono="sort" />*/}
        {/*<div>
          <select>
            <option value="DEFAULT" disable>Filtrar por origen</option>
            <option value="db" >Base de datos</option>
            <option value="api" >Api pokemon</option>
          </select>
          
        </div>*/}
    </div>
  )
}
