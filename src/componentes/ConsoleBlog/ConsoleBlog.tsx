import React, { useState, useEffect, useRef } from "react";

import postsData from "../../data/blogPosts.json";
import Typewriter from "./Typewriter";
import useTerminal from "../../hooks/useTerminal";
import type { HistoryItem, Post } from "./types";

//Funcion on demand(Bajo demanda) TAB

const getCommonPrefix = (arr: string[]) => {
  if (arr.length === 0) return "";

  let prefix = arr[0];

  for (let i = 1; i < arr.length; i++) {
    while (!arr[i].startsWith(prefix)) {
      prefix = prefix.slice(0, prefix.length - 1);

      if (prefix === "") return "";
    }
  }

  return prefix;
};

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
    setHistoryIndex(null); // Reiniciamos el índice al enviar un comando
  };


  const renderOutput = (item: HistoryItem) => {
    switch (item.type) {
      case "text":
        return <Typewriter text={item.output} speed={60} delay={500} />;

      case "list":
        return item.output.map((line, j) => <div key={j}>{line}</div>);

      // case "component":
      //   return item.output;

      default: {
        const _exhaustiveCheck: never = item;
        return _exhaustiveCheck;
      }
    }
  };


  // 🔥 EVENTO PRINCIPAL DE TECLADO
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // =========================
    // 🔷 AUTOCOMPLETADO (TAB)
    // =========================
    if (e.key === "Tab") {
      e.preventDefault();

      const [cmd, ...args] = input.split(" ");
      const argument = args.join(" ");

      const commands = [
        "help",
        "ls",
        "cat",
        "whoami",
        "date",
        "clear",
        "echo",
        "pwd",
        "history",
      ];

      // =========================
      // 🔵 1. AUTOCOMPLETAR COMANDO
      // =========================
      if (args.length === 0) {
        const matches = commands.filter((c) => c.startsWith(cmd.toLowerCase()));

        if (matches.length === 0) {
          setSuggestion("");
          return;
        }

        if (matches.length === 1) {
          setInput(matches[0]); // TAB completa
          setSuggestion(matches[0]); // ghost también

          return;
        }
        if (matches.length > 1) {
          const common = getCommonPrefix(matches);

          if (common.length > cmd.length) {
            setInput(common);
            setSuggestion(common);
          } else {
            addToHistory({
              type: "list",
              command: input,
              output: matches,
            });
          }

          return;
        }
      }


      // =========================
      // 🔵 2. AUTOCOMPLETAR ARCHIVOS (cat)
      // =========================
      if (cmd === "cat") {
        const files = postsData.map((p) => p.filename);

        const matches = files.filter((f) =>
          f.toLowerCase().startsWith(argument.toLowerCase()),
        );

        if (matches.length === 1) {
          const full = `${cmd} ${matches[0]}`;
          setInput(full);
          setSuggestion(full);
        } else if (matches.length > 1) {
          const common = getCommonPrefix(matches);

          if (common.length > argument.length) {
            setInput(`${cmd} ${common}`);
          } else {
            addToHistory({
              type: "list",
              command: input,
              output: matches,
            });
          }
        }

        return;
      }


      // =========================
      // 🔵 3. AUTOCOMPLETAR ARGUMENTO DE help
      // =========================
      if (cmd === "help") {
        const matches = commands.filter((c) =>
          c.startsWith(argument.toLowerCase()),
        );

        if (matches.length === 1) {
          setInput(`${cmd} ${matches[0]}`);
        } else if (matches.length > 1) {
          addToHistory({
            type: "list",
            command: input,
            output: matches,
          });
        }

        return;
      }
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

                  const commands = [
                    "help",
                    "ls",
                    "cat",
                    "whoami",
                    "date",
                    "clear",
                    "echo",
                    "pwd",
                    "history",
                  ];

                  const [cmd, ...args] = value.split(" ");

                  if (args.length === 0) {
                    const match = commands.find((c) =>
                      c.startsWith(cmd.toLowerCase()),
                    );

                    if (match && match !== cmd) {
                      setSuggestion(match);
                    } else {
                      setSuggestion("");
                    }
                  } else {
                    setSuggestion("");
                  }
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
