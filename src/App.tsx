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
    </>
  )    
}

export default App


