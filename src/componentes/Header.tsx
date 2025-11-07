import { NavLink } from "react-router-dom"

const Header = () => {
  return (

    <>
      <header className="px-22 bg-neutral-900 shadow-sm">
      
        <nav className="flex flex-col md:flex-row justify-between py-4">
          
          <a href="/" className="text-xl font-bold text-white mb:4 md:mb-0">
          MyBlog
          </a>

            <ul  className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
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
    </header>

    </>
  )
}

export default Header