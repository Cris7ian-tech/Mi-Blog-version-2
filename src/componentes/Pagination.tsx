import ArrowLeft from "../assets/arrow-narrow-left.svg";
import ArrowRight from "../assets/arrow-narrow-right.svg";


interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({ currentPage, totalPages, onPageChange}: PaginationProps) => {
  //generar un array con páginas a mostrar:
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  return (

    <>
      <nav className="text-primary-300 mt-8 flex items-center gap-3">

        <button className="rounded-full bg-primary-300 p-2 disabled:opacity-40"
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
          >

          <img src={ArrowLeft} alt="Anterior" 
          className="w-5 h-5"
          />
        </button>

        {/* Páginas */}
      {pages.map(page => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`
            w-8 h-8 flex items-center justify-center rounded-full
            border border-primary-300
            transition-all
            ${currentPage === page
              ? "bg-primary-300 text-white font-semibold"
              : "text-primary-300"}
          `}
        >
          {page}
        </button>
      ))}
      {/* Siguiente */}

      <button className="rounded-full bg-primary-300 p-2 disabled:opacity-40"
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          >
          
          <img src={ArrowRight} alt="Siguiente"
          className="w-5 h-5 " />
        </button>
        
      </nav>
    </>
  )
}

export default Pagination