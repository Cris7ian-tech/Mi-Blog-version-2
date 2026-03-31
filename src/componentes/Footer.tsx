const Footer = () => {
  return (
    <footer className="w-full bg-[#1A1B22] border-t border-[#373943] py-12">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Contenido Superior: Enlaces y Marca */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-10">
          
          {/* Lado Izquierdo: Tu marca o logo */}
          <div className="text-center md:text-left">
            <h3 className="text-white font-bold text-xl tracking-tight">
              Cristian<span className="text-[#DE8676]">.dev</span>
            </h3>
            <p className="text-[#A1A1A1] text-sm mt-1">Construyendo interfaces desde Argentina.</p>
          </div>

          {/* Lado Derecho: Redes Sociales */}
          <div className="flex gap-6">
            <a href="https://github.com" target="_blank" rel="noreferrer" className="text-[#A1A1A1] hover:text-[#DE8676] transition-colors">
              <span className="text-sm font-medium">GitHub</span>
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="text-[#A1A1A1] hover:text-[#DE8676] transition-colors">
              <span className="text-sm font-medium">LinkedIn</span>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="text-[#A1A1A1] hover:text-[#DE8676] transition-colors">
              <span className="text-sm font-medium">Instagram</span>
            </a>
          </div>

        </div>

        {/* Línea Divisoria Interna */}
        <div className="h-px w-full bg-[#373943] mb-8 opacity-50"></div>

        {/* Contenido Inferior: Créditos Tecnológicos */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-[#A1A1A1] text-xs sm:text-sm">
          <p>© {new Date().getFullYear()} Todos los derechos reservados.</p>
          
          <div className="flex items-center gap-2">
            <span>Hecho con</span>
            <span className="flex items-center gap-1.5 text-[#DE8676]">
              <img src="/src/assets/react.svg" alt="React" className="w-4 h-4" />
              React
            </span>
            <span>+</span>
            <span className="flex items-center gap-1.5 text-[#DE8676]">
              <img src="/src/assets/tailwind.svg" alt="Tailwind" className="w-4 h-4" />
              Tailwind
            </span>
          </div>
        </div>

      </div>
    </footer>


    //   <footer className="w-full py-12 border-t border-[#373943] mt-20">
    //   <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
    //     <div className="text-center md:text-left">
    //       <p className="text-[#f2f2f2] font-bold tracking-tighter">LAB <span className="text-[#DE8676]">POKEDEX</span></p>
    //       <p className="text-[#A1A1A1] text-xs mt-1 uppercase tracking-widest">General La Madrid • 2026</p>
    //     </div>
        
    //     <div className="flex gap-6 text-[#A1A1A1] text-sm font-medium">
    //       <a href="#" className="hover:text-[#DE8676] transition-colors">GitHub</a>
    //       <a href="#" className="hover:text-[#DE8676] transition-colors">LinkedIn</a>
    //       <a href="#" className="hover:text-[#DE8676] transition-colors">Portfolio</a>
    //     </div>

    //     <p className="text-[#A1A1A1] text-[10px] uppercase tracking-[0.3em]">
    //       Hecho con ❤️ en <span className="text-white">Argentina</span>
    //     </p>
    //   </div>
    // </footer>
    
  );
};

export default Footer;