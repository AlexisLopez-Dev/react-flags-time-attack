import { useForm } from 'react-hook-form';
import datos from './datos.json';
import { useState } from 'react';


function App() {
  
  const {register, handleSubmit, reset, formState: {errors}} = useForm();
  
  const handleSubmitForm = handleSubmit(
    data => {
      setContador(contador+1),
      console.log(data),
      reset()
    }
  );

  const [contador, setContador] = useState(0);
  
  const [paises] = useState(()=>{
    return [...datos].sort(() => Math.random() - 0.5)
  });

  if (contador >= paises.length){
    return(
      <h1>¡Juego terminado!</h1>
    )
  }

  return (
    
    <>
      <h1>Diversión con banderas</h1>
        <form onSubmit={handleSubmitForm}>
          <img src={paises[contador].url} alt={paises[contador].pais} />

          Nombre del país:
          <input 
            type="text" 
            autoFocus
            {
              ...register('nombreInput', {
                required: '¡Escribe algo!',
                minLength: {
                  value: 2,
                  message: '¡Prueba con un nombre más largo!'
                }
              })
              
            }
          />
          <p> {errors.nombreInput?.message} </p>

          <button type="submit" >Enviar</button>
        </form>

    </>
    
    
  )
}

export default App
