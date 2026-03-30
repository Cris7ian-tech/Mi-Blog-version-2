import { Link } from "react-router-dom";
import PokeCard from "./PokeCard";

interface PokemonBase {
  name: string;
  image?: string;
  types?: string[];
}

interface PokeGridProps {
  pokemons: PokemonBase[];
  isDark?: boolean;
}

function PokeGrid({ pokemons }: PokeGridProps) {
  // 1. Estado vacío con estética Dark
  if (pokemons.length === 0) {
    return (
      <div className="text-center py-20 bg-[#2D2F39]/30 rounded-[3rem] border border-dashed border-[#373943]">
        <h2 className="text-2xl font-bold text-white mb-2">
          ❌ No se encontró ningún Pokémon
        </h2>
        <p className="text-[#A1A1A1]">Intenta con otra búsqueda, ¡entrenador!</p>
      </div>
    );
  }

  return (
    <section className="w-full">
      {/* 2. Contador estilizado con tu paleta */}
      <div className="text-center mb-8">
        <p className="text-[#A1A1A1] text-sm font-medium tracking-widest uppercase">
          Mostrando <span className="text-[#DE8676] font-bold">{pokemons.length}</span> especímenes
        </p>
      </div>

      {/* 3. Grid responsivo con Tailwind */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {pokemons.map((unPokemon) => (
          /* Envolvemos la Card en un Link para que sea clickeable hacia el detalle */
          <Link 
            to={`/pokedex/${unPokemon.name}`} 
            key={unPokemon.name}
            className="block no-underline"
          >
            <PokeCard 
              name={unPokemon.name} 
              image={unPokemon.image || ''} 
              types={unPokemon.types || []} 
              isDark={true}
            />
          </Link>
        ))}
      </div>
    </section>
  );
}

export default PokeGrid;