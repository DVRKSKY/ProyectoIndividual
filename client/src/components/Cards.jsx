import React, { useEffect, useState,  } from 'react'
import style from '../modules/cards.module.sass'
import pokebola from '../assets/pokebola.svg'
import Bottom from '../components/buttons/Bottom'
import { useSelector } from 'react-redux'
import { useNavigate } from "react-router-dom"
import Card from './Card';
import { getColors, setColorBackground } from '../redux/actions';
import { useDispatch } from 'react-redux';



export default function Cards({ avanzarFunction , retrocederFunction}) {
    //Mejoras, crear componente card, y separalo para poder modularizarlo
    const pokemons = useSelector(state => state.pokemons)

    const navigate = useNavigate()


    
    const dispatch = useDispatch();
  

    const [i, setI] = useState(0)
    const [f, setF] = useState(4)
    const [animationDirection, setAnimationDirection] = useState("");
    const [activeIndex, setActiveIndex] = useState(0);
    //Ir a la ruta
    const verDetails = (ruta) =>{
      navigate(ruta)
    }

    const get = (i, f) => {
        return pokemons.slice(i,f)
        
    }
    const [arrayMostrado, setArrayMostrado] = useState([]);
    const avanzar =()=>{
      //Enviamos al state el typo depokemon al avanzar para cambiar de color
      
      setAnimationDirection("translateX(-100%)")
      setTimeout(()=>{
        setI(prevI => prevI + 1)
        setF(prevF => prevF + 1)
        setActiveIndex((prevActiveIndex) => (prevActiveIndex + 1) % pokemons.length);
      }, 500)
    }
    const retroceder =()=>{
        //Enviamos al state el typo depokemon al retroceder, para cambiar de color

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
        //Aqui al detectar el cambio se actualiza el
        if(newArrayMostrado) dispatch(setColorBackground(newArrayMostrado?.[0]?.tipo[0]))

    }, [i,f] )

    useEffect(() => {
      dispatch(getColors());
    }, [dispatch]);

    return (
        <div className={style.contenido}>
        <div className={style.cardsWrapper}>
        {arrayMostrado.map((poke, index) => {
          return (
            <Card
              key={poke.id}
              id={poke.id}
              name={poke.name}
              imagen={poke.imagen}
              tipo={poke.tipo}
              onCardClick={() => verDetails(`/details/${poke.id}`)}
              isActive={index === (activeIndex - i) % arrayMostrado.length}
          />
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
