# Introducción a React con Vite

## Instalación de Vite

Vite es una herramienta de construcción rápida que mejora significativamente la experiencia de desarrollo. Para instalarlo en tu entorno de Node.js:

```bash
npm install -D vite
```

## Crear un proyecto React con Vite

Abre tu terminal y ejecuta el siguiente comando:

```bash
npm create vite@latest
```

Durante la configuración:
1. **Nombre del proyecto**: `react-sample-intro` (o el nombre que prefieras)
2. **Framework**: Selecciona `React`
3. **Variante**: Elige `JavaScript` (si no estás usando TypeScript)

Luego, accede al directorio del proyecto e instala las dependencias:

```bash
cd react-sample-intro
npm install
npm run dev
```

Por defecto, el servidor de desarrollo se ejecutará en `http://localhost:5173`.

## Estructura básica del proyecto

Dentro de la carpeta `src/` encontrarás los archivos principales:

- `main.jsx` - Punto de entrada de la aplicación
- `App.jsx` - Tu primer componente principal
- `index.css` - Estilos base de la aplicación

## Ejemplo con componentes, props y estado

Vamos a crear una aplicación simple que incluye:
- Un componente `Saludo` que recibe un nombre mediante `props`
- Un componente `Contador` que utiliza el hook `useState`

### Patrón Contenedor/Presentación

Este patrón de diseño separa la lógica de la presentación:

- **Componente de presentación**: Solo muestra datos, recibe props y no maneja estado
- **Componente contenedor**: Maneja el estado y la lógica, y se lo pasa al componente de presentación

### Archivo: `src/App.jsx`

```jsx
import Saludo from './components/Saludo';
import ContadorContainer from './components/ContadorContainer';

function App() {
  return (
    <div style={{ padding: '2rem' }}>
      <Saludo nombre="Andru" />
      <ContadorContainer />
    </div>
  );
}

export default App;
```

### Componente presentacional: `src/components/Contador.jsx`

```jsx
function Contador({ contador, onSumar }) {
  return (
    <div>
      <p>Contador: {contador}</p>
      <button onClick={onSumar}>Sumar</button>
    </div>
  );
}

export default Contador;
```

### Componente contenedor: `src/components/ContadorContainer.jsx`

```jsx
import { useState } from 'react';
import Contador from './Contador';

function ContadorContainer() {
  const [contador, setContador] = useState(0);

  const manejarSuma = () => {
    setContador(prev => prev + 1);
  };

  return (
    <Contador contador={contador} onSumar={manejarSuma} />
  );
}

export default ContadorContainer;
```

## Ventajas del patrón Contenedor/Presentación

- Separa la interfaz de usuario de la lógica de negocio
- Facilita las pruebas del componente presentacional sin preocuparse por estados
- Permite reutilizar componentes presentacionales con diferentes lógicas (Redux, Context, etc.)

## Configuración de Vite

### Archivo: `vite.config.js`

Este archivo te permite personalizar el comportamiento de Vite:

```js
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  return {
    plugins: [react()],
    server: {
      port: parseInt(env.VITE_PORT) || 3000,
      open: true,
      hmr: {
        port: parseInt(env.VITE_HMR_PORT) || 3000,
      },
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
    define: {
      __APP_ENV__: JSON.stringify(env.VITE_APP_ENV),
    },
  };
});
```

### Uso del alias `@`

El alias `@` apunta a la carpeta `src`, lo que simplifica las importaciones:

En lugar de:
```js
import Saludo from '../../components/Saludo';
```

Puedes usar:
```js
import Saludo from '@/components/Saludo';
```

### Otras configuraciones útiles

1. **Base URL para despliegues en subdirectorios**:
```js
base: '/mi-proyecto/',
```

2. **Directorio de compilación**:
```js
build: {
  outDir: 'dist',
},
```

## Variables de entorno

### Configuración simple con `.env`

Crea un archivo `.env` en la raíz del proyecto:

```env
VITE_API_URL=https://mi-api.com
VITE_APP_NAME=MiAppReact
```

Todas las variables deben comenzar con `VITE_` para que Vite las exponga automáticamente.

### Uso en componentes

```jsx
const apiUrl = import.meta.env.VITE_API_URL;
console.log('La API está en:', apiUrl);
```

### Archivos .env específicos por entorno

Vite carga automáticamente según el modo de ejecución:

| Archivo               | Se usa cuando ejecutas        |
|----------------------|--------------------------------|
| `.env`               | Siempre                        |
| `.env.development`   | `npm run dev`                  |
| `.env.production`    | `npm run build` o `preview`    |
