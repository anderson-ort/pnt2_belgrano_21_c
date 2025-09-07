# Hooks en React

## Introducción a los Hooks de React

Los Hooks son funciones que te permiten *"enganchar"* el estado y el ciclo de vida de React desde componentes funcionales. Fueron introducidos en React 16.8 para permitir el uso de estado y otras características sin escribir una clase.

### ¿Por qué usar Hooks?

- **Componentes más simples**: Eliminan la complejidad de las clases y el `this`
- **Reutilización de lógica**: Los custom hooks permiten extraer y reutilizar lógica de estado
- **Código más organizado**: Agrupar lógica relacionada en lugar de dividirla en métodos del ciclo de vida

---

## Hooks Básicos

### 1. useState

El Hook `useState` te permite agregar estado a componentes funcionales.

```jsx
import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Contador: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Incrementar
      </button>
      <button onClick={() => setCount(count - 1)}>
        Decrementar
      </button>
      <button onClick={() => setCount(0)}>
        Reiniciar
      </button>
    </div>
  );
}
```

**Explicación:**
- `useState(0)` inicializa el estado con el valor 0
- Retorna un array con dos elementos: el valor actual y una función para actualizarlo
- Usamos destructuring para obtener `count` y `setCount`
- Al llamar `setCount`, el componente se vuelve a renderizar con el nuevo valor

### 2. useEffect

El Hook `useEffect` te permite realizar efectos secundarios en componentes funcionales.

```jsx
import { useState, useEffect } from 'react';

function Timer() {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(seconds => seconds + 1);
    }, 1000);

    // Función de limpieza
    return () => clearInterval(interval);
  }, []); // Array de dependencias vacío = se ejecuta solo al montar

  return <p>Tiempo transcurrido: {seconds} segundos</p>;
}
```

**Casos de uso:**
- Peticiones a APIs
- Suscripciones a eventos
- Manipulación manual del DOM
- Logging

**Array de dependencias:**
- `[]`: Se ejecuta solo al montar el componente
- `[variable]`: Se ejecuta cuando `variable` cambia
- Sin array: Se ejecuta en cada renderizado

### 3. useContext

El Hook `useContext` te permite acceder al contexto de React sin necesidad de un componente Consumer.

```jsx
import { createContext, useContext } from 'react';

// Crear contexto
const ThemeContext = createContext('light');

function App() {
  return (
    <ThemeContext.Provider value="dark">
      <Toolbar />*
    </Them*eContext.Provider>
  );
}

function Toolbar() {
  const theme = useContext(ThemeContext);
  return <div>Tema actual: {theme}</div>;
}
```

### 4. useRef

El Hook `useRef` te permite crear una referencia mutable que persiste durante todo el ciclo de vida del componente.

```jsx
import { useRef } from 'react';

function TextInput() {
  const inputRef = useRef(null);

  const focusInput = () => {
    inputRef.current.focus();
  };

  return (
    <div>
      <input ref={inputRef} type="text" />
      <button onClick={focusInput}>Enfocar input</button>
    </div>
  );
}
```

**Características:**
- No causa re-renderizados cuando cambia su valor
- Útil para acceder a elementos del DOM directamente
- Puede almacenar cualquier valor mutable

---

## Hooks de Optimización

### 5. useMemo

El Hook `useMemo` memoriza valores calculados costosos.

```jsx
import { useMemo, useState } from 'react';

function ExpensiveCalculation({ a, b }) {
  const result = useMemo(() => {
    console.log('Calculando...');
    return a * b; // Cálculo costoso
  }, [a, b]); // Solo recalcula si a o b cambian

  return <p>Resultado: {result}</p>;
}
```

### 6. useCallback

El Hook `useCallback` memoriza funciones para evitar recrearlas en cada render.

```jsx
import { useCallback, useState } from 'react';

function ParentComponent() {
  const [count, setCount] = useState(0);
  
  const handleClick = useCallback(() => {
    setCount(prevCount => prevCount + 1);
  }, []); // La función no se recrea en cada render

  return <ChildComponent onClick={handleClick} count={count} />;
}

function ChildComponent({ onClick, count }) {
  return (
    <div>
      <p>Contador: {count}</p>
      <button onClick={onClick}>Incrementar</button>
    </div>
  );
}
```

---

## Reglas de los Hooks

1. **Solo llamar Hooks en el nivel superior**
   - No llamar Hooks dentro de bucles, condiciones o funciones anidadas

2. **Solo llamar Hooks desde componentes de React**
   - Llamar Hooks desde componentes funcionales de React o custom Hooks

---

## Ejemplo Práctico Completo

```jsx
import { useState, useEffect, useCallback } from 'react';

function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUser = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/users/${userId}`);
      if (!response.ok) throw new Error('Usuario no encontrado');
      const userData = await response.json();
      setUser(userData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error}</p>;
  
  return (
    <div>
      <h2>{user.name}</h2>
      <p>Email: {user.email}</p>
      <p>Rol: {user.role}</p>
    </div>
  );
}
```

---

## Recursos Adicionales

- Documentación oficial de React: https://reactjs.org/docs/hooks-intro.html
- Tutorial interactivo: https://reactjs.org/tutorial/tutorial.html
- Ejemplos prácticos: https://usehooks.com/

## Conclusión

Los Hooks de React representan una forma moderna y eficiente de trabajar con estado y efectos secundarios en componentes funcionales. Comprendiendo y aplicando correctamente estos Hooks básicos, podrás construir aplicaciones React robustas y mantenibles.
