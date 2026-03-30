const PokeSkeleton = () => {
  return (
    /* 1. Ajustamos el redondeado para que coincida con la PokeCard original */
    <div className="bg-[#2D2F39] border border-[#373943] p-6 rounded-[2.5rem] animate-pulse flex flex-col items-center">
      
      {/* 2. Círculo de la imagen: le agregamos un margen superior para centrarlo */}
      <div className="relative rounded-full p-6 mb-5 bg-[#1A1B22]/50 w-28 h-28"></div>

      {/* 3. Barra de Nombre: un poco más gruesa y redondeada */}
      <div className="h-5 w-32 bg-[#1A1B22] rounded-full mb-6"></div>

      {/* 4. Barras de los tipos: simulando los badges que hicimos antes */}
      <div className="flex gap-2">
        <div className="h-6 w-16 bg-[#DE8676]/10 rounded-full border border-[#DE8676]/5"></div>
        <div className="h-6 w-16 bg-[#DE8676]/10 rounded-full border border-[#DE8676]/5"></div>
      </div>

      {/* 5. Espacio extra para el indicador "Ver más" que aparece en hover */}
      <div className="mt-4 h-3 w-20 bg-[#1A1B22] rounded-full opacity-30"></div>
    </div>
  );
};

export default PokeSkeleton;