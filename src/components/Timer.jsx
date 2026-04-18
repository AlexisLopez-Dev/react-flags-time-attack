export const Timer = ({ porcentaje, timer }) => {
  const esCritico = porcentaje < 20;

  return (
    <div className="mt-6 h-4 w-full overflow-hidden rounded-full bg-slate-600">
      <div
        className={`flex h-full items-center justify-center rounded-full transition-[width] duration-1000 ease-linear ${
          esCritico ? 'bg-red-500' : 'bg-indigo-600'
        }`}
        style={{ width: `${porcentaje}%` }}
      >
        {porcentaje > 10 && (
          <span className="text-[10px] font-bold text-white [text-shadow:0_1px_2px_rgba(0,0,0,0.3)]">
            {timer}s
          </span>
        )}
      </div>
    </div>
  );
};
