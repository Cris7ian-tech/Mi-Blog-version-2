import hooksData from '../data/HooksData.json'
import CardArticle from '../componentes/ui/CardArticle.tsx'

import React from "../assets/react.svg";

const MainLayout = () => {
  return (
    <>

      <main className="min-h-screen p-4 sm:p-6 md:p-12 lg:p-20 ">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {/* Imagen */}
          <div className="bg-secondary md:col-span-2 rounded-lg w-full h-full object-cover hover:shadow-lg ease-in duration-300">
            <img
            src={React}
            alt="react logo"
            className="w-full h-full object-cover rounded-lg"/>
          </div>

          {/* Texto */}
          <div className="bg-[#eb7d69] content-end md:col-span-3 rounded-lg px-4 py-6 hover:shadow-lg ease-in duration-300">
            <h2 className="text-2xl text-white font-bold py-4">¡Hola! Soy Cristian 👋</h2>
            
            <p className="text-gray-200 text-xl tracking-wider mb-4">
              Soy un <strong>desarrollador web en proceso</strong>, de Argentina. 
              Este es mi blog, donde comparto mis proyectos y experiencias en la programación.
            </p>

            <p className="text-gray-200 text-xl tracking-wider mb-4">
              La primera publicación será sobre <strong>React</strong> y sus tan nombrados y usados <strong>Hooks</strong>, 
              una herramienta clave para crear aplicaciones modernas y eficientes 🚀.
            </p>

            <p className="text-gray-200 text-xl tracking-wider">
              Si estás empezando con React o querés mejorar tu forma de trabajar con componentes funcionales, 
              <strong> este espacio es para vos.</strong>
            </p>
          </div>
        </div>


          {/* Articulos*/}
        <div className="grid 
                        grid-cols-[repeat(auto-fit,minmax(320px,1fr))]
                        sm:grid-cols-2
                        md:grid-cols-3 
                        gap-4 mt-4 
                        transition-all duration-300">

          {hooksData.HooksData.map((hook, index) =>(
          <CardArticle 
          key={index}
          {...hook}
          />
          ))}
        </div>

      </main> 
    
    </>
  )
}

export default MainLayout