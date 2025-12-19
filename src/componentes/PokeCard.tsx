import {useState, useEffect} from 'react'
//Objeto de Configuración (o Diccionario de Colores).
const typeColors: Record<string, string> = {
  fire: '#F08030',
  water: '#6890F0',
  grass: '#78C850',
  electric: '#F8D030',
  psychic: '#F85888',
  ice: '#98D8D8',
  dragon: '#7038F8',
  dark: '#705848',
  fairy: '#EE99AC',
  normal: '#A8A878',
  fighting: '#C03028',
  flying: '#A890F0',
  poison: '#A040A0',
  ground: '#E0C068',
  rock: '#B8A038',
  bug: '#A8B020',
  ghost: '#705898',
  steel: '#B8B8D0',
};


// 1. EL MOLDE (Interface): Define la estructura del detalle que nos da la PokeAPI
interface PokemonDetails {
  sprites: {
    other: {
      'official-artwork': {
        front_default: string;
      }
    }
  };
  types: Array<{
    type: {
      name: string;
    }
  }>;
}

// ... aquí tu diccionario typeColors ...

interface PokeCardProps {
  name: string;
  url: string;
}

function PokeCard({name, url}: PokeCardProps) {
  //Estado para guardar detalles especificos del pokemon: name, imagen, tipos, habilidades, etc.)
  const [pokemonDetails, setPokemonDetails] = useState<PokemonDetails | null>(null);

  //Efecto para traer los detalles del pokemon cuando el componente se monta
  useEffect(() => {
    async function getDetails() {
      try {
        const response = await fetch(url);
        const data = await response.json();

        console.log("Datos de este pokemon:", data);
        //Guardamos todo en el objeto detalles
        setPokemonDetails(data);
      } catch (error) {
        console.error("Error al traer los detalles del Pokemon:", error);
      }
    }
    getDetails();
  }, [url]); //Dependencia en url para que se ejecute cuando cambie

  //Mientras no tengamos detalles, mostramos un estado de carga Local
  if(!pokemonDetails) {
    return <div className="card-loader">Cargando datos de {name}...</div>
  }

  //extraer el tipo principal y buscarlo en nuestro diccionario.
  const mainType = pokemonDetails.types[0].type.name;
  //Buscamos el color. Si el tipo no está en nuestro mapa, usamos un gris por defecto.
const themeColor = typeColors[mainType] || '#777';



  return (
  <div 
    className="poke-card" 
    style={{ 
      backgroundColor: themeColor + '33', // Añadimos '33' al final para darle transparencia (alfa)
      border: `2px solid ${themeColor}`,
      borderRadius: '15px',
      padding: '20px',
      textAlign: 'center',
      margin: '10px'
    }}
  >
    {/* El resto de tu contenido (img, h3, etc.) */}
    <img 
      src={pokemonDetails?.sprites?.other?.['official-artwork']?.front_default}
      alt={name}
      style={{ width: '120px',
        display: 'block',
        margin: '0 auto'
       }} // Un poco de tamaño
    />
    
    <h3 style={{ color: themeColor }}>{name.toUpperCase()}</h3>

    <div className="types">
      {pokemonDetails.types?.map((item) => (
        <span 
          key={item.type.name} 
          style={{
            backgroundColor: typeColors[item.type.name],
            color: 'white',
            padding: '2px 8px',
            borderRadius: '4px',
            margin: '0 2px',
            fontSize: '0.8rem'
          }}
        >
          {item.type.name}
        </span>
      ))}
    </div>
  </div>
);
}

export default PokeCard