import React from 'react';
import style from '../modules/home.module.sass';
import Cards from '../components/Cards';
import NavBar from '../components/NavBar';

//Ejecutamos el dispatch
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getPokemons } from '../redux/actions';

export default function Home() {
  //Cargamos la data en el momento que el componente Home se monta
  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(getPokemons())
  },[dispatch])
  
  return (
    <div className={style.fondo}>
      <div className={style.navBar}>
        <NavBar/>
      </div>
      <div className={style.groupCards}>
        <Cards/>
      </div>
      <div className={style.pokeFondo}></div>
    </div>
  );
}
