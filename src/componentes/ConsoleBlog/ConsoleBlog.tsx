import React, { useState, useEffect, useRef } from "react";

import postsData from "../../data/blogPosts.json";
import Typewriter from "./Typewriter";
import useTerminal from "../../hooks/useTerminal";
import type { HistoryItem, Post } from "./types";

//Funcion on demand(Bajo demanda) TAB

type AutocompleteResult = {
  suggestion: string;
};

const getAutocomplete = (value: string, posts: Post[]): AutocompleteResult => {
  const commands = [
    "help", "ls", "cat", "whoami", "date",
    "clear", "echo", "pwd", "history",
  ];

  const [cmd, ...args] = value.split(" ");
  const argument = args.join(" ");
  const normalizedCmd = cmd.toLowerCase();

  // =========================
  // 🔹 COMANDOS
  // =========================
  if (args.length === 0) {
    const matches = commands.filter((c) =>
      c.startsWith(normalizedCmd)
    );

    console.log("INPUT:", normalizedCmd);
    console.log("MATCHES:", matches);


    if (matches.length === 0) {
      return { suggestion: "" };
    }

    if (matches.length === 1) {
      return { suggestion: matches[0] };
    }

    const prefix = getCommonPrefix(matches);
    console.log("PREFIX:", prefix);
      return { suggestion: prefix };
  }

  // =========================
  // 🔹 ARGUMENTOS (cat)
  // =========================
  if (normalizedCmd === "cat") {
    const files = posts.map((p) => p.filename);

    const matches = files.filter((f) =>
      f.toLowerCase().startsWith(argument.toLowerCase())
    );

    if (matches.length === 0) {
      return { suggestion: "" };
    }

    if (matches.length === 1) {
      return { suggestion: `${cmd} ${matches[0]}` };
    }

    const prefix = getCommonPrefix(matches);

    return { suggestion: `${cmd} ${prefix}` };
  }

  return { suggestion: "" };
};



  function getCommonPrefix(matches: string[]): string {
  if (matches.length === 0) return "";

  let prefix = matches[0];

  for (let i = 1; i < matches.length; i++) {
    let j = 0;

    while (
      j < prefix.length &&
      j < matches[i].length &&
      prefix[j] === matches[i][j]
    ) {
      j++;
    }

    prefix = prefix.slice(0, j);
  }

  return prefix;
}




const ConsoleBlog = () => {
  const [suggestion, setSuggestion] = useState("");

  const { history, processCommand, addToHistory } = useTerminal();

  const [input, setInput] = useState("");

  const scrollRef = useRef<HTMLDivElement>(null);
  // const typedPosts = postsData as Post[];

  //Nuevo estado: historial navegable con ↑ ↓ como una terminal real
  const [_historyIndex, setHistoryIndex] = useState<number | null>(null);

  // Auto-scroll al final de la consola cada vez que el historial cambia
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();

    // después acá vamos a usar processCommand
    if (!input.trim()) return;
    processCommand(input, postsData as Post[]);
    setInput("");
    setSuggestion("");  // ❗no hay texto Ghost en la linea siguiente
    setHistoryIndex(null); // Reiniciamos el índice al enviar un comando
  };

  const renderOutput = (item: HistoryItem) => {
    switch (item.type) {
      case "text":
        return <Typewriter text={item.output} speed={60} delay={500} />;

      case "list":
        return item.output.map((line, j) => <div key={j}>{line}</div>);

      default: {
        const _exhaustiveCheck: never = item;
        return _exhaustiveCheck;
      }
    }
  };

  // 🔥 EVENTO PRINCIPAL DE TECLADO: comportamiento ghost + TAB
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // =========================
    // 🔷 AUTOCOMPLETADO (TAB)
    // =========================
    if (e.key === "Tab") {
      e.preventDefault();

      const { suggestion } = getAutocomplete(input, postsData as Post[]);

      if (!suggestion) return;

      setInput(suggestion);
      setSuggestion(suggestion);
    }

    // =========================
    // ⬆️ HISTORIAL (ArrowUp)
    // =========================
    if (e.key === "ArrowUp") {
      e.preventDefault();

      if (history.length === 0) return;

      setHistoryIndex((prev) => {
        const newIndex =
          prev === null ? history.length - 1 : Math.max(0, prev - 1);

        setInput(history[newIndex].command);
        return newIndex;
      });
    }

    // =========================
    // ⬇️ HISTORIAL (ArrowDown)
    // =========================
    if (e.key === "ArrowDown") {
      e.preventDefault();

      if (history.length === 0) return;

      setHistoryIndex((prev) => {
        if (prev === null) return null;

        const newIndex = prev + 1;

        if (newIndex >= history.length) {
          setInput("");
          return null;
        }

        setInput(history[newIndex].command);
        return newIndex;
      });
    }
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
          {history.map((item, i) => (
            <div key={i} className="mb-4">
              {/* Agregamos de vuelta la línea del comando escrito */}
              <div className="flex items-center gap-2 text-[#27C93F]">
                <span>➜</span>
                <span className="text-[#DE8676]">~/blog</span>
                <span className="text-white">{item.command}</span>
              </div>

              {/* Respuesta de la terminal */}
              <div className="mt-1 text-[#A1A1A1] whitespace-pre-wrap pl-4 border-l border-[#373943] ml-1">
                {renderOutput(item)}
              </div>
            </div>
          ))}

          {/* Línea de Entrada Activa */}
          <form onSubmit={handleCommand} className="flex items-center gap-2">
            <span className="text-[#27C93F]">➜</span>
            <span className="text-[#DE8676]">~/blog</span>

            <div className="relative flex-1">
              <span className="absolute left-0 top-0 text-gray-500 pointer-events-none">
                {input + suggestion.slice(input.length)}
              </span>

              <input
                type="text"
                value={input}
                className="relative bg-transparent border-none outline-none text-white w-full"
                onKeyDown={handleKeyDown}
                onChange={(e) => {
                  const value = e.target.value;
                  setInput(value);

                  const { suggestion } = getAutocomplete(
                    value,
                    postsData as Post[],
                  );
                  setSuggestion(suggestion);
                }}
              />
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ConsoleBlog;
