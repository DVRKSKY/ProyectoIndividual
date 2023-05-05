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
        <Chip texto="Buscar" icono="search" />
        <Chip texto="Agregar" icono="add"  funcion={handleClick} ruta="/create"/>
        <Chip texto="Filtrar" icono="sort" />
    </div>
  )
}
