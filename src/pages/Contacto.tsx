import { useEffect, useState } from "react";

// Define la estructura de los datos que esperamos de la API de listado
interface Pokemon {
  name: string;
  url: string;
}

const Contacto = () => {

  const [inputValue, setInputValue] = useState("");
  // ✅ Inicializados como arrays vacíos
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);
  const [filteredPokemonList, setFilteredPokemonList] = useState<Pokemon[]>([]);
  // ✅ Crear el Estado de Carga
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // ✅ URL para obtener una LISTA de Pokémon (e.g., los primeros 150)
    fetch('https://pokeapi.co/api/v2/pokemon?limit=150')
      .then(response => {
        if (!response.ok) {
          throw new Error('Oh NoW!'); // Mejor usar throw
        }
        return response.json();
      })
      .then(data => {
        // ✅ Los datos de los Pokémon están en la propiedad 'results'
        setPokemon(data.results);
        // ✅ Inicializa la lista filtrada con todos los Pokémon
        setFilteredPokemonList(data.results);
      })
      // .catch(error => {
      //   console.error("Error fetching data:", error);
      // });
      
      //✅ FINALLY: Se ejecuta después de .then o .catch
      .finally(() => {
        setIsLoading(false); //apagamos interruptor de carga
      })
  }, []);


  const filterSearch = (value: string) => {
    setInputValue(value);

    // 1. Filtra sobre la lista COMPLETA ('pokemon')
    const filtered = pokemon.filter(p =>
      // 2. Usa el valor actual ('value') para el filtro
      p.name.toLowerCase().includes(value.toLowerCase())
    );

    // 3. Actualiza el estado que se renderiza
    setFilteredPokemonList(filtered);
  }


  return (
    <>
      <h1 className="text-primary-500 text-6xl text-center font-bold">Contacto</h1>

      {/* 3. ✅ Renderizado Condicional */}
      {isLoading ? (
        // Muestra el mensaje de carga mientras isLoading es true
        <div className="flex justify-center items-center mt-20">
          <p className="text-4xl text-blue-400 font-bold">
            Cargando Pokémon... ⏳
          </p>
        </div>

      ) : (
        // Muestra el contenido principal si isLoading es false
        <div className="flex flex-col items-center justify-center mt-20 gap-4">
          <h3 className="text-2xl text-amber-50 font-bold">Buscar Pokemon</h3>

        <input
          onChange={(event) => filterSearch(event.target.value)}
          value={inputValue}
          className="w-96 h-10 rounded-full p-4 border text-lg text-amber-100 border-amber-50 bg-stone-600 opacity-40 focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="search"
          placeholder="🔍  iniciar busqueda "
        />

        <ul>
          {/* ✅ Renderiza si hay Pokémon filtrados */}
          {filteredPokemonList.length > 0 ? (
            filteredPokemonList.map(p => {
              return (
                // ✅ Usamos 'name' como key, ya que 'id' no está en el listado inicial
                <li className="text-2xl text-amber-100 pb-2.5" 
                key={p.name}>{p.name} !!</li>
              )
            })
          ) : (
            // ✅ Mensaje si no se encuentra ningún Pokémon
            <p className="text-2xl text-amber-100 pb-2.5">Pokemon no encontrado</p>
          )}
        </ul>

      </div>
      )}
    </>
  )
}

export default Contacto;