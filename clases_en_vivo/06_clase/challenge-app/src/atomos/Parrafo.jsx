import styles from './Atomos.module.css'

export const Parrafo = ({ text, variante }) => {
  return <p className={styles[variante]}>{text}</p>
}
