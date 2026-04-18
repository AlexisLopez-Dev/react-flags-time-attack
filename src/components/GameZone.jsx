import { useEffect } from "react";
import { useForm } from "react-hook-form";

export const GameZone = ({ rondaActual, paisActual, alTerminarTurno }) => {
  const {
    register,
    handleSubmit,
    reset,
    setFocus,
    formState: { errors },
  } = useForm();

  const normalizarTexto = (texto) =>
    texto
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .trim();

  const handleSubmitForm = handleSubmit((data) => {
    let resultado = 0;

    if (normalizarTexto(data.nombreInput) === normalizarTexto(paisActual.nombre)) resultado = 1;

    alTerminarTurno(resultado, 'respuesta');

    reset();
  });

  useEffect(() => {
    setFocus('nombreInput');
  }, [rondaActual, setFocus]);

  const saltarRonda = () => {
    alTerminarTurno(0, 'saltar');
    reset();
  };

  return (
    <>
      <h3 className="mt-0 mb-4 text-[1.1em] font-medium text-slate-400">Ronda {rondaActual}</h3>
      <form
        className="grid w-full grid-cols-1 gap-4 md:grid-cols-[minmax(0,1.08fr)_minmax(280px,0.92fr)] md:items-center md:gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(340px,0.9fr)] lg:gap-8"
        onSubmit={handleSubmitForm}
      >
        <div className="my-1 flex h-[clamp(170px,42vw,310px)] w-full items-center justify-center overflow-hidden rounded-lg md:my-0 md:h-[clamp(230px,30vw,320px)]">
          <img
            src={paisActual.url}
            alt={paisActual.nombre}
            className="h-full w-auto max-w-full rounded-lg object-contain"
          />
        </div>

        <div className="flex w-full flex-col items-stretch justify-center">
          <span className="mb-2 text-base font-medium text-slate-200 md:text-left">Nombre del país:</span>
          <input
            type="text"
            autoFocus
            className="w-full rounded-lg border border-slate-600 bg-slate-950 px-4 py-3 text-base text-white transition-all focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
            {...register('nombreInput', {
              required: '¡Escribe algo!',
              minLength: {
                value: 2,
                message: '¡Prueba con un nombre más largo!',
              },
            })}
          />
          <p className="mt-2 min-h-[1.2em] text-sm font-medium text-red-400 md:text-left">{errors.nombreInput?.message}</p>

          <button
            type="submit"
            className="mt-2 w-full rounded-lg border border-transparent bg-indigo-600 px-6 py-3 text-base font-semibold text-white transition hover:-translate-y-px hover:bg-indigo-700 active:translate-y-0"
          >
            Enviar
          </button>
          <button
            type="button"
            className="mt-3 w-full rounded-lg border border-slate-600 bg-transparent px-6 py-3 text-base font-semibold text-slate-300 transition hover:border-slate-400 hover:bg-slate-400/10 hover:text-slate-100"
            onClick={saltarRonda}
          >
            Saltar bandera
          </button>
        </div>
      </form>
    </>
  );
};
