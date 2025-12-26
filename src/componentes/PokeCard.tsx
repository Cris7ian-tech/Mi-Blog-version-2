
//El molde ahora incluye la imagen y los tipos que le manda el padre
interface PokeCardProps {
  name: string;
  image: string;
  types: string[];
  isDark: boolean; // <--THEME: instrucción
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


function PokeCard({name, image, types, isDark}: PokeCardProps) {

    
  return (
    <div className={`
      /* Lógica de fondo: Si isDark es true, usa gris oscuro. Si no, usa blanco */
      ${isDark ? 'bg-[#2a2a2a] border-gray-800' : 'bg-white border-gray-200'}
      rounded-xl shadow-lg transition-all duration-300 p-4 flex flex-col items-center border
      `}>
      
      <div className={`${isDark ? 'bg-white/5' : 'bg-gray-100'} rounded-full p-4 mb-4`}>
        <img src={image} alt={name} className="w-28 h-28 object-contain" />
      </div>

      {/* Lógica de texto: Blanco para oscuro, gris oscuro para claro */}
      <h3 className={`font-bold text-lg capitalize mb-3 ${isDark ? 'text-white' : 'text-gray-800'}`}>
        {name}
      </h3>

      <div className="flex gap-2">
        {types.map((type) => (
          <span
            key={type}
            style={{ backgroundColor: typeColors[type] || '#777' }}
            className="px-3 py-1 rounded-full text-white text-[10px] font-bold uppercase"
          >
            {type}
          </span>
        ))}
      </div>
    </div>
  );
}


export default PokeCard