import PokeCard from "./PokeCard"


// 1. Definimos el "molde" de lo que viene de la API
interface PokemonBase {
  name: string;
  url: string;
}

// 2. Usamos ese molde en las Props del Grid
interface PokeGridProps {
  pokemons: PokemonBase[]; // Ya no usamos any, sino un array de PokemonBase
}

function PokeGrid({pokemons}: PokeGridProps) {
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
    <div
      style={{
        display: `grid`,
        gridTemplateColumns: `repeat(auto-fit, minmax(200px, 1fr))`,
        gap: `20px`,
        padding: `20px`
      }}
      >
      {pokemons.map((unPokemon) => (
      <PokeCard 
        key={unPokemon.name} // Usamos el nombre como clave única
        name={unPokemon.name} 
        url={unPokemon.url} 
      />
    ))}
    </div>
  )
}

export default PokeGrid