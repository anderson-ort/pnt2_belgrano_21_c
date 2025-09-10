import { TEXT_PROB_PRODUCTS } from '../../constants'
import { Header } from '../Header/Header'
import { ProbProducto } from '../ProbProductoRensponse/ProbProducto'

export const DisplayProbProducts = () => {
  const responsesMocks = [
    { id:"_0x00001", nombre: 'arandela', prob: 80 },
    { id:"_0x00002", nombre: 'foco', prob: 20 },
  ]

  return (
    <>
      <Header text={TEXT_PROB_PRODUCTS} />

      {responsesMocks.map((prod) => (
        <ProbProducto key={prod.id} nombre={prod.nombre} prob={prod.prob} />
      ))}
    </>
  )
}
