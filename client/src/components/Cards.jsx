import React, { useEffect, useState,  } from 'react'
import style from '../modules/cards.module.sass'
import Bottom from '../components/buttons/Bottom'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from "react-router-dom"
import Card from './Card';
import { getColors, setColorBackground, getPokemons, moveCarrusel, activeIndexHandler } from '../redux/actions';



export default function Cards({ avanzarFunction , retrocederFunction}) {
    //Mejoras, crear componente card, y separalo para poder modularizarlo
  const pokemonsFiltered = useSelector(state => state.pokemonsFiltered);
  const i = useSelector(state => state.i)
  const f = useSelector(state => state.f)
  const activeIndex = useSelector(state => state.activeIndex)

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const verDetails = ruta => {
    navigate(ruta);
  };

  const [arrayMostrado, setArrayMostrado] = useState([]);

  const avanzar = () => {
    setTimeout(() => {
      dispatch(moveCarrusel(1))
      dispatch(getPokemons(i + 1))
      dispatch(activeIndexHandler((activeIndex + 1) % pokemonsFiltered.length))
    }, 500);
  };

  const retroceder = () => {
    if(activeIndex === 0) {
      navigate("/")
    }else{
      setTimeout(() => {
        dispatch(moveCarrusel(- 1))
        dispatch(
          activeIndexHandler(
            ((activeIndex - 1) + pokemonsFiltered.length) %
              pokemonsFiltered.length
          )
        );
      }, 500);
    }
  };
  
  useEffect(() => {
    dispatch(getColors());
    dispatch(getPokemons(i))
  }, [dispatch, i]);


  useEffect(() => {
    const newArrayMostrado = pokemonsFiltered.slice(i, f); 
    setArrayMostrado(newArrayMostrado);
    if (newArrayMostrado) dispatch(setColorBackground(newArrayMostrado?.[0]?.tipo[0]));
  }, [i, f, dispatch, pokemonsFiltered]);
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
        <div className={style.noFound} style={{ display: pokemonsFiltered.length === 0 ? 'block' : 'none' }}>
          No hay {'>'}_{'<'}
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
