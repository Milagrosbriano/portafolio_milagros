// App.jsx
import React, { useState } from "react";
import Mybutton from "./components/mybutton";
import classes from "./App.module.css";

export default function App() {
  const [numero, setNumero] = useState(50); //empieza en 50
  const [inicio, setInicio] = useState(true);
  const [gameOver, setGameOver] = useState(false);
  const [rangoInferior, setRangoInferior] = useState(0);
  const [rangoSuperior, setRangoSuperior] = useState(101);

  const reiniciar = () => {
    setNumero(50); //reiniciar numero a 50
    setRangoInferior(0); 
    setRangoSuperior(101);
    setInicio(true);
    setGameOver(false);
  };

  const adivinar = (comparacion) => {
    if (inicio) {
      setInicio(false);
      return;
    }

    if (comparacion === "igual") {
      setGameOver(true); //termina 
      return;
    }

    let nuevoNumero;
    if (comparacion === "mayor") {
      nuevoNumero = numero + Math.floor((rangoSuperior - numero) / 2); //Math.floor numero entero 
      setRangoInferior(numero + 1); 
    } else {
      nuevoNumero = numero - Math.floor((numero - rangoInferior) / 2); 
      setRangoSuperior(numero - 1);
    }

    setNumero(nuevoNumero);
  };

  return (
    <div id="root">
      <div className="Contenido">
        <div className={classes.classStyle}>
          <h1>¿Tu número es {numero}?</h1>
        </div>
        {!gameOver && (
          <div className={classes.botonesWrapper}>
            <Mybutton title={"Mayor"} variant={"botonMayor"} clickHandler={() => adivinar("mayor")} />
            <Mybutton title={"Menor"} variant={"botonMenor"} clickHandler={() => adivinar("menor")} />
            <Mybutton title={"Igual"} variant={"botonIgual"} clickHandler={() => adivinar("igual")} />
          </div>
        )}
        {gameOver && (
          <div className={classes.classStyle}>
            <p>¡Tu número es {numero}!</p>
            <div className={classes.botonesWrapper}>
            <Mybutton title={"Reiniciar"} variant={"botonReiniciar"} clickHandler={reiniciar} />
            </div>
          </div>

        )}
      </div>
    </div>
  );
}
