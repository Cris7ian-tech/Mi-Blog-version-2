// src/hooks/useTerminal.ts
import { useState } from "react";
import type { HistoryItem, Post } from "../componentes/ConsoleBlog/types";





const useTerminal = () => {
  const [history, setHistory] = useState<HistoryItem[]>([]);

  const processCommand = (command: string, posts: Post[]) => {
    const cleanInput = command.toLowerCase().trim();
    const [cmd, ...args] = cleanInput.split(" ");
    const argument = args.join(" ");

    let response: HistoryItem;

  switch (cmd) {
    case "help":
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
        ],
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
          output:
            "Cristian — Web Developer — General La Madrid, Argentina",
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

          default:
            response = {
              type: "text",
              command,
              output: `Comando no reconocido: ${cmd}`,
            };
        }

  setHistory((prev) => [...prev, response]);
};

  return { history, processCommand };
};

export default useTerminal;