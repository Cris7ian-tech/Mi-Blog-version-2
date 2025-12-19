

interface SearchBarProps {
  onSearch: (value: string) => void;
}

function SearchBar({ onSearch }: SearchBarProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(e.target.value); //avisamos al padre en cada tecla
  };

  return (
    <div className="search-container" 
    style={{ 
      margin: '20px 0', 
      textAlign: 'center' }}
      >
      
      <input 
      type="text"
      placeholder="Busca tu Pokémon..."
      onChange={handleChange}
      style={{
        padding: '10px 20px',
        borderRadius: '25px',
        border: '2px solid #ddd',
        width: `300px`,
        fontSize: `1rem`,
        color: `#fff`
      }}
      />
    </div>
  )
}



export default SearchBar