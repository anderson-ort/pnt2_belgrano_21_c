# Introducción a React

## Documentación
- [Documentación oficial de React](https://react.dev/learn)
- [Guía de Vite para React](https://vite.dev/guide/)

## Objetivos de la Clase
- Comprender la diferencia entre programación declarativa e imperativa
- Aprender los fundamentos de React y su modelo de componentes
- Conocer JSX, props y estado en React
- Explorar los hooks más importantes
- Aplicar buenas prácticas en desarrollo con React

## 1. ¿Qué es React?
React es una biblioteca de JavaScript desarrollada por Facebook para crear interfaces de usuario de forma declarativa y componetizada. Permite escribir vistas que "reaccionan" a cambios en los datos.

**Ventajas de React:**
- **Declarativo:** Escribimos lo que queremos hacer y React maneja el DOM
- **Componentes reutilizables:** Dividimos problemas complejos en componentes pequeños
- **Virtual DOM:** Actualiza solo los elementos necesarios, mejorando el rendimiento

## 2. Programación Imperativa vs. Declarativa

**Imperativa:** Describe pasos específicos para lograr un objetivo
```js
const list = document.getElementById('lista');
const item = document.createElement('li');
item.textContent = 'Nuevo ítem';
list.appendChild(item);
```

**Declarativa (React):** Enfocada en qué queremos renderizar
```jsx
function Lista() {
  return (
    <ul>
      <li>Nuevo ítem</li>
    </ul>
  );
}
```

## 3. JSX: JavaScript + XML
JSX es una sintaxis extendida de JavaScript similar a XML/HTML que se transpila a JavaScript puro.

```jsx
const element = <h1>¡Hola, mundo!</h1>;
```

## 4. Componentes en React
Un componente es una función que retorna JSX, representando una pieza reutilizable de la interfaz.

```jsx
function Boton() {
  return <button>Click me</button>;
}
```

Uso:
```jsx
<Boton />
```

## 5. Props (Propiedades)
Permiten pasar información a los componentes como atributos.

```jsx
function Saludo({ nombre }) {
  return <h1>Hola, {nombre}!</h1>;
}

// Uso
<Saludo nombre="Andru" />
```

## 6. Estado (State)
Maneja datos internos del componente que pueden cambiar con el tiempo.

```jsx
import { useState } from 'react';

function Contador() {
  const [contador, setContador] = useState(0);
  
  return (
    <div>
      <p>Contador: {contador}</p>
      <button onClick={() => setContador(contador + 1)}>
        Incrementar
      </button>
    </div>
  );
}
```

## 7. Hooks Principales

**useState():** Maneja el estado local del componente

**useEffect():** Ejecuta código en momentos específicos del ciclo de vida
```jsx
useEffect(() => {
  console.log('Componente montado');
}, []);
```

**useContext():** Accede a valores globales sin prop drilling
```jsx
const ThemeContext = React.createContext('light');

function Componente() {
  const theme = useContext(ThemeContext);
  return <p>El tema actual es {theme}</p>;
}
```

**useRef():** Mantiene referencias sin provocar re-renderizados
```jsx
const inputRef = useRef(null);

function enfocar() {
  inputRef.current.focus();
}
```

**useMemo() y useCallback():** Optimizan el rendimiento evitando cálculos innecesarios
```jsx
const valorMemoizado = useMemo(() => calcularAlgo(pesado), [dependencias]);
```

## 8. Buenas Prácticas
- Separar lógica y presentación
- Usar Fragment (`<>...</>`) en lugar de divs innecesarios
- Optimizar renderizados con React.memo()
- Evitar estados innecesarios, usar useRef() cuando no sea necesario re-renderizar
- Usar PropTypes o TypeScript para validar props

## 9. Crear una App con Vite
Para iniciar un proyecto React con Vite:
```sh
npm create vite@latest mi-app --template react
cd mi-app
npm install
npm run dev
```

Ejemplo de App.jsx:
```jsx
function App() {
  return <h1>¡Hola desde Vite!</h1>;
}

export default App;
```

## Conceptos Fundamentales
1. **JSX:** Sintaxis que mezcla HTML con JavaScript
2. **Componentes son funciones puras:** Se ejecutan cada vez que se renderizan
3. **Actualización automática de UI:** Al cambiar estado o props, React actualiza la interfaz
4. **Virtual DOM:** React usa una copia virtual del DOM para actualizaciones eficientes
5. **Flujo unidireccional de datos:** Los datos fluyen de padres a hijos

## Conclusión
React simplifica el desarrollo de interfaces mediante un enfoque declarativo y componetizado. Su modelo basado en componentes reutilizables, estado manejable y Virtual DOM lo convierten en una herramienta poderosa para desarrollo frontend moderno. Comenzar con Vite ofrece una experiencia de desarrollo rápida y optimizada.
