import React from 'react'
import style from '../modules/consola.module.sass'
import { useState } from 'react'

export default function Consola() {
  //Creamos una variable para que cambie el fondo de acuerdo al pokemon seleccionado
  const [fondoDinamico, setFondoDinamico] = useState('pink')

  //Vamos a hacer que el Joystick siga al mouse
  const [position, setPosition] = useState({ x: 0, y: 0 })
  //Esta funcion obtiene la posicion
  function handleMouseMove(event) {
    let resultadoX = (event.clientX - (window.innerWidth / 2))/ window.innerWidth
    let resultadoY = (event.clientY - (window.innerHeight/ 2))/ window.innerHeight
    console.log(event.clientX , window.innerWidth)
    setPosition({ x: resultadoX, y: resultadoY });
  }
  return (
    <div className={style.fondo} onMouseMove={handleMouseMove}  style={{backgroundColor: fondoDinamico}} >
      <div className={style.consola} >
        <div className={style.mandoIzquierdo}>
          <div className={style.botones}>
            <div className={style.joystick}></div>
            <div className={style.flechas}>
              <div className={style.upArrow}></div>
              <div className={style.downArrow}></div>
              <div className={style.leftArrow}></div>
              <div className={style.rightArrow}></div>
            </div>
          </div>
        </div>
        <div className={style.pantalla} ></div>
        <div className={style.mandoDerecho}>
          <div className={style.botones}>
            <div className={style.flechas}>
              <div className={style.upArrow}></div>
              <div className={style.downArrow}></div>
              <div className={style.leftArrow}></div>
              <div className={style.rightArrow}></div>
            </div>
            <div className={style.joystick}>
              <div className={style.botonJoystick}  style={{ top: (position.y * 120)/2, left: (position.x * 120) / 2 }} ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
