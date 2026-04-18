import { FaGithub } from "react-icons/fa";

export const Footer = () => {
  return (
    <footer className="mt-5 flex items-center justify-center gap-3 border-t border-slate-700/70 pt-4 text-sm text-slate-300">
      <span>Desarrollado por Alexis López</span>
      <a
        href="https://github.com/AlexisLopez-Dev/react-flags-time-attack"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Repositorio en GitHub"
        className="text-slate-200 transition hover:text-white"
      >
        <FaGithub className="h-5 w-5" aria-hidden="true" />
      </a>
    </footer>
  );
};
