// Definimos los tipos que usaremos para filtrar (pueden ser más)
const POKE_TYPES = [
  {name: `todos`, color: '#eb7d69'},
  {name: `grass`, color: `#78c850`},
  {name: `fire`, color: `#f08030`},
  {name: `water`, color: `#6890F0`},
  {name: `bug`, color: `#A8B820`},
  {name: `normal`, color: `#A8A878`},
  {name: `electric`, color: `#F8D030`},
  {name: `poison`, color: `#A040A0`}
];

interface TypeFiltersProps {
  selectedType: string;
  onTypeChange: (type: string) => void;
}


function TypeFilters({selectedType, onTypeChange}: TypeFiltersProps) {
  return (
    <div className="flex flex-wrap justify-center gap-2 mb-8 mt-4">
      {POKE_TYPES.map((type) => (
        <button
          key={type.name}        
          onClick={() => onTypeChange(type.name)}
          style={{ 
            backgroundColor: selectedType === type.name ? type.color : `transparent`,
            borderColor: type.color,
            color: selectedType === type.name ? `white` : type.color,
          }}
          className={`px-4 py-1 rounded-full border-2 font-bold text-sm capitalize
            transition-all duration-300 hover:scale-110
            ${selectedType === type.name ? 'shadow-lg' : 'hover:bg-opacity-10'}
          `}
        >
          {type.name === `todos` ? `Todos`: type.name}
        </button>
      ))}
    </div>
  )
}

export default TypeFilters