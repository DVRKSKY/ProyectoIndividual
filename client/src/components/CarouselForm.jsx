import React, { useState } from 'react';
//import styles from '../modules/carouselForm.module.sass';
import styles from '../modules/form.module.sass'
const CarouselForm = ({ form, errors, changeHandler, validate, isValid, onSubmit }) => {
    
    const steps = [
        { field: 'name', type: 'text', label: 'Name:' },
        { field: 'imagen', type: 'text', label: 'Imagen:' },
        { field: 'imagenGame', type: 'text', label: 'Imagen Game:' },
        { field: 'vida', type: 'range', label: 'Vida:' },
        { field: 'ataque', type: 'range', label: 'Ataque:' },
        { field: 'defensa', type: 'range', label: 'Defensa:' },
        { field: 'ataqueEspecial', type: 'range', label: 'Ataque Especial:' },
        { field: 'defenzaEspecial', type: 'range', label: 'Defensa Especial:' },
        { field: 'velocidad', type: 'range', label: 'Velocidad:' },
        { field: 'altura', type: 'range', label: 'Altura:' },
        { field: 'peso', type: 'range', label: 'Peso:' },
        {
            field: 'tipo',
            type: 'checkbox-group',
            label: 'Tipo:',
            options: [
              "normal", "fighting", "flying", "poison", "ground", "rock", "bug", "ghost",
              "steel", "fire", "water", "grass", "electric", "psychic", "ice", "dragon",
              "dark", "fairy", "unknown", "shadow",
            ],
          }
          
        // Agrega el resto de los campos aquí.
    ];
    
    const totalSteps = steps.length;
    const [currentStep, setCurrentStep] = useState(0);
    const currentField = steps[currentStep]; // Agrega esta línea
    
    
    const nextStep = () => {
        console.log("Next step");
        setCurrentStep(currentStep + 1);
        //if (isValid(currentField.field)) {
        //}
    };
      
    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit();
    };
    
      
    const prevStep = () => {
        console.log("Previous step");
        setCurrentStep(currentStep - 1);
    };
    
    return (
        <div className={styles.carouselForm}>
          <label>{currentField.label}</label>
          {currentField.type === 'checkbox-group' ? (
            <div className={styles.checkboxGroup}>
              {currentField.options.map((type) => (
                <label key={type} className={styles.checkboxContainer}>
                  <input
                    type="checkbox"
                    name="tipo"
                    value={type}
                    checked={form.tipo.includes(type)}
                    onChange={changeHandler}
                  />
                  {type}
                </label>
              ))}
            </div>
          ) : (
            <input
              name={currentField.field}
              type={currentField.type}
              value={form[currentField.field]}
              onChange={changeHandler}
              className={errors[currentField.field] ? styles.inputError : ''}
            />
          )}
          {errors[currentField.field] && <div className={styles.error}>{errors[currentField.field]}</div>}
          <button onClick={prevStep} disabled={currentStep === 0}>Anterior</button>
          <button onClick={nextStep} >Siguiente</button>

          {/*<button
            onClick={currentStep === totalSteps - 1 ? handleSubmit : nextStep}
            disabled={currentStep === totalSteps - 1 && !isValid(currentField.field)}
            >
           {currentStep === totalSteps - 1 ? "Enviar" : "Siguiente"}
          </button>*/}



        </div>
      );
  };
  
export default CarouselForm;
