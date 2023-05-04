import React, { useEffect, useState,  } from 'react'
import style from '../modules/cards.module.sass'
import pokebola from '../assets/pokebola.svg'
import Bottom from '../components/buttons/Bottom'
import { useSelector } from 'react-redux'


export default function Cards({ avanzarFunction , retrocederFunction}) {
    //Mejoras, crear componente card, y separalo para poder modularizarlo
    const pokemons = useSelector(state => state.pokemons)
    
    const [i, setI] = useState(0)
    const [f, setF] = useState(4)
    const [animationDirection, setAnimationDirection] = useState("");
    const [activeIndex, setActiveIndex] = useState(0);


    const get = (i, f) => {
        return pokemons.slice(i,f)
        
    }
    const [arrayMostrado, setArrayMostrado] = useState([]);
    const avanzar =()=>{


        setAnimationDirection("translateX(-100%)")
        setTimeout(()=>{
            setI(prevI => prevI + 1)
            setF(prevF => prevF + 1)
            setActiveIndex((prevActiveIndex) => (prevActiveIndex + 1) % pokemons.length);
        }, 500)
    }
    const retroceder =()=>{
        setAnimationDirection("translateX(0%)")
        setTimeout(()=>{
            setI(prevI => prevI - 1)
            setF(prevF => prevF - 1)
            setActiveIndex((prevActiveIndex) => (prevActiveIndex - 1 + pokemons.length) % pokemons.length);
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
                <h2 className={style.nombre}>{poke.name}</h2>
                <div className={style.backId}>#{poke.id}</div>
                <img className={style.action} src={pokebola} alt={poke.name} />
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
