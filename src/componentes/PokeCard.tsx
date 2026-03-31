// 1. Mantenemos tu diccionario de colores (es perfecto)
const typeColors: Record<string, string> = {
  fire: '#F08030', water: '#6890F0', grass: '#78C850', electric: '#F8D030',
  psychic: '#F85888', ice: '#98D8D8', dragon: '#7038F8', dark: '#705848',
  fairy: '#EE99AC', normal: '#A8A878', fighting: '#C03028', flying: '#A890F0',
  poison: '#A040A0', ground: '#E0C068', rock: '#B8A038', bug: '#A8B020',
  ghost: '#705898', steel: '#B8B8D0',
};

interface PokeCardProps {
  name: string;
  image: string;
  types: string[];
  isDark: boolean;
}

function PokeCard({ name, image, types, isDark }: PokeCardProps) {
  return (
    <div className={`
      group relative flex flex-col items-center p-6 rounded-3xl border transition-all duration-500
      ${isDark 
        ? 'bg-[#1A1B22] border-[#373943] hover:border-[#DE8676]/50 shadow-2xl' 
        : 'bg-white border-gray-200 shadow-md'}
      hover:-translate-y-2 hover:shadow-[#DE8676]/10
      `}>
      
      {/* Contenedor de la Imagen con un círculo de fondo muy sutil */}
      <div className={`
        relative rounded-full p-6 mb-4 transition-transform duration-500 group-hover:scale-110
        ${isDark ? 'bg-[#1A1B22]' : 'bg-gray-100'}
      `}>
        {/* Un pequeño resplandor solo al pasar el mouse */}
        <div className="absolute inset-0 bg-[#DE8676]/5 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
        
        <img 
          src={image} 
          alt={name} 
          className="w-24 h-24 md:w-28 md:h-28 object-contain relative z-10 drop-shadow-md" 
        />
      </div>

      {/* Nombre: Usamos tracking-tighter para que se vea más "pro" */}
      <h3 className={`
        font-normal text-xl capitalize mb-4 tracking-tighter transition-colors
        ${isDark ? 'text-white group-hover:text-[#DE8676]' : 'text-gray-800'}
      `}>
        {name}
      </h3>

      {/* Tipos: Etiquetas más minimalistas */}
      <div className="flex gap-2">
        {types.map((type) => (
          <span
            key={type}
            style={{ 
              backgroundColor: isDark ? 'transparent' : typeColors[type],
              borderColor: typeColors[type],
              color: isDark ? typeColors[type] : 'white'
            }}
            className={`
              px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border
              ${isDark ? 'bg-opacity-10' : ''}
            `}
          >
            {type}
          </span>
        ))}
      </div>
    </div>
  );
}

export default PokeCard;