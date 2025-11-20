

interface CardNoticiasProps {
  titulo: string;
  empresa: string;
  ubicacion: string;
  descripcion: string;
}

const CardNoticias = ({titulo, empresa, ubicacion, descripcion}: CardNoticiasProps) => {
  return (
    <article>CardNoticias
      <h2>{titulo}</h2>
      <h3>{empresa} - {ubicacion}</h3>
      <p>{descripcion}</p>
    </article>
  )
}

export default CardNoticias