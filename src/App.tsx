import "./index.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Blog from "./pages/Blog.tsx";
import Contacto from "./pages/Contacto.tsx";

import Header from "./componentes/Header.tsx";
import MainLayout from "./pages/MainLayout.tsx";
import Footer from "./componentes/Footer.tsx";



function App() {
  return (
    <>
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<MainLayout />}/>
        <Route path="/blog" element={<Blog />}/>
        <Route path="/contacto" element={<Contacto />}/>
      </Routes>
      <Footer />
    </BrowserRouter>


    {/* <MainLayout />

    <section className="min-h-screen flex items-center justify-center bg-gray-100 p-8 ">
      <Card>

      <Card.Header>
        CardHeader: Articulo relacionado
      </Card.Header>

      <Card.Body className="flex items-center gap-4 pb-10">

          <div className="flex-1">
            <h3 className="text-lg font-bold">Auriculares Pro</h3>
            <p className="text-sm text-gray-600">Cancelación de ruido y bateria de larga duración</p>
          </div>

        <img src="https://images.pexels.com/photos/34578398/pexels-photo-34578398.jpeg" 
        alt="Auriculares"
        className="w-40 h-30 object-cover rounded-md"/>

      </Card.Body>

      <Card.Footer>
        <div className="flex gap-4">
          <button className="w-[132px] h-[42px] bg-[#eb7d69] text-white rounded-full
              hover:bg-[#db614b] hover:scale-125 hover:-translate-x-3 
              transition-transform duration-400 ease-in-out">Leer post</button>
          <button className="flex items-center justify-center bg-neutral-800 w-10 h-10 rounded-full hover:scale-125 hover:translate-x-3
              transition-transform duration-400 ease-in-out">
            <img className="w-6 h-6" src="/src/assets/share.svg" 
                alt="Compartir"/>
            </button>
        </div>
      </Card.Footer>
    </Card>

    </section> */}
    
    </>
  )    
}

export default App


