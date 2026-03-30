import { Link } from 'react-router-dom';
import ReactLogo from "../assets/react.svg";

const MainLayout = () => {
  return (
    // Quitamos el bg-color de aquí porque ya está en App.tsx
    <div className="max-w-7xl mx-auto px-6 py-12 md:py-20">
      
      {/* 1. SECCIÓN PRESENTACIÓN */}
      <section className="grid grid-cols-1 md:grid-cols-5 gap-8">
        
        <div className="md:col-span-2 rounded-3xl bg-[#2D2F39] flex items-center justify-center p-12 border border-[#373943] shadow-2xl">
          <img src={ReactLogo} alt="react logo" className="h-32 w-32 animate-[spin_20s_linear_infinite]" />
        </div>

        <div className="md:col-span-3 rounded-3xl bg-[#2D2F39] p-8 md:p-12 border border-[#373943] shadow-2xl flex flex-col justify-center">
          <h2 className="text-white text-4xl font-bold mb-6">¡Hola! Soy Cristian 👋</h2>
          
          <div className="space-y-6 text-[#A1A1A1] text-lg leading-relaxed">
            <p>
              Soy un <strong className="text-white">desarrollador web en proceso</strong>, de Argentina. 
              Este es mi blog, donde comparto mis proyectos y experiencias.
            </p>
            <p>
              La primera publicación será sobre <strong className="text-[#DE8676]">React Hooks</strong>, 
              una herramienta clave para aplicaciones modernas 🚀.
            </p>
            <p className="text-sm font-medium tracking-tight border-l-2 border-[#DE8676] pl-4 italic">
              Si estás empezando con React, este espacio es para vos.
            </p>
          </div>
        </div>
      </section>

      {/* 2. SECCIÓN MENÚ DE PROYECTOS */}
      <section className="mt-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <Link to="/pokedex" className="group p-10 rounded-[2.5rem] transition-all duration-500 hover:-translate-y-3 bg-[#2D2F39] border border-[#373943] hover:border-[#DE8676]/40 shadow-xl flex flex-col items-center text-center">
            <span className="text-6xl mb-6 grayscale group-hover:grayscale-0 transition-all">🐾</span>
            <h3 className="text-xl font-bold text-white group-hover:text-[#DE8676] transition-colors">Mi Pokedex</h3>
            <p className="text-[#A1A1A1] mt-4 text-sm leading-relaxed">Consumo de API real y estados complejos.</p>
          </Link>

          <Link to="/hooks" className="group p-10 rounded-[2.5rem] transition-all duration-500 hover:-translate-y-3 bg-[#2D2F39] border border-[#373943] hover:border-[#DE8676]/40 shadow-xl flex flex-col items-center text-center">
            <span className="text-6xl mb-6 grayscale group-hover:grayscale-0 transition-all">🪝</span>
            <h3 className="text-xl font-bold text-white group-hover:text-[#DE8676] transition-colors">React Hooks</h3>
            <p className="text-[#A1A1A1] mt-4 text-sm leading-relaxed">Biblioteca de artículos sobre lógica fundamental.</p>
          </Link>

          <div className="p-10 rounded-[2.5rem] border border-dashed border-[#373943] bg-[#2D2F39]/30 flex flex-col items-center text-center opacity-50">
            <span className="text-6xl mb-6 block grayscale">🏗️</span>
            <h3 className="text-xl font-bold text-white">Facturación</h3>
            <p className="text-[#A1A1A1] mt-4 text-sm leading-relaxed">Próximo proyecto: Gestión y PDF.</p>
          </div>

        </div>
      </section>
    </div>
  );
};

export default MainLayout;