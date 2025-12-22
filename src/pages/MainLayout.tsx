import TypeFilters from '../componentes/ui/TypeFilters.tsx';
//Para Pokedex:
import { useState, useEffect } from 'react';
import CardArticle from '../componentes/ui/CardArticle.tsx'
import hooksData from '../data/hooksData.json';
import React from "../assets/react.svg";
import PokeGrid from '../componentes/PokeGrid.tsx';
import SearchBar from '../componentes/ui/SearchBar.tsx';

// Definimos el molde aquí también para que el estado lo reconozca
interface PokemonBase {
  name: string;
  url: string;
}


const MainLayout = () => {

  //Para Pokedex: 
  // paso 1 - conseguimos 20 nombres "pokemon" 
  // paso 2 - se los pasamos al componente PokeCard
  // paso 3 - Pokegrid crea 20 PokeCard
  const [pokemonList, setPokemonList] = useState<PokemonBase[]>([]);
  const [loading, setLoading] = useState(true);
  // nuevo estado: boton cargar mas
  const [offset, setOffset] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  
  //Filtrado por tipo de Pokemon (tierra, fuego, agua, etc.)
  const [selectedType, setSelectedType] = useState("todos");

// 2. Función para cargar (la sacamos del useEffect para poder usarla en el botón)
const fetchPokemon = async (currentOffset: number) => {
  try {
    setLoading(true);
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon?limit=20&offset=${currentOffset}`
    );
    const data = await response.json();

    // ❗ ¡Aca esta la magia! 
    // Por cada Pokémon básico, creamos una promesa para traer sus detalles
    const detailPromises = data.results.map(async (pokemon: PokemonBase) => {
      const res = await fetch(pokemon.url);
      const details = await res.json();

      return {
        name: pokemon.name,
        url: pokemon.url,
        image: details.sprites.other['official-artwork'].front_default,
        types: details.types.map((t: any) => t.type.name) // Guardamos array de tipos: ['grass', 'poison']
      }
    });

    // Esperamos a que las 20 promesas terminen
    const fullPokemonData = await Promise.all(detailPromises);

    // 4. Guardamos en el estado con la protección de duplicados
    setPokemonList(prevList => {
      const nuevosFiltrados = fullPokemonData.filter(
        (nuevo) => !prevList.some(existente => existente.name === nuevo.name)
      );
    return [...prevList, ...nuevosFiltrados];
});
  } catch (error) {
    console.error("Error al traer los detalles de los henriqueciendo Pokémon:", error);
  } finally {
    setLoading(false);
  }
};

//El useEffect ahora solo dispara la primera carga
useEffect(() => {
  fetchPokemon(0);
}, []);

//Función para el botón
const handleLoadMore = () => {
  const nextOffset = offset + 20;
  setOffset(nextOffset); // Actualizamos el estado
  fetchPokemon(nextOffset); // Pedimos los siguientes
};

  //Logica de filtrado Pokemons
  const filteredPokemon = pokemonList.filter((pokemon) => {
    const matchesSearch = pokemon.name.toLowerCase().includes(searchTerm.toLowerCase());
    //Aquí la lógica: matchesSearch && matchesType
    return matchesSearch;
});

  return (
    <>

      <main className="min-h-screen p-4 sm:p-6 md:p-12 lg:p-20 ">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {/* Imagen */}
          <div className="bg-secondary md:col-span-2 rounded-lg w-full h-full object-cover hover:shadow-lg ease-in duration-300">
            <img
            src={React}
            alt="react logo"
            className="w-full h-full object-cover rounded-lg"/>
          </div>

          {/* Texto */}
          <div className="bg-[#eb7d69] content-end md:col-span-3 rounded-lg px-4 py-6 hover:shadow-lg ease-in duration-300">
            <h2 className="text-2xl text-white font-bold py-4">¡Hola! Soy Cristian 👋</h2>
            
            <p className="text-gray-200 text-xl tracking-wider mb-4">
              Soy un <strong>desarrollador web en proceso</strong>, de Argentina. 
              Este es mi blog, donde comparto mis proyectos y experiencias en la programación.
            </p>

            <p className="text-gray-200 text-xl tracking-wider mb-4">
              La primera publicación será sobre <strong>React</strong> y sus tan nombrados y usados <strong>Hooks</strong>, 
              una herramienta clave para crear aplicaciones modernas y eficientes 🚀.
            </p>

            <p className="text-gray-200 text-xl tracking-wider">
              Si estás empezando con React o querés mejorar tu forma de trabajar con componentes funcionales, 
              <strong> este espacio es para vos.</strong>
            </p>
          </div>
        </div>


          {/* Articulos*/}
        <div className="grid 
                        grid-cols-[repeat(auto-fit,minmax(320px,1fr))]
                        sm:grid-cols-2
                        md:grid-cols-3 
                        gap-4 mt-4 
                        transition-all duration-300">

          {hooksData.HooksData.map((hook, index) =>(
          <CardArticle 
          key={index}
          {...hook}
          />
          ))}
        </div>

          {/* POKEDEX */}
            <h1 className="text-2xl text-white font-bold py-4 text-center">MPokedex</h1>
            
            <SearchBar onSearch={(value) => setSearchTerm(value)} />

            {/* FILTRO POR TIPO DE POKEMON */}
            <TypeFilters 
            selectedType={selectedType} 
            onTypeChange={(type) => setSelectedType(type)} 
          />
            
            {/* Mostramos el Grid siempre, esté cargando o no */}
            <PokeGrid pokemons={filteredPokemon} />

            {/* 4. BOTÓN CARGAR MÁS (Fuera del Grid) */}
            {!searchTerm && (
              <div style={{ textAlign: 'center', padding: '30px 0' }}>
                <button 
                  onClick={handleLoadMore}
                  disabled={loading}
                  style={{
                    padding: '12px 24px',
                    backgroundColor: loading ? '#ccc' : '#eb7d69',
                    color: 'white',
                    border: 'none',
                    borderRadius: '50px',
                    cursor: loading ? 'not-allowed' : 'pointer'
                  }}
                >
                  {loading ? "Buscando Pokémon..." : "Cargar más Pokémon"}
                </button>
              </div>
            )}
      </main>
    
    </>
  )
}

export default MainLayout