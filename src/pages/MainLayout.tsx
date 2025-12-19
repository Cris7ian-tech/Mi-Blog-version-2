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

  const [searchTerm, setSearchTerm] = useState("");

//Conexion a la API logica
  useEffect(() => {
    async function fetchPokemon() {
      try {
        setLoading(true) //encendemos el interruptor de carga

        const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=20`);
        const data = await response.json();
        //guardamos solo los resultados: nombres y urls
        setPokemonList(data.results);
        console.log("¡Tengo datos!", data.results.length)

      } catch (error) {
        console.error("Error al traer los Pokemon:", error)
      } finally {
        //pase lo que pase apagamos el interruptor de carga
        setLoading(false);
      } 
    }
    fetchPokemon();
    
  }, []); //[] para que se ejecute solo una vez al montar el componente

  //Logica de filtrado Pokemons
  const filteredPokemon = pokemonList.filter((pokemon) => {
  return pokemon.name.toLowerCase().includes(searchTerm.toLowerCase());
});

  //Renderizado condicional:
  if(loading){
    return <p className="text-white text-center mt-20">Cargando Pokemones...</p>;
  }

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

      {/*Pokedex: */}
      <h1 className="text-2xl text-white font-bold py-4 text-center">MPokedex</h1>
      <SearchBar onSearch={(value) => 
        setSearchTerm(value)} 
        />
      <PokeGrid 
      pokemons={filteredPokemon}
      />
      </main> 

  
    
    </>
  )
}

export default MainLayout