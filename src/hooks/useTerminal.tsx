// src/hooks/useTerminal.ts
import { useState } from "react";
import type { HistoryItem, Post } from "../componentes/ConsoleBlog/types";

const useTerminal = () => {
  const [history, setHistory] = useState<HistoryItem[]>([]);

  // funcion para mostrar coincidencias de autocompletado
  const addToHistory = (item: HistoryItem) => {
    setHistory((prev) => [...prev, item]);
  };

  const processCommand = (command: string, posts: Post[]) => {
    const cleanInput = command.toLowerCase().trim();
    const [cmd, ...args] = cleanInput.split(" ");
    const argument = args.join(" ");

    let response: HistoryItem;

    switch (cmd) {
      case "help":
        // 🔷 Si NO hay argumento → mostrar todos los comandos
        if (!argument) {
          response = {
            type: "list",
            command,
            output: [
              "Comandos disponibles:",
              "ls       - Listar archivos",
              "cat [file] - Leer archivo",
              "whoami   - Info del desarrollador",
              "clear    - Limpiar terminal",
              "date     - Fecha actual",
              "echo     - Hola mundo",
              "pwd      - Ruta actual(fake)",
              "history  - Ver historial de comandos",
              "help [cmd]-Ayuda de un comando",
            ],
          };
        }
        // 🔶 Si HAY argumento → ayuda específica
        else {
          switch (argument) {
            case "cat":
              response = {
                type: "text",
                command,
                output: "cat [file]: Muestra el contenido de un archivo",
              };
              break;

            case "ls":
              response = {
                type: "text",
                command,
                output: "ls: Lista los archivos disponibles",
              };
              break;

            case "echo":
              response = {
                type: "text",
                command,
                output: "echo [text]: Imprime el texto ingresado",
              };
              break;

            case "history":
              response = {
                type: "text",
                command,
                output: "history: muestra comandos ejecutados",
              };
              break;

            default:
              response = {
                type: "text",
                command,
                output: `No hay auda disponible para: ${argument}`,
              };
          }
        }
        break;

      case "ls":
        response = {
          type: "list",
          command,
          output: posts.map((p) => p.filename),
        };
        break;

      case "cat":
        if (!argument) {
          response = {
            type: "text",
            command,
            output: "Error: especifica un archivo. Ej: cat intro.md",
          };
        } else {
          const post = posts.find((p) => p.filename.toLowerCase() === argument);

          response = {
            type: "text",
            command,
            output: post ? post.content : `Archivo no encontrado: ${argument}`,
          };
        }
        break;

      case "whoami":
        response = {
          type: "text",
          command,
          output: "Cristian — Web Developer — General La Madrid, Argentina",
        };
        break;

      case "date":
        response = {
          type: "text",
          command,
          output: new Date().toLocaleString(),
        };
        break;

      case "clear":
        setHistory([]);
        return;

      case "":
        return;

      case "echo":
        response = {
          type: "text",
          command,
          output: args.length ? args.join(" ") : "",
        };
        break;

      case "pwd":
        response = {
          type: "text",
          command,
          output: "/home/cristian/console-blog",
        };
        break;

      case "history":
        response = {
          type: "list",
          command,
          output: history.map((item) => item.command),
        };
        break;

      default:
        response = {
          type: "text",
          command,
          output: `Comando no reconocido: ${cmd}`,
        };
    }

    setHistory((prev) => [...prev, response]);
  };

  return { history, processCommand, addToHistory };
};

export default useTerminal;
