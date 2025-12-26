import PokeCard from "./PokeCard"


// 1. Definimos el "molde" de lo que viene de la API
interface PokemonBase {
  name: string;
  image?: string;
  types?: string[];
  
}

// 2. Usamos ese molde en las Props del Grid
interface PokeGridProps {
  pokemons: PokemonBase[]; // Ya no usamos any, sino un array de PokemonBase
  isDark?: boolean;
}

function PokeGrid({pokemons, isDark = false}: PokeGridProps) {
  // Aca manejamos la lógica de "No hay resultados"
  if(pokemons.length === 0) {
    return (
      <div style={{
        textAlign: `center`,
        marginTop: `50px`,
        color: `#fff`
        }}>
          <h2>❌ No se encontro ningún Pokémon con ese nombre</h2>
          <p>Intenta con otra busqueda, ¡entrenador!</p>

      </div>
    )
  }
  return (
    <section>
      {/* EL CONTADOR: Lógica simple basada en el length del array recibido */}
      <div style={{ 
        textAlign: 'center', 
        marginBottom: '10px', 
        color: '#666',
        fontSize: '0.9rem',
        fontWeight: 'bold'
      }}>
        Mostrando <span style={{ color: '#eb7d69' }}>{pokemons.length}</span> Pokémon
      </div>

      <div
        style={{
          display: 'grid',
          // auto-fill: llena el espacio con tantas tarjetas como quepan
          // minmax(160px, 1fr): mínimo 160px, máximo todo el espacio sobrante
          gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
          gap: '16px',
          padding: '20px',
          maxWidth: '1200px', // Centra el contenido en pantallas muy anchas
          margin: '0 auto'
          }}
          >
        
        {pokemons.map((unPokemon) => (
        <PokeCard 
          key={unPokemon.name} // Usamos el nombre como clave única
          name={unPokemon.name} 
          image={unPokemon.image || ''} // Le pasamos la imagen que ya tenemos
          types={unPokemon.types || []} // Le pasamos los tipos que ya tenemos 
          isDark={isDark}
        />
      ))}
      </div>
    </section>

    
    
  )
}

export default PokeGrid