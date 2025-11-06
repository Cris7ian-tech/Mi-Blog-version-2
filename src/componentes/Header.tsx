
const Header = () => {
  return (

    <div>

      <header className="px-22 background-white shadow-sm">
      
      <nav className="flex flex-row justify-between items-center py-7">
        
        <a href="/" className="text-2xl font-light text-white">
        MyBlog
        </a>

        <ul  className="flex flex-row space-x-4">
          <li>
            <a 
            href="#Blog"
            className="text-lg font-medium text-white decoration-2 underline-offset-8 hover:text-cyan-200"
            >
            Blog
            </a>
            </li>

          <li>
            <a 
            href="#Contacto"
            className="text-lg font-medium text-white decoration-2 underline-offset-8 hover:text-cyan-200"
            >
            Contacto
            </a>
            </li>
        </ul>

      </nav>
    </header>

    </div>
  )
}

export default Header