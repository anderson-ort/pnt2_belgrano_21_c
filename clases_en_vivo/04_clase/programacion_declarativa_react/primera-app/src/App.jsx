import { useState } from 'react';
import './App.css'
import DisplayEdad from './displayEdad/DisplayEdadComponente';
import ResetEdad from './resetBtn/ResetBtn';

function App() {
  console.log("Estoy renderizado como componente App");
  const nombre = "Andru"
  let initState = 38

  const [edad, setEdad] = useState(initState);

  const subirEdad = () => {
    console.log("estoy siendo un cambio en edad?");

    if (edad >= 40) {
      console.log("No hace falta que me des mas edad");
      return
    }

    setEdad(edad => ++edad)
    console.log(edad);
  }

  const bajarEdad = () => setEdad(edad => edad - 1)

  // <></> --> fragment

  // return( 
  //   <></>
  // )

  // COMO HAGOOOOO para pasarle otro componente a este componente y pasarle ese valor?????
  return (
    <>
      <h1>Hola mi hente!</h1>
      <DisplayEdad edadChild={edad} />
      <ResetEdad handleReset={setEdad} initState={initState} />
      <p> Mi nombre es: {nombre}</p>
      <div>
        <button onClick={subirEdad}> + </button>
        <button onClick={bajarEdad}> - </button>
      </div>
    </>
  )
}


export default App
