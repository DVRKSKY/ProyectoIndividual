import React from 'react';
import style from '../modules/home.module.sass';
import Cards from '../components/Cards';
import NavBar from '../components/NavBar';



export default function Home() {
  
  
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
