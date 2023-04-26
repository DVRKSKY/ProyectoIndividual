import React from 'react'
import style from '../modules/home.module.sass'
import { useState } from 'react'
import Cards from '../components/Cards'
export default function Home() {
  return (
    <div className={style.fondo} >
      <div className={style.navBar}></div>
      <div className={style.groupCards}>
        <Cards></Cards>

      </div>
      <div className={style.actions}></div>
      <div className={style.pokeFondo}></div>

    </div>
  )
}
