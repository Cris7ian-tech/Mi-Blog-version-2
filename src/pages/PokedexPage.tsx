import PokeSkeleton from "../componentes/ui/PokeSkeleton";
import { useState, useEffect } from "react";
import PokeGrid from "../componentes/PokeGrid";
import SearchBar from "../componentes/ui/SearchBar";
import TypeFilters from "../componentes/ui/TypeFilters";

interface PokemonBase {
  name: string;
  url: string;
  image?: string;
  types?: string[];
}

const PokedexPage = () => {
  const [pokemonList, setPokemonList] = useState<PokemonBase[]>([]);
  const [loading, setLoading] = useState(true);
  const [offset, setOffset] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("todos");

  // --- 1. FUNCIÓN FETCH (Única versión con Memoria) ---
  const fetchPokemon = async (currentOffset: number) => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon?limit=20&offset=${currentOffset}`
      );
      const data = await response.json();

      const detailPromises = data.results.map(async (pokemon: { name: string; url: string }) => {
        const res = await fetch(pokemon.url);
        const details = await res.json();
        return {
          name: pokemon.name,
          url: pokemon.url,
          image: details.sprites.other["official-artwork"].front_default,
          types: details.types.map((t: { type: { name: string } }) => t.type.name),
        };
      });

      const fullPokemonData = await Promise.all(detailPromises);

      setPokemonList((prevList) => {
        // Evitamos duplicados por las dudas
        const nuevosFiltrados = fullPokemonData.filter(
          (nuevo) => !prevList.some((existente) => existente.name === nuevo.name)
        );
        const newList = [...prevList, ...nuevosFiltrados];

        // GUARDAMOS EN MEMORIA
        sessionStorage.setItem("pokedex_cache", JSON.stringify(newList));
        sessionStorage.setItem("pokedex_offset", currentOffset.toString());

        return newList;
      });
    } catch (error) {
      console.error("Error en la Pokedex:", error);
    } finally {
      setLoading(false);
    }
  };

  // --- 2. EFECTO DE CARGA INICIAL (Inteligente) ---
  useEffect(() => {
    const savedList = sessionStorage.getItem("pokedex_cache");
    const savedOffset = sessionStorage.getItem("pokedex_offset");

    if (savedList && savedOffset) {
      // Si ya hay datos en sesión, los usamos y NO llamamos a la API
      setPokemonList(JSON.parse(savedList));
      setOffset(parseInt(savedOffset));
      setLoading(false);
    } else {
      // Si es la primera vez del usuario, llamamos a la API
      fetchPokemon(0);
    }
  }, []);

  // 3. ESCUCHA EL SCROLL: Guarda la posición cada vez que el usuario se mueve
useEffect(() => {
  const handleScroll = () => {
    // Guardamos la posición actual en pixeles
    sessionStorage.setItem("pokedex_scroll", window.scrollY.toString());
  };

  window.addEventListener("scroll", handleScroll);
  return () => window.removeEventListener("scroll", handleScroll);
}, []);

// 4. RESTAURA EL SCROLL: Cuando los datos ya están listos, volvemos a donde estábamos
useEffect(() => {
  // Solo intentamos scrollear si NO estamos cargando y hay pokemones
  if (!loading && pokemonList.length > 0) {
    const savedScroll = sessionStorage.getItem("pokedex_scroll");
    if (savedScroll) {
      // Usamos un pequeño timeout para darle tiempo al navegador a renderizar las cards
      setTimeout(() => {
        window.scrollTo({
          top: parseInt(savedScroll),
          behavior: 'instant' // 'smooth' queda lindo pero 'instant' es más preciso al volver
        });
      }, 100); 
    }
  }
}, [loading, pokemonList.length]); // Se dispara cuando cambia la carga o el largo de la lista

  // --- 3. LÓGICA DE FILTRADO ---
  const filteredPokemon = pokemonList.filter((pokemon) => {
    const matchesSearch = pokemon.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === "todos" || (pokemon.types && pokemon.types.includes(selectedType));
    return matchesSearch && matchesType;
  });

  return (
    <div className="bg-[#1A1B22] min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* HERO SECTION */}
        <section className="flex flex-col md:flex-row items-center justify-center gap-12 md:gap-24 mb-24 min-h-[400px]">
          <div className="flex-1 max-w-xl text-center md:text-left space-y-6">
            <h1 className="text-5xl md:text-7xl font-extrabold text-[#f2f2f2] tracking-tighter">
              Laboratorio <br />
              <span className="text-[#DE8676]">Pokedex</span>
            </h1>
            <p className="text-[#A1A1A1] text-lg leading-relaxed">
              Análisis técnico de especímenes mediante la interfaz oficial de la PokéAPI.
            </p>
          </div>

          <div className="flex-1 flex justify-center relative">
            <div className="absolute inset-0 bg-[#DE8676]/10 blur-[100px] rounded-full scale-100 animate-pulse"></div>
            <img
              src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/150.png"
              alt="Mewtwo Hero"
              className="w-64 md:w-110 relative z-10 drop-shadow-2xl animate-float"
            />
          </div>
        </section>
      </div>

      {/* SECCIÓN EXPLORACIÓN (Gris Azulado) */}
      <section className="w-full bg-[#2D2F39] py-16 min-h-screen border-t border-[#373943]/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-16 space-y-10">
            <SearchBar onSearch={setSearchTerm} />
            <TypeFilters selectedType={selectedType} onTypeChange={setSelectedType} />
          </div>

          {loading && pokemonList.length === 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
              {[...Array(10)].map((_, i) => <PokeSkeleton key={i} />)}
            </div>
          ) : (
            <PokeGrid pokemons={filteredPokemon} />
          )}

          {loading && pokemonList.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mt-8">
              {[...Array(5)].map((_, i) => <PokeSkeleton key={i} />)}
            </div>
          )}

          {!searchTerm && !loading && (
            <div className="flex justify-center py-20">
              <button
                onClick={() => {
                  const nextOffset = offset + 20;
                  setOffset(nextOffset);
                  fetchPokemon(nextOffset);
                }}
                className="px-10 py-4 bg-[#DE8676] text-[#1A1B22] rounded-full font-black text-xs uppercase tracking-widest hover:scale-105 transition-all shadow-lg shadow-[#DE8676]/20"
              >
                Cargar más unidades
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default PokedexPage;