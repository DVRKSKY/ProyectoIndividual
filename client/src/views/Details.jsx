import React from 'react'
import style from '../modules/details.module.sass'
import treecko from '../assets/Treecko.svg'
//Usamos una libreria para hacer el radar, ya que me tomaria mucho tiempo hacerla a mano
//Y quiero hacer un jueguito, asi que a apalancarse.
import Bottom from '../components/buttons/Bottom'
import { Radar } from 'react-chartjs-2'

export default function Details() {
  const detalles = {
    nombre: 'Treecko',
    id: '00002',
    record: 1000,
    tipo: ['planta', 'lucha', 'insecto' ],
    poderes: ['disparon', 'regeneración'],
    estadisticas: {
      vida: 150,
      ataque: 150,
      defensa: 150,
      speed: 150,
      altura: 150,
      peso: 150, 
    },
    imagen: treecko 
  }
  const getPokemonRadarData = () => {
    return {
      labels: ['Vida', 'Ataque', 'Defensa', 'Velocidad', 'Altura', 'Peso'],
      datasets: [
        {
          label: detalles.nombre,
          data: [
            detalles.estadisticas.vida,
            detalles.estadisticas.ataque,
            detalles.estadisticas.defensa,
            detalles.estadisticas.speed,
            detalles.estadisticas.altura,
            detalles.estadisticas.peso,
          ],
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
        },
      ],
    };
  };
  const getPokemonRadarOptions = () => {
    return {
      scales: {
        r: {
          min: 0,
          max: 200, // Aca definiremos el valor maximo del radar
          ticks: {
            stepSize: 50, // Los saltos entre bloques aqui definimos
            backdropColor: 'rgba(200, 200, 200, 0)', // Cambia el color de fondo aquí
          },
          pointLabels: {
            color: '#000', // Define el color del texto aquí
            font: {
              size: 14, // Define el tamaño de la fuente aquí
            },
          },
        },
      },
      plugins: {
        legend: {
          display: false,
        },
      },
    };
  };
  
  return (
    <div className={style.fondo}>
      <div className={style.pokeFondo}></div>
      <div className={style.estadisticas}>
        <Radar className={style.radar} data={getPokemonRadarData} options={getPokemonRadarOptions()} />
        <div className={style.otrasStats}>
          <div className={style.contenido}>
            <h5 className={style.titulo}>Nombre: </h5>
            <h5 className={style.texto}>{detalles.nombre}</h5>
          </div>
          <div className={style.contenido}>
            <h5 className={style.titulo}>Record: </h5>
            <h5 className={style.texto}>{detalles.record} pts</h5>
          </div>
          <div className={style.contenido}>
            <h5 className={style.titulo}>Tipo: </h5>
            <h5 className={style.texto}>Planta</h5>
          </div>
          <div className={style.contenido}>
            <h5 className={style.titulo}>Poderes: </h5>
            <h5 className={style.texto}>Volar</h5>
          </div>
        </div>
      </div>
      <div className={style.presentacion}>
        <div className={style.id}>#00002</div>
        <div className={style.imagen}>
          <img src={detalles.imagen}/>
        </div>
      </div>
      <div className={style.actions}>
        <Bottom
          texto1="Volver"
          texto2="Seleccionar"
          boton1="B"
          boton2="A"
        />
        </div>
    </div>
  )
}
