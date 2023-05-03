import React from 'react'
import Chip from './buttons/Chip'
import style from '.././modules/navbar.module.sass'
export default function NavBar() {
  return (
    <div className={style.contenido}>
        <Chip texto="Buscar" icono="search" />
        <Chip texto="Agregar" icono="add" />
        <Chip texto="Filtrar" icono="sort" />
    </div>
  )
}
