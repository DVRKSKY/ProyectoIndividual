import React, { useState } from 'react'
import axios from 'axios'
export default function Form() {
  
  const [form, setForm] = useState({
    name: '',
    imagen: '',
    imagenGame: '',
    poderes: ["overgrow",
    "chlorophyll"],
    vida: 0,
    ataque: 0,
    defensa: 0,
    ataqueEspecial: 0,
    defenzaEspecial: 0,
    velocidad: 0,
    altura: 0,
    peso: 0,
    tipo: [
      "grass",
      "poison"
    ],
  })

  const [errors, setErrors] = useState({
    name: '',
    imagen: '',
    imagenGame: '',
    //poderes: '',
    vida: 0,
    ataque: 0,
    defensa: 0,
    ataqueEspecial: 0,
    defenzaEspecial: 0,
    velocidad: 0,
    altura: 0,
    peso: 0,
    //tipo: '',
  })

  const changeHandler = (e) => {
    //obtenemos quien eh el que ta ejecutando y su valor
    const property = e.target.name
    const valor = e.target.value

    //Para evitar el delay le enviamos el mismo objeto
    validate({...form, [property]: valor})
    setForm({...form, [property]: valor})
  }
  const validate = (form) => {
    //Podemos validar con una exppresion regular
    //if(expresionregular.test(form.propiedadaTestear)) => todo bien
    if(form.name === "aa"){
      console.log("todo mal");
      setErrors({...errors, name:"Hay un error en el names"})
    }else{
      console.log("Esta bien");
      setErrors({...errors, name: ""})
    }
  }
  const submitHandler = (e) => {
    e.preventDefault()
    console.log(form);
    axios.post('http://localhost:3001/posts', form)
    .then(res => alert(res))
  }

  return (
    <form onSubmit={submitHandler}>
      <div>
        <label>Name:</label>
        <input name='name' type='text' value={form.name} onChange={changeHandler}/>
        {
          //logica para mostrar el error
          errors.name && <span>{errors.name}</span> 
          }
        
      </div>
      <div>
        <label>imagen:</label>
        <input name='imagen' type='text' value={form.imagen} onChange={changeHandler}/>
      </div>
      <div>
        <label>imagenGame:</label>
        <input name='imagenGame' type='text' value={form.imagenGame} onChange={changeHandler}/>
      </div>
      <div>
        <label>poderes:</label>
        <input name='poderes' type='text' value={form.poderes} onChange={changeHandler}/>
      </div>
      <div>
        <label>vida:</label>
        <input name='vida' type='text' value={form.vida} onChange={changeHandler}/>
      </div>
      <div>
        <label>ataque:</label>
        <input name='ataque' type='text' value={form.ataque} onChange={changeHandler}/>
      </div>
      <div>
        <label>defensa:</label>
        <input name='defensa' type='text' value={form.defensa} onChange={changeHandler}/>
      </div>
      <div>
        <label>ataqueEspecial:</label>
        <input name='ataqueEspecial' type='text' value={form.ataqueEspecial} onChange={changeHandler}/>
      </div>
      <div>
        <label>defenzaEspecial:</label>
        <input name='defenzaEspecial' type='text' value={form.defenzaEspecial} onChange={changeHandler}/>
      </div>
      <div>
        <label>velocidad:</label>
        <input name='velocidad' type='text' value={form.velocidad} onChange={changeHandler}/>
      </div>
      <div>
        <label>altura:</label>
        <input name='altura' type='text' value={form.altura} onChange={changeHandler}/>
      </div>
      <div>
        <label>tipo:</label>
        <input name='tipo' type='text' value={form.tipo} onChange={changeHandler}/>
      </div>
      <div>
        <label>peso:</label>
        <input name='peso' type='text' value={form.peso} onChange={changeHandler}/>
      </div>
      <button type='submit'>Crear pokemon</button>

    </form>
  )
}
