// src/hooks/useTerminal.ts

export const useTerminal = () => {
  const [history, setHistory] = useState<string[]>([]);

  const processCommand = (command: string) => {
    const cmd = command.toLowerCase().trim();
    let response = "";

    switch (cmd) {
      case "help":
        response = "Comandos disponibles: ls, cat [archivo], clear, whoami, help";
        break;
      case "ls":
        response = "intro.md  proyectos.js  inkscape-map.svg  contacto.txt";
        break;
      case "whoami":
        response = "Cristian — Web Developer & Native Plant Enthusiast — La Madrid, Arg.";
        break;
      case "clear":
        setHistory([]);
        return;
      default:
        response = `Comando no encontrado: ${cmd}. Escribí 'help' para asistencia.`;
    }

    setHistory((prev) => [...prev, `➜ ~/blog ${command}`, response]);
  };

  return { history, processCommand };
};