// pages/PokedexPage.tsx
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

  // --- 2. USEEFFECT (Al mismo nivel que fetchPokemon) ---
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
    <div className="p-4 sm:p-8">
      <h1 className={`text-3xl font-bold text-center mb-8 ${isDark ? 'text-white' : 'text-gray-800'}`}>
        Mi Pokedex
      </h1>
      
      <SearchBar onSearch={setSearchTerm} />
      
      <TypeFilters 
        selectedType={selectedType} 
        onTypeChange={setSelectedType} 
      />
      
      <PokeGrid 
        pokemons={filteredPokemon} 
        isDark={isDark} 
      />
      
      {!searchTerm && (
        <div className="flex justify-center py-10">
          <button 
            onClick={() => {
                const nextOffset = offset + 20;
                setOffset(nextOffset);
                fetchPokemon(nextOffset);
            }}
            disabled={loading}
            className="px-8 py-3 bg-[#eb7d69] text-white rounded-full font-bold hover:scale-105 transition-all disabled:bg-gray-400"
          >
            {loading ? "Buscando..." : "Cargar más Pokémon"}
          </button>
        </div>
      )}
    </div>
  );
};

export default PokedexPage;