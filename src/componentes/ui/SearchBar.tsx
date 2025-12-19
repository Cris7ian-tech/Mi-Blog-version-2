import { useState, useEffect } from 'react';


interface SearchBarProps {
  onSearch: (value: string) => void;
}

function SearchBar({ onSearch }: SearchBarProps) {
  const [inputValue, setInputValue] = useState("");
  
  // Agregamos Lógica de Debounce
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      onSearch(inputValue);
    }, 500); // Espera 400ms después de que el usuario deja de escribir
    return () => clearTimeout(timeoutId); // Limpia el timeout si el valor cambia antes de los 400ms
  }, [inputValue, onSearch]);
  const handleClear = () => {
    setInputValue("");
  };

  return (
    <div className="search-container" 
    style={{ 
      position: 'relative',
      width: `300px`,
      margin: '20px auto', 
      textAlign: 'center' }}
      >
      
      {/* Icono de Lupa  */}
      <span style={{ position: 'absolute', left: '15px', top: '10px' }}>🔍</span>
      <input 
      type="text"
      value= {inputValue}
      placeholder="Busca tu Pokémon..."
      onChange={e => setInputValue(e.target.value)} // Actualizamos el estado con el valor ingresado por el usuarioe}
      style={{
        padding: '10px 40px',
        borderRadius: '25px',
        border: '2px solid #eb7d69',
        outline: 'none',
        width: `300px`,
        fontSize: `1rem`,
        color: `#fff`
      }}
      />

      {/* El Botón "X" para borrar */}
      {inputValue && (
        <button
          onClick={handleClear}
          style={{
            position: 'absolute',
            right: '15px',
            top: '11px',
            border: 'none',
            color: '#eb7d69',
            background: '#ddd',
            borderRadius: '50%',
            width: '25px',
            height: '25px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '12px',
            fontWeight: 'bold'
          }}
        >
          X
        </button>
      )}
    </div>
  )
}



export default SearchBar