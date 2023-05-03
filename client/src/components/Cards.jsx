import React, { useEffect, useState,  } from 'react'
import style from '../modules/cards.module.sass'
import imagenPrueba from '../assets/Treecko.svg'
import pokebola from '../assets/pokebola.svg'
import Bottom from '../components/buttons/Bottom'

export default function Cards({ avanzarFunction , retrocederFunction}) {
    const arrayBase = [
        {id:'00001', imagen: imagenPrueba, nombre: 'Treecko',},
        {id:'00002', imagen: imagenPrueba, nombre: 'Treecko',},
        {id:'00003', imagen: imagenPrueba, nombre: 'Treecko',},
        {id:'00004', imagen: imagenPrueba, nombre: 'Treecko',},
        {id:'00005', imagen: imagenPrueba, nombre: 'Treecko',},
        {id:'00006', imagen: imagenPrueba, nombre: 'Treecko',},
        {id:'00007', imagen: imagenPrueba, nombre: 'Treecko',},
        {id:'00008', imagen: imagenPrueba, nombre: 'Treecko',},
        {id:'00009', imagen: imagenPrueba, nombre: 'Treecko',},
        {id:'00010', imagen: imagenPrueba, nombre: 'Treecko',},
    ]
    const [i, setI] = useState(0)
    const [f, setF] = useState(4)
    const [animationDirection, setAnimationDirection] = useState("");
    const [activeIndex, setActiveIndex] = useState(0);


    const get = (i, f) => {
        return arrayBase.slice(i,f)
        
    }
    const [arrayMostrado, setArrayMostrado] = useState([]);
    const avanzar =()=>{


        setAnimationDirection("translateX(-100%)")
        setTimeout(()=>{
            setI(prevI => prevI + 1)
            setF(prevF => prevF + 1)
            setActiveIndex((prevActiveIndex) => (prevActiveIndex + 1) % arrayBase.length);
        }, 500)
    }
    const retroceder =()=>{
        setAnimationDirection("translateX(0%)")
        setTimeout(()=>{
            setI(prevI => prevI - 1)
            setF(prevF => prevF - 1)
            setActiveIndex((prevActiveIndex) => (prevActiveIndex - 1 + arrayBase.length) % arrayBase.length);
        },500)
    }
    useEffect(()=>{
        const newArrayMostrado = get(i, f)
        setArrayMostrado(newArrayMostrado);
        console.log(arrayMostrado);
    }, [i,f] )
    return (
        <div className={style.contenido}>
        <div className={style.cardsWrapper}>
          {arrayMostrado.map((poke, index) => {
            return (
              <div
                key={poke.id}
                className={`${style.card} ${
                  index === (activeIndex - i) % arrayMostrado.length
                    ? style.active
                    : ""
                }`}
              >
                <h1 className={style.id}>{poke.id}</h1>
                <img className={style.personaje} src={poke.imagen} />
                <h2 className={style.nombre}>{poke.nombre}</h2>
                <div className={style.backId}>#{poke.id}</div>
                <img className={style.action} src={pokebola} alt={poke.nombre} />
              </div>
            );
          })}
        </div>
        <div className={style.actions}>
          <Bottom
            texto1="Anterior"
            texto2="Siguiente"
            boton1="B"
            boton2="A"
            retroceder={retroceder}
            avanzar={avanzar}
          />
        </div>
      </div>
    )
}
