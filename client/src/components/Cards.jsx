import React, { useEffect, useState,  } from 'react'
import style from '../modules/cards.module.sass'
import Bottom from '../components/buttons/Bottom'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from "react-router-dom"
import Card from './Card';
import { getColors, setColorBackground } from '../redux/actions';



export default function Cards({ avanzarFunction , retrocederFunction}) {
    //Mejoras, crear componente card, y separalo para poder modularizarlo
    
    const pokemonsFiltered = useSelector(state => state.pokemonsFiltered);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [i, setI] = useState(0);
  const [f, setF] = useState(4);
  const [activeIndex, setActiveIndex] = useState(0);

  const verDetails = ruta => {
    navigate(ruta);
  };

  const [arrayMostrado, setArrayMostrado] = useState([]);

  const avanzar = () => {
    setTimeout(() => {
      setI(prevI => prevI + 1);
      setF(prevF => prevF + 1);
      setActiveIndex(prevActiveIndex => (prevActiveIndex + 1) % pokemonsFiltered.length);
    }, 500);
  };

  const retroceder = () => {
    setTimeout(() => {
      setI(prevI => prevI - 1);
      setF(prevF => prevF - 1);
      setActiveIndex(prevActiveIndex => (prevActiveIndex - 1 + pokemonsFiltered.length) % pokemonsFiltered.length);
    }, 500);
  };

  useEffect(() => {
    dispatch(getColors());
  }, [dispatch]);

  useEffect(() => {
    const newArrayMostrado = pokemonsFiltered.slice(i, f); // Mover la lógica de 'get' aquí
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
