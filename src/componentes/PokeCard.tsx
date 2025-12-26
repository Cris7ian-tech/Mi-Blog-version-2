
//El molde ahora incluye la imagen y los tipos que le manda el padre
interface PokeCardProps {
  name: string;
  image: string;
  types: string[];
}
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


function PokeCard({name, image, types}: PokeCardProps) {


  return (
  <div 
    className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 p-4 flex flex-col items-center border border-gray-100"
  >
    {/* Imagen: Ya viene lista del padre */}
    <img 
      src={image} 
      alt={name} 
      className="w-32 h-32 object-contain"
    />
    
    {/* Nombre */}
      <h3 className="text-gray-800 font-bold text-lg capitalize mb-2">{name}</h3>

    {/* Tipos: Un pequeño mapa para mostrar las burbujas de color */}
      <div className="flex gap-2">
        {types.map((type) => (
          <span
            key={type}
            style={{ backgroundColor: typeColors[type] || '#777' }}
            className="px-3 py-1 rounded-full text-white text-[10px] font-bold uppercase tracking-wider"
          >
            {type}
          </span>
        ))}
      </div>
  </div>
);
}

export default PokeCard