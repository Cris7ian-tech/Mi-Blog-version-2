import { useRef } from "react";

//for (inicialización; condición; actualización) {
// código a ejecutar
//EJEMPLO
//for (let number = 1; number <= 10; number++) {
//console.log(number)

//Estructura de wile
//while (condición) {
// "código a ejecutar mientras se cumpla la condición"
//❗❗❗words[i][j] ❗❗❗
// ✅  i → recorre array (palabras)
// ✅  j → recorre string (letras)

  const Contacto = () => {
    //EJERCICIO 1 — Entender [i]

    // const words = ["clear", "clone"]

    // console.log(words[0][2] === words[1][0])

    //EJERCICIO 2 — Tabulación


  const lastKeyWasTab = useRef(false);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Tab") {
      e.preventDefault();

      if (lastKeyWasTab.current) {
        addToHistory({
          type: "list",
          output: matches
        })
      } else {
        console.log("🟢 primer TAB");
      }

      lastKeyWasTab.current = true;
      return;
    }

    // cualquier otra tecla resetea
    lastKeyWasTab.current = false;
  }; // 👈 ESTE ; y cierre faltaba

    

  //----------------------------------------------------------
  //   const word = "clear";

  //   for (let i = 0; i < word.length; i++) {

  //     console.log(word[i])
  //     console.log(word.slice(0, 2));
  //     console.log(word.slice(0, 3));

  //   }

  // //🧩 3. Estructura completa (pero con huecos)
  //   function getCommonPreflix(matches: string[]) {

  //     let prefix = matches[0];

  //     for (let i = 1; i < matches.length; i++) {
  //       let j = 0;

  //       while (
  //         j < prefix.length &&
  //         j < matches[i].length &&
  //         prefix[j] === matches[i][j]
  //       ) {
  //         j++;
  //       }

  //       prefix = prefix.slice(0, j);
  //     }

  //     return prefix;
  //   }



  return (
    <>
      <h1 className="text-slate-200 text-6xl text-center m-7 underline">
        Espacio de Práctica
      </h1>

      <input
        type="text"
        onKeyDown={handleKeyDown}
        className="border p-2 text-slate-200 bg-slate-700/30 rounded-md w-1/2 m-auto"
        placeholder="Probá TAB acá"
      />
    </>
  );
};

export default Contacto;
