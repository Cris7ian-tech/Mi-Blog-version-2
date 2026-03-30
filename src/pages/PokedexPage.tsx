// pages/PokedexPage.tsx
import PokeSkeleton from '../componentes/ui/PokeSkeleton';
import { useState, useEffect } from 'react';
import PokeGrid from '../componentes/PokeGrid';
import SearchBar from '../componentes/ui/SearchBar';
import TypeFilters from '../componentes/ui/TypeFilters';

interface PokemonBase {
  name: string;
  url: string;
  image?: string;
  types?: string[];
  isDark?: boolean;
}

const PokedexPage = ({ isDark }: { isDark: boolean }) => {
  const [pokemonList, setPokemonList] = useState<PokemonBase[]>([]);
  const [loading, setLoading] = useState(true);
  const [offset, setOffset] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("todos");

  // --- 1. FUNCIÓN FETCH (Independiente) ---
  const fetchPokemon = async (currentOffset: number) => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon?limit=20&offset=${currentOffset}`
      );
      const data = await response.json();

      const detailPromises = data.results.map(async (pokemon: PokemonBase) => {
        const res = await fetch(pokemon.url);
        const details = await res.json();
        return {
          name: pokemon.name,
          url: pokemon.url,
          image: details.sprites.other['official-artwork'].front_default,
          types: details.types.map((t: { type: { name: string } }) => t.type.name) 
        };
      });

      const fullPokemonData = await Promise.all(detailPromises);

      setPokemonList(prevList => {
        const nuevosFiltrados = fullPokemonData.filter(
          (nuevo) => !prevList.some(existente => existente.name === nuevo.name)
        );
        return [...prevList, ...nuevosFiltrados];
      });
    } catch (error) {
      console.error("Error en la Pokedex:", error);
    } finally {
      setLoading(false);
    }
  }; // <--- AQUÍ TERMINA fetchPokemon

  // --- 2. UseEffect (Al mismo nivel que fetchPokemon) ---
  useEffect(() => {
    fetchPokemon(0);
  }, []);

  // --- 3. LÓGICA DE FILTRADO ---
  const filteredPokemon = pokemonList.filter((pokemon) => {
  const matchesSearch = pokemon.name.toLowerCase().includes(searchTerm.toLowerCase());
  const matchesType = selectedType === "todos" || (pokemon.types && pokemon.types.includes(selectedType));
  return matchesSearch && matchesType;
  });

  return (
    // Contenedor Maestro con el espacio del Home
    <div className='max-w-7xl mx-auto px-6 py-12'>
      {/* 1. HERO SECTION */}
      <section className='flex flex-col md:flex-row items-center justify-center gap-12 md:gap-24 mb-24 min-h-[400px]'>
        <div className='flex-1 max-w-xl text-center md:text-left space-y-6'>
          <h1 className='text-5xl md:text-7xl font-extrabold text-[#f2f2f2] tracking-normal'>
            Laboratorio <br /> 
            <span className="text-[#DE8676]">Pokedex</span>
          </h1>
          <p className='text-[#A1A1A1] text-lg leading-relaxed mx-auto md:mx-0'>Explorando la PokéAPI con una interfaz limpia y moderna. 
            Filtrá por tipo o buscá tu favorito.</p>
        </div>

        {/* Imagen del Hero con el "Glow" salmón */}
        <div className='flex-none md:flex-1 flex justify-center relative'>
          {/* El resplandor de fondo */}
          <div className='absolute inset-0 bg-[#DE8676]/10 blur-[100px] rounded-full scale-80'></div>
          <img 
            src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/150.png"
            alt="Mewtwo Hero"
            className='w-64 md:w-100 relative z-10 drop-shadow-[0_0_30px_rgba(222,134,118,0.3)] animate-pulse'
            />
        </div>
      </section>

      {/* 2. CONTROLES (Buscador y Filtros) */}
      <div className='bg-[#2D2F39]/50 p-8 rounded-xl border border-[#373943] mb-16 shadow-2xl backdrop-blur-sm'>
        <div className="flex flex-col gap-6">        
          <SearchBar onSearch={setSearchTerm} />        
          <TypeFilters 
            selectedType={selectedType} 
            onTypeChange={setSelectedType} 
          />   
        </div>
      </div>
        
      {/* 3. GRID DE POKEMON + LÓGICA DE SKELETON */}  
      {/* Si estamos cargando y NO hay pokemones aún (primera carga), mostramos Skeletons */}
      {loading && pokemonList.length === 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {[...Array(10)].map((_, i) => <PokeSkeleton key={i} />)}
        </div>
      ) : (
        /* Si ya hay datos, mostramos el Grid real */
        <PokeGrid 
          pokemons={filteredPokemon} 
          isDark={true} 
        />
      )}
      {/* Skeletons adicionales al final mientras carga más (opcional pero pro) */}
      {loading && pokemonList.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6 mt-8">
          {[...Array(5)].map((_, i) => <PokeSkeleton key={i} />)}
        </div>
      )}
        
        {/* 4. BOTÓN CARGAR MÁS */}
        {/* 4. BOTÓN CARGAR MÁS (Limpio) */}
      {!searchTerm && !loading && (
        <div className="flex justify-center py-16">
          <button 
            onClick={() => {
                const nextOffset = offset + 20;
                setOffset(nextOffset);
                fetchPokemon(nextOffset);
            }}
            className="px-10 py-4 bg-[#DE8676] text-[#1A1B22] rounded-full font-bold text-lg hover:scale-105 hover:bg-[#DE8676]/90 transition-all shadow-lg shadow-[#DE8676]/20"
          >
            Cargar más Pokémon
          </button>
        </div>
      )}
    </div>
  );
};

export default PokedexPage;