import { useState } from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (

    <>
      <header className="px-22 bg-neutral-800 shadow-sm shadow-red-300/20">
      
        <nav className="flex flex-col md:flex-row justify-between py-4">
          
          <a href="/" className="hidden md:block text-2xl font-bold text-white mb-4 md:mb-0">
          MyBlog
          </a>

          {/** MOBILE MENU **/}
          <section className="flex md:hidden">
            {/* HAMBURGUESA LATE*/}
            <div className="space-y-2"
            onClick={() => setIsOpen(!isOpen)}>
              <span className="block h-0.5 w-8 animate-pulse bg-gray-200"></span>
              <span className="block h-0.5 w-8 animate-pulse bg-gray-200"></span>
              <span className="block h-0.5 w-8 animate-pulse bg-gray-200"></span>
            </div>

            <div className={isOpen ? "showMenuNav" : "hideMenuNav"}>
              <div className="absolute top-0 right-0 px-8 py-8"
                onClick={() => setIsOpen(false)}
                >
                <svg className="h-8 w-8 text-gray-200"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      >
                      <line x1="18" y1="6" x2="6" y2="18" />
                      <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </div>
          {/* NAVEGACION MOBILE OPEN */}
              <ul className="flex flex-col items-center justify-between min-h-[250px]">
                <li className="border-b border-gray-600 my-8 uppercase">
                  <NavLink
                  to="/"
                  className={({isActive}) => isActive ? "text-[#eb7d69]" : "text-white"}> 
                  
                  Inicio
                  </NavLink>
                </li>


                <li className="border-b border-gray-600 my-8 uppercase">
                  <NavLink
                  to="/blog"
                  className={({isActive}) => isActive ? "text-[#eb7d69]" : "text-white"}> 

                  Blog
                  </NavLink>
                </li>
                
                <li className="border-b border-gray-600 my-8 uppercase">
                  <NavLink
                  to="/contacto"
                  className={({isActive}) => isActive ? "text-[#eb7d69]" : "text-white"}> 
                  
                  Contacto
                  </NavLink>
                </li>
              </ul>
            </div>

          </section>

          {/* NAVEGACION DESKTOP */}
          <ul className="hidden text-lg space-x-8 md:flex">
            <li>
                <NavLink
                to="/"
                  className={({isActive}) => isActive ? "text-[#eb7d69]" : "text-white"}>
                    Inicio
                  </NavLink>
            </li>

            <li>
                <NavLink
                to="/blog"
                  className={({isActive}) => isActive ? "text-[#eb7d69]" : "text-white"}>
                    Blog
                  </NavLink>
            </li>

            <li>
                <NavLink
                to="/contacto"
                  className={({isActive}) => isActive ? "text-[#eb7d69]" : "text-white"}>
                    Contacto
                  </NavLink>
            </li>
          </ul>

        </nav>
        <style>
          {`
      .hideMenuNav {
        display: none;
      }
      .showMenuNav {
        display: block;
        position: absolute;
        width: 100%;
        height: 100vh;
        top: 0;
        left: 0;
        background: rgba(17,17,17,0.8);
        backdrop-filter: blur(10px);
        z-index: 10;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        align-items: center;
      }
    `}
        </style>
    </header>

    </>
  )
}

export default Header