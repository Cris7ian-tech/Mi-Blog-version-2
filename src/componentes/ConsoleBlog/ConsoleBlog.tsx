import React, { useState, useEffect, useRef } from "react";

import postsData from "../../data/blogPosts.json";
import Typewriter from "./Typewriter";

interface Post {
  id: string;
  filename: string;
  content: string;
  type?: string;
}

interface HistoryItem {
  command: string;
  output: string | string[];
}

const ConsoleBlog = () => {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll al final de la consola cada vez que el historial cambia
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanInput = input.toLowerCase().trim();
    const [cmd, ...args] = cleanInput.split(" ");
    const argument = args.join(" ");

    let response: string | string[] = "";

    switch (cmd) {
      case "help":
        response = [
          "Comandos disponibles:",
          "  ls       - Listar misiones y artículos",
          "  cat [file] - Leer contenido de un archivo",
          "  whoami   - Información del desarrollador",
          "  clear    - Limpiar la terminal",
          "  date     - Ver fecha y hora actual",
        ];
        break;

      case "ls":
        // 2. Le decimos a TS que cada post (p) cumple con la interfaz Post
        response = postsData.map((p: Post) => p.filename).join("    ");
        break;

      case "cat":
        if (!argument) {
          response = "Error: Especifica un archivo. Ej: cat bienvenidos.txt";
        } else {
          // 3. Aquí también tipamos la búsqueda
          const post = postsData.find(
            (p: Post) => p.filename.toLowerCase() === argument,
          );
          response = post
            ? post.content
            : `Error: Archivo '${argument}' no encontrado.`;
        }
        break;

      case "whoami":
        response =
          "Cristian // Web Developer // General La Madrid, AR. // Native Plant Scout";
        break;

      case "date":
        response = new Date().toLocaleString();
        break;

      case "clear":
        setHistory([]);
        setInput("");
        return;

      case "":
        break;

      default:
        response = `Comando no reconocido: ${cmd}. Escribe 'help' para ver opciones.`;
    }

    setHistory([...history, { command: input, output: response }]);
    setInput("");
  };

  return (
    <section className="min-h-screen bg-[#1A1C23] flex flex-col items-center justify-center p-6">
      {/* Título de la sección (opcional) */}
      <h2 className="text-[#DE8676] font-mono mb-8 tracking-[0.5em] uppercase text-sm">
        Terminal Interface
      </h2>

      {/* Ventana Estilo MAC */}
      <div className="w-full max-w-3xl bg-[#2D2F39]/95 backdrop-blur-sm rounded-lg shadow-2xl border border-[#373943] overflow-hidden flex flex-col">
        {/* Barra Superior Mac */}
        <div className="bg-[#373943]/80 px-4 py-3 flex items-center justify-between border-b border-[#1A1C23]/30">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-[#FF5F56]"></div>
            <div className="w-3 h-3 rounded-full bg-[#FFBD2E]"></div>
            <div className="w-3 h-3 rounded-full bg-[#27C93F]"></div>
          </div>
          <div className="text-[#A1A1A1] text-[10px] font-mono tracking-widest uppercase">
            bash — cristian@lamadrid — 80x24
          </div>
          <div className="w-10"></div>
        </div>

        {/* Cuerpo de la Terminal */}
        <div
          ref={scrollRef}
          className="p-6 h-[450px] overflow-y-auto font-mono text-sm leading-relaxed scrollbar-thin scrollbar-thumb-[#373943]"
        >
          {/* Bienvenida */}
          <div className="text-[#DE8676] mb-4 opacity-80">
            [SISTEMA OPERATIVO CRISTIAN-DEV v1.0.2] <br />
            Escribe 'help' para comenzar la exploración.
          </div>

          {/* Historial de comandos */}
          {history.map(
            (
              item,
              i, // Usamos 'i' para el historial
            ) => (
              <div
                key={i}
                className="mb-4 animate-in fade-in slide-in-from-left-1 duration-300"
              >
                {/* Agregamos de vuelta la línea del comando escrito */}
                <div className="flex items-center gap-2 text-[#27C93F]">
                  <span>➜</span>
                  <span className="text-[#DE8676]">~/blog</span>
                  <span className="text-white">{item.command}</span>
                </div>

                {/* Respuesta de la terminal */}
                <div className="mt-1 text-[#A1A1A1] whitespace-pre-wrap pl-4 border-l border-[#373943] ml-1">
                  {Array.isArray(item.output) ? (
                    item.output.map((line, j) => <div key={j}>{line}</div>) // Usamos 'j' para las líneas internas
                  ) : (
                    <Typewriter text={item.output} speed={60} delay={500} />
                  )}
                </div>
              </div>
            ),
          )}

          {/* Línea de Entrada Activa */}
          <form onSubmit={handleCommand} className="flex items-center gap-2">
            <span className="text-[#27C93F]">➜</span>
            <span className="text-[#DE8676]">~/blog</span>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              autoFocus
              className="bg-transparent border-none outline-none text-white flex-1 caret-[#DE8676] focus:ring-0"
              spellCheck="false"
              autoComplete="off"
            />
          </form>
        </div>
      </div>
    </section>
  );
};

export default ConsoleBlog;
