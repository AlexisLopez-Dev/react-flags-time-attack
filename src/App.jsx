import datos from './datos.json';
import { useEffect, useState } from 'react';
import { Footer } from './components/Footer';
import { GameZone } from './components/GameZone';
import { Ranking } from './components/Ranking';
import { Timer } from './components/Timer';

function shellClassName(feedback) {
  const base =
    'mx-auto w-[92%] max-w-[550px] rounded-2xl border bg-slate-800 px-5 py-6 text-center shadow-sm transition-[border-color,box-shadow] duration-200 ease-out sm:w-[90%] sm:px-8 sm:py-8 md:max-w-5xl md:px-8 md:py-7';
  if (feedback === 'correcta') {
    return `${base} border-green-500 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1),0_2px_4px_-1px_rgba(0,0,0,0.06),0_0_0_2px_rgba(34,197,94,0.35)]`;
  }
  if (feedback === 'incorrecta') {
    return `${base} animate-feedback-shake border-red-500 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1),0_2px_4px_-1px_rgba(0,0,0,0.06),0_0_0_2px_rgba(239,68,68,0.4)]`;
  }
  return `${base} border-slate-700 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1),0_2px_4px_-1px_rgba(0,0,0,0.06)]`;
}

function App() {
  const [paises] = useState(() => {
    return [...datos].sort(() => Math.random() - 0.5);
  });

  const [contador, setContador] = useState(0);

  const [puntos, setPuntos] = useState(0);
  const [feedback, setFeedback] = useState('');

  function alTerminarTurno(resultado, tipo = 'respuesta') {
    setPuntos(puntos + resultado);
    setContador(contador + 1);

    if (tipo === 'respuesta') {
      setFeedback(resultado === 1 ? 'correcta' : 'incorrecta');
    }
  }

  // TIMER
  const TIEMPO_TOTAL = 30;
  const [timer, setTimer] = useState(TIEMPO_TOTAL);

  useEffect(() => {
    const intervalo = setInterval(() => {
      setTimer((tiempo) => {
        if (tiempo <= 0) {
          clearInterval(intervalo);
          return 0;
        }
        return tiempo - 1;
      });
    }, 1000);

    return () => clearInterval(intervalo);
  }, []);

  useEffect(() => {
    if (!feedback) return;

    const timeout = setTimeout(() => {
      setFeedback('');
    }, 1000);

    return () => clearTimeout(timeout);
  }, [feedback]);

  const porcentaje = (timer / TIEMPO_TOTAL) * 100;

  if (timer <= 0) {
    return (
      <div className={shellClassName('')}>
        <Ranking puntos={puntos} />
        <Footer />
      </div>
    );
  }

  const paisActual = paises[contador];
  return (
    <div className={shellClassName(feedback)}>
      <h1 className="mb-2 text-[2.2em] font-bold leading-tight tracking-tight text-slate-50">
        Diversión con banderas
      </h1>
      <GameZone rondaActual={contador + 1} paisActual={paisActual} alTerminarTurno={alTerminarTurno} />
      <Timer porcentaje={porcentaje} timer={timer} />
      <Footer />
    </div>
  );
}

export default App;
