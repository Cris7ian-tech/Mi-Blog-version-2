import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import typeColors from "../componentes/ui/typeColors";

interface PokemonStat {
  base_stat: number;
  stat: { name: string };
}

interface PokemonType {
  type: { name: string };
}

interface PokemonFullData {
  name: string;
  height: number;
  weight: number;
  stats: PokemonStat[];
  types: PokemonType[];
  sprites: {
    front_default: string;
    other: {
      "official-artwork": {
        front_default: string;
      };
    };
  };
}

const PokemonDetail = () => {
  const { name } = useParams();
  const navigate = useNavigate();
  const [pokemon, setPokemon] = useState<PokemonFullData | null>(null);

  // --- 1. EFECTO PARA BUSCAR LOS DATOS (EL QUE FALTABA) ---
  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
      .then((res) => res.json())
      .then((data) => setPokemon(data))
      .catch((err) => console.error("Error en el laboratorio:", err));
  }, [name]);

  // --- 2. EFECTO PARA LA ANIMACIÓN DE LAS BARRAS ---
  useEffect(() => {
    if (pokemon) {
      const bars = document.querySelectorAll(".stat-bar");
      bars.forEach((bar) => ((bar as HTMLElement).style.width = "0%"));

      setTimeout(() => {
        bars.forEach((bar) => {
          const targetWidth = bar.getAttribute("data-width");
          if (targetWidth) {
            (bar as HTMLElement).style.width = targetWidth;
          }
        });
      }, 150);
    }
  }, [pokemon]);

  // --- 1. PRIMERO EL CHEQUEO DE SEGURIDAD ---
  if (!pokemon) {
    return (
      <div className="text-white text-center py-20 font-bold tracking-widest animate-pulse">
        Sincronizando con la PokeAPI...
      </div>
    );
  }

  // --- 2. DESPUÉS DEFINIMOS LAS VARIABLES (Ya sabemos que pokemon existe) ---
  const mainType = pokemon.types[0]?.type.name || "normal";
  const themeColor = typeColors[mainType] || "#DE8676";

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      {/* Botón Volver */}
      <button
        onClick={() => navigate(-1)}
        className="text-[#A1A1A1] hover:text-[#DE8676] mb-8 flex items-center gap-2 transition-colors font-bold uppercase text-xs tracking-widest"
      >
        ← Volver al Panel
      </button>

      {/* CONTENEDOR PRINCIPAL */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 bg-[#2D2F39] rounded-[3rem] p-8 md:p-16 border border-[#373943] shadow-2xl relative overflow-hidden">
        {/* LADO IZQUIERDO: Imagen y Tipos */}
        <div className="flex flex-col items-center justify-center">
          <div className="relative mb-8">
            <div className="absolute inset-0 bg-[#DE8676]/20 blur-[80px] rounded-full"></div>
            <img
              src={
                pokemon.sprites.other["official-artwork"].front_default ||
                pokemon.sprites.front_default
              }
              alt={pokemon.name}
              className="w-64 h-64 md:w-80 md:h-80 relative z-10 drop-shadow-2xl object-contain animate-float"
            />
          </div>
          <h1 className="text-5xl font-black text-white capitalize tracking-tighter">
            {pokemon.name}
          </h1>
          <div className="flex gap-3 mt-6">
            {pokemon.types.map((t) => (
              <span
                key={t.type.name}
                className="px-4 py-1 bg-[#1A1B22] border rounded-full text-[12px] font-black uppercase tracking-[0.2em]"
                style={{
                  color: typeColors[t.type.name] || "#DE8676",
                  borderColor: `${typeColors[t.type.name] || "#DE8676"}40`, // Borde con 40% opacidad
                }}
              >
                {t.type.name}
              </span>
            ))}
          </div>
        </div>

        {/* LADO DERECHO: Estadísticas (Stats) */}
        <div className="space-y-6 flex flex-col justify-center">
          <h2 className="text-2xl font-bold text-white mb-4 tracking-tight">
            Análisis de Estadísticas
          </h2>
          <div className="space-y-5">
            {pokemon.stats.map((s: PokemonStat) => (
              <div key={s.stat.name} className="space-y-2">
                <div className="flex justify-between text-[10px] uppercase font-bold tracking-widest text-[#A1A1A1]">
                  <span>{s.stat.name}</span>
                  <span className="text-white">{s.base_stat}</span>
                </div>
                <div className="h-1.5 w-full bg-[#1A1B22] rounded-full overflow-hidden">
                  <div
                    className="stat-bar h-full rounded-full transition-all duration-1000 ease-out"
                    style={{
                      width: "0%",
                      backgroundColor: themeColor, // <--- Aplicamos el color del tipo
                      boxShadow: `0 0 10px ${themeColor}80`, // Brillo del mismo color (80 de opacidad hex)
                    }}
                    data-width={`${Math.min((s.base_stat / 200) * 100, 100)}%`}
                  ></div>
                </div>
              </div>
            ))}
          </div>

          {/* Info Extra: Peso y Altura */}
          <div className="grid grid-cols-2 gap-4 mt-10 pt-8 border-t border-[#373943]">
            <div className="text-center">
              <p className="text-[#A1A1A1] text-[10px] uppercase font-bold tracking-widest mb-1">
                Altura
              </p>
              <p className="text-white text-xl font-black">
                {pokemon.height / 10} m
              </p>
            </div>
            <div className="text-center">
              <p className="text-[#A1A1A1] text-[10px] uppercase font-bold tracking-widest mb-1">
                Peso
              </p>
              <p className="text-white text-xl font-black">
                {pokemon.weight / 10} kg
              </p>
            </div>
          </div>

          {/* ACCIONES: Compartir */}
          <div className="mt-8 flex gap-4">
            <button
              onClick={() => {
                navigator
                  .share({
                    title: pokemon.name,
                    text: "¡Mira este Pokémon!",
                    url: window.location.href,
                  })
                  .catch(() => alert("Enlace copiado al portapapeles"));
              }}
              className="flex-1 bg-[#1A1B22] hover:bg-[#DE8676] hover:text-[#1A1B22] text-[#DE8676] py-3 rounded-full text-[14px] font-black uppercase tracking-widest border border-[#DE8676]/20 transition-all"
            >
              Compartir Pokémon
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokemonDetail;
