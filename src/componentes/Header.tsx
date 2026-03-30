import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Bloquear scroll cuando el menú está abierto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  return (
    <header className="sticky top-0 z-50 w-full bg-[#1A1B22]/80 backdrop-blur-md border-b border-[#373943]">
      <div className="max-w-7xl mx-auto px-6">
        <nav className="flex justify-between items-center h-20">
          
          {/* LOGO: Blanco con acento Salmón */}
          <NavLink to="/" className="text-2xl font-bold text-white tracking-tighter">
            Cristian<span className="text-[#DE8676]">.dev</span>
          </NavLink>

          {/* NAVEGACIÓN DESKTOP: Gris suave con hover Salmón */}
          <ul className="hidden md:flex items-center space-x-10">
            {["Inicio", "Blog", "Contacto"].map((item) => (
              <li key={item}>
                <NavLink
                  to={item === "Inicio" ? "/" : `/${item.toLowerCase()}`}
                  className={({ isActive }) =>
                    `text-sm font-medium tracking-wide transition-all duration-300 hover:text-[#eec3bb] ${
                      isActive ? "text-[#DE8676]" : "text-[#A1A1A1]"
                    }`
                  }
                >
                  {item}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* BOTÓN HAMBURGUESA: Icono en Gris Claro/Blanco */}
          <button 
            className="md:hidden flex flex-col gap-1.5 z-110 p-2" 
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Menu"
          >
            {/* Las barritas ahora cambian de color y forma dinámicamente */}
            <span className={`block h-0.5 w-6 transition-all duration-300 ${isOpen ? "rotate-45 translate-y-2 bg-[#DE8676]" : "bg-gray-200"}`}></span>
            <span className={`block h-0.5 w-6 transition-all duration-300 ${isOpen ? "opacity-0" : "bg-gray-200"}`}></span>
            <span className={`block h-0.5 w-6 transition-all duration-300 ${isOpen ? "-rotate-45 -translate-y-2 bg-[#DE8676]" : "bg-gray-200"}`}></span>
          </button>
        </nav>
      </div>

      {/* MENÚ MOBILE: Fondo Negro Profundo y texto Salmón */}
      <div 
        className={`fixed inset-0 w-screen h-screen bg-[#1A1B22] z-[100] flex flex-col items-center justify-center transition-all duration-500 ease-in-out ${
          isOpen ? "translate-y-0 opacity-100 visible" : "-translate-y-full opacity-0 invisible"
        }`}
      >
        <ul className="text-center space-y-10">
          {["Inicio", "Blog", "Contacto"].map((item) => (
            <li key={item} onClick={() => setIsOpen(false)}>
              <NavLink
                to={item === "Inicio" ? "/" : `/${item.toLowerCase()}`}
                className={({ isActive }) => 
                  `text-4xl font-bold tracking-tight transition-colors ${
                    isActive ? "text-[#DE8676]" : "text-white hover:text-[#DE8676]"
                  }`
                }
              >
                {item}
              </NavLink>
            </li>
          ))}
        </ul>
        
        {/* Detalle decorativo opcional al final del menú mobile */}
        <div className="absolute bottom-12 text-[#373943] text-sm tracking-widest uppercase">
          Cristian Portfolio 2026
        </div>
      </div>
    </header>
  );
};

export default Header;