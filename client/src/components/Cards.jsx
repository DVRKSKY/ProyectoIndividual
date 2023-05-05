import React, { useEffect, useState,  } from 'react'
import style from '../modules/cards.module.sass'
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
    const [activeIndex, setActiveIndex] = useState(0);
    //Ir a la ruta
    const verDetails = (ruta) =>{
      navigate(ruta)
    }
    
    const [arrayMostrado, setArrayMostrado] = useState([]);
    const avanzar =()=>{
      //Enviamos al state el typo depokemon al avanzar para cambiar de color
      
      setTimeout(()=>{
        setI(prevI => prevI + 1)
        setF(prevF => prevF + 1)
        setActiveIndex((prevActiveIndex) => (prevActiveIndex + 1) % pokemons.length);
      }, 500)
    }
    const retroceder =()=>{
        //Enviamos al state el typo depokemon al retroceder, para cambiar de color

        setTimeout(()=>{
          setI(prevI => prevI - 1)
          setF(prevF => prevF - 1)
          setActiveIndex((prevActiveIndex) => (prevActiveIndex - 1 + pokemons.length) % pokemons.length);
        },500)
    }
    useEffect(()=>{
      const newArrayMostrado = pokemons.slice(i, f) // Mover la lógica de 'get' aquí
      setArrayMostrado(newArrayMostrado);
      if(newArrayMostrado) dispatch(setColorBackground(newArrayMostrado?.[0]?.tipo[0]))
  }, [i, f, dispatch, pokemons])

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
              imagenOriginal={poke.imagenOriginal}
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
