import "./index.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Blog from "./pages/Blog.tsx";
import Contacto from "./pages/Contacto.tsx";

import Header from "./componentes/Header.tsx";
import MainLayout from "./pages/MainLayout.tsx";

import PokedexPage from "./pages/PokedexPage.tsx";
import PokemonDetail from "./pages/PokemonDetail.tsx";
import HooksPage from "./pages/HooksPage.tsx";
import FacturacionPage from "./pages/FacturacionPage.tsx";
import TaskLabPage from "./pages/TaskLabPage.tsx";

import Footer from "./componentes/Footer.tsx";



function App() {
  return (
    <BrowserRouter>
      {/* Contenedor Raíz: Ocupa toda la pantalla, fondo oscuro, alineación vertical */}
      <div className="flex flex-col min-h-screen w-full bg-[#1A1B22]">
        
        <Header />
        
        {/* El MAIN debe tener w-full para que el contenido no se comprima al centro */}
        <main className="grow w-full">
          <Routes>
            <Route path="/" element={<MainLayout />} />
            <Route path="/pokedex" element={<PokedexPage isDark={true}/>} />
            <Route path="/pokedex/:name" element={<PokemonDetail />} />
            <Route path="/hooks" element={<HooksPage isDark={true}/>} />
            <Route path="/facturacion" element={<FacturacionPage />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/tasklab" element={<TaskLabPage />} />
            <Route path="/contacto" element={<Contacto />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
