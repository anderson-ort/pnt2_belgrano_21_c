import styles from "./Header.module.css"

export const Header = ({ text, variant="header-secondary" , element="h1" }) => {

  const Element = element; // Capitalized for JSX | disclaimer --> NO HACERLO ASI
  return <Element className={styles[variant]}>{text}</Element>;
}
