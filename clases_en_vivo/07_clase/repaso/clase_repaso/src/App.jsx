import { useEffect, useState } from 'react'
import './App.css'
import useFetch from './CustomHooks/useFetch'

function App() {
  // hooks -> son metodos especiales de react que nos permitian hacer alteraciones al estado del componente

  const [edad, setEdad] = useState(19)

  const { datos: planetas, error, loading } = useFetch("https://swapi.dev/api/planets", "results")

  const adder = prev => ++prev
  const diff = prev => --prev

  const handleUpBtn = () => {
    console.log("Estas subiendo");
    setEdad(adder)

  }
  const handleDownBtn = () => {

    console.log("Estas bajando");
    setEdad(diff)

  }




  return (
    <>
      <h3>Mostrar edad</h3>
      <p>La edad es: {edad}</p>
      <div>
        <button onClick={handleDownBtn}>-</button>
        <button onClick={handleUpBtn}>+</button>
      </div>

      <div>
        <h3>Posts desde  un endpoint</h3>
        {error && <div> Error:{error}</div>}
        {
          loading
            ? <div> Cargando...</div>
            :

            (<ul>
              {planetas?.map(planet => <li key={planet?.url}>{planet?.name}</li>)}
            </ul>)

        }

        {/* { planetas && planetas.map( planet => <li>{planet?.name}</li>)} */}
        {/* { planetas?.map( planet => <li key={planet?.url}>{planet?.name}</li>)} */}


      </div>

    </>
  )
}

export default App
