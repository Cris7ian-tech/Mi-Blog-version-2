
const Footer = () => {
  return (

    <div>
      
      <footer className="p-4 bg-neutral-900 shadow-red-30080 text-gray-300 text-center flex flex-col sm:flex-row items-center justify-center gap-2 whitespace-nowrap">
      <p className="flex items-center gap-2 text-sm sm:text-base">
        © {new Date().getFullYear()} MyBlog — Creado con{" "}
          <span className="flex items-center gap-1 text-cyan-300 font-semibold">
            <img
              src="/src/assets/react.svg"
              alt="React logo"
              className="w-5 h-5 inline-block"/>
              React
          </span>{" "}
              y{" "}
          <span className="flex items-center gap-1 text-sky-400 font-semibold">
            <img
              src="/src/assets/tailwind.svg"
              alt="Tailwind CSS logo"
              className="w-5 h-5 inline-block"/>
              Tailwind CSS
          </span>
      </p>
    </footer>
    </div>
  )
}

export default Footer