import datos from './datos.json';
import { useState } from 'react';
import { GameZone } from './components/GameZone';

function App() {

  const [paises] = useState(()=>{
    return [...datos].sort(() => Math.random() - 0.5)
  });
  

  const [contador, setContador] = useState(0);

  const [puntos, setPuntos] = useState(0);

  function alTerminarTurno (resultado) {
    setPuntos(puntos + resultado)
    setContador(contador+1);
  }
  
  if (contador >= 5){
    return(
      <>
        <h1>¡Juego terminado!</h1>
        <h3>Puntuación total: {puntos}</h3>
      </>
    )
  }

  const paisActual = paises[contador];

  return (
    
    <>
      <h1>Diversión con banderas</h1>
      <GameZone rondaActual={contador+1} 
                paisActual={paisActual} 
                alTerminarTurno={alTerminarTurno} >
      </GameZone>
    </>
    
  )
}

export default App
