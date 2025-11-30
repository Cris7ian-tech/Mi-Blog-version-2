import { useState } from "react";

import Card from "../componentes/ui/Card"
import Pagination from "../componentes/Pagination.tsx";
// import CardNoticias from"../componentes/ui/CardNoticias.tsx"

import Share from "../assets/share.svg";




const Blog = () => {
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <>
      <section className="min-h-screen flex flex-col items-center justify-center p-8">
        <h2 className="text-3xl font-bold text-white mb-8">Artículos recientes</h2>

        <div className="flex flex-wrap justify-center gap-6">
          <Card>
            <Card.Header>Artículo destacado</Card.Header>

            <Card.Body className="flex items-center gap-4 p-4 pb-8">
              <div className="flex-1">
                <h3 className="text-lg font-bold">Auriculares Pro</h3>
                <p className="text-sm text-gray-600">
                  Cancelación de ruido y batería de larga duración
                </p>
              </div>
              <img
                src="https://images.pexels.com/photos/34578398/pexels-photo-34578398.jpeg"
                alt="Auriculares"
                className="w-40 h-32 object-cover rounded-md"
              />
            </Card.Body>

            <Card.Footer>
              <div className="flex gap-4">
                <button className="w-[132px] h-[42px] bg-[#eb7d69] text-white rounded-full hover:bg-[#e65238] 
                hover:-translate-x-2 hover:scale-125 transition-all"
                >
                  Leer post
                </button>

                <button className="flex items-center justify-center bg-neutral-800 border border-white w-10 h-10 rounded-full 
                hover:translate-x-2 hover:scale-125 transition-all"
                >
                  <img
                    className="w-4 h-4"
                    src={Share}
                    alt="Compartir"
                  />
                </button>
              </div>
            </Card.Footer>
          </Card>
        </div>

        
        <Pagination 
        currentPage={currentPage} 
        totalPages={10} 
        onPageChange={setCurrentPage} />
        
        {/* <CardNoticias
        titulo={titulo};
        empresa={empresa};
        ubicacion={ubicacion};
        descripcion={descripcion};
        /> */}

      </section>
    </>
  );
};

export default Blog;
