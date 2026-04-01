import { useState, useEffect, useRef } from 'react';

interface SearchBarProps {
  onSearch: (value: string) => void;
}

function SearchBar({ onSearch }: SearchBarProps) {
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  // Foco automático SOLO si no hay una búsqueda previa (indicativo de que venimos de afuera)
useEffect(() => {
  const hasHistory = sessionStorage.getItem("pokedex_cache");
  
  // Si no hay caché, es la primera entrada, le damos foco.
  // Si hay caché, probablemente está volviendo, dejamos el scroll en paz.
  if (!hasHistory) {
    inputRef.current?.focus();
  }
}, []);

  // Lógica de Debounce (400ms)
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      onSearch(inputValue);
    }, 400);
    return () => clearTimeout(timeoutId);
  }, [inputValue, onSearch]);

  const handleClear = () => {
    setInputValue("");
    inputRef.current?.focus(); // Devolvemos el foco al limpiar
  };

  return (
    <div className="relative w-full max-w-md mx-auto my-8 px-4">
      
      {/* Icono de Lupa: Color salmón sutil */}
      <span className="absolute left-8 top-1/2 -translate-y-1/2 text-lg opacity-60">
        🔍
      </span>

      <input 
        type="text"
        ref={inputRef}
        value={inputValue}
        placeholder="Busca tu Pokémon..."
        onChange={(e) => setInputValue(e.target.value)}
        className="
          w-full 
          bg-[#2D2F39] 
          text-white 
          placeholder:text-[#A1A1A1]
          pl-12 pr-12 py-4 
          rounded-full 
          border border-[#A0A0A0] 
          outline-none 
          transition-all 
          duration-300
          focus:border-[#DE8676] 
          focus:shadow-[0_0_20px_rgba(222,134,118,0.15)]
        "
      />

      {/* Botón "X" para borrar: Estilo minimalista */}
      {inputValue && (
        <button
          onClick={handleClear}
          className="
            absolute right-8 top-1/2 -translate-y-1/2 
            w-6 h-6 
            bg-[#1A1B22] 
            text-[#DE8676] 
            rounded-full 
            flex items-center justify-center 
            text-[10px] font-black 
            hover:bg-[#DE8676] hover:text-[#1A1B22]
            transition-colors
          "
        >
          X
        </button>
      )}
    </div>
  );
}

export default SearchBar;