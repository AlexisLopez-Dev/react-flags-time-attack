import { useState } from "react";
import { useForm } from "react-hook-form";

function leerRankingInicial() {
  const datosGuardados = localStorage.getItem('ranking');
  if (datosGuardados) {
    try {
      return JSON.parse(datosGuardados);
    } catch {
      return [];
    }
  }
  localStorage.setItem('ranking', JSON.stringify([]));
  return [];
}

export const Ranking = ({ puntos }) => {
  const [listaRanking, setListaRanking] = useState(leerRankingInicial);

  const [guardado, setGuardado] = useState(false);

  const { register, handleSubmit, reset } = useForm();

  const handleSubmitForm = handleSubmit((data) => {
    const nombreUsuario = data.nombreUsuario;

    const nuevaLista = [...listaRanking, { nombreUsuario, puntos }];
    localStorage.setItem('ranking', JSON.stringify(nuevaLista));

    setListaRanking(nuevaLista);
    setGuardado(true);
    reset();
  });

  return (
    <>
      <h1 className="mb-2 text-3xl font-bold leading-tight tracking-tight text-slate-50 sm:text-4xl">
        ¡Partida terminada!
      </h1>
      <h3 className="mt-0 text-[1.1em] font-medium text-slate-400">Puntuación total: {puntos}</h3>

      <div className="mt-3 grid grid-cols-1 gap-4 md:mt-5 md:grid-cols-[minmax(300px,0.9fr)_minmax(0,1.1fr)] md:items-start lg:grid-cols-[minmax(340px,0.8fr)_minmax(0,1.2fr)]">
        <div className="w-full rounded-xl border border-slate-700 bg-slate-900/30 p-4 md:p-5">
          <h2 className="text-left text-lg font-semibold text-slate-100">Guardar puntuación</h2>
          {guardado ? (
            <h3 className="mt-3 text-left text-[1.05em] font-medium text-emerald-300">¡Record guardado con éxito!</h3>
          ) : (
            <form className="mt-3 flex w-full flex-col items-start gap-3" onSubmit={handleSubmitForm}>
              <span className="text-base font-medium text-slate-200">Tu nombre:</span>
              <input
                type="text"
                className="w-full rounded-lg border border-slate-600 bg-slate-950 px-4 py-3 text-base text-white transition-all focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                {...register('nombreUsuario')}
              />
              <button
                type="submit"
                className="mt-2 w-full rounded-lg border border-transparent bg-indigo-600 px-6 py-3 text-base font-semibold text-white transition hover:-translate-y-px hover:bg-indigo-700 active:translate-y-0"
              >
                Guardar record
              </button>
            </form>
          )}
        </div>

        <div className="w-full rounded-xl border border-slate-700 bg-slate-900/30 p-4 md:p-5">
          <h2 className="text-left text-xl font-semibold text-slate-100">Ranking actual:</h2>
          <ul className="mt-4 list-none p-0 text-left">
            {[...listaRanking]
              .sort((a, b) => b.puntos - a.puntos)
              .map((item, index) => (
                <li
                  key={index}
                  className="mb-2 flex items-center justify-between rounded-md border border-slate-600 bg-slate-950 px-4 py-3"
                >
                  <strong className="font-semibold text-white">{item.nombreUsuario}:</strong>
                  <span>{item.puntos} puntos</span>
                </li>
              ))}
          </ul>
        </div>
      </div>

      <button
        type="button"
        className="mt-5 w-full rounded-lg border border-transparent bg-indigo-600 px-6 py-3 text-base font-semibold text-white transition hover:-translate-y-px hover:bg-indigo-700 active:translate-y-0 md:mx-auto md:mt-6 md:max-w-[360px]"
        onClick={() => window.location.reload()}
      >
        Jugar otra vez
      </button>
    </>
  );
};
