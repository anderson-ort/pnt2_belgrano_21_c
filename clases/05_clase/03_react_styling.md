
# Styling en React - Métodos y Mejores Prácticas

## Índice
1. [CSS tradicional](#1-css-tradicional)
2. [CSS Modules](#2-css-modules)
3. [Styled Components](#3-styled-components)
4. [CSS-in-JS con Emotion](#4-css-in-js-con-emotion)
5. [Framework CSS](#5-framework-css)
6. [Tailwind CSS](#6-tailwind-css)
7. [Comparativa y recomendaciones](#7-comparativa-y-recomendaciones)

---

## 1. CSS Tradicional

### Importación directa de CSS
```jsx
// Button.jsx
import './Button.css';

function Button({ children, variant = 'primary' }) {
  return (
    <button className={`btn btn-${variant}`}>
      {children}
    </button>
  );
}
```

```css
/* Button.css */
.btn {
  padding: 12px 24px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  transition: all 0.3s ease;
}

.btn-primary {
  background-color: #007bff;
  color: white;
}

.btn-primary:hover {
  background-color: #0056b3;
}

.btn-secondary {
  background-color: #6c757d;
  color: white;
}

.btn-secondary:hover {
  background-color: #545b62;
}
```

### Ventajas:
- ✅ Fácil de implementar
- ✅ Ampliamente compatible
- ✅ Herramientas maduras (SASS, LESS)

### Desventajas:
- ❌ Colisión de nombres
- ❌ Dificultad para mantener en proyectos grandes
- ❌ No hay scoping automático

---

## 2. CSS Modules

### Componente con CSS Module
```jsx
// Button.module.css
.button {
  padding: 12px 24px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}

.primary {
  composes: button;
  background-color: #007bff;
  color: white;
}

.primary:hover {
  background-color: #0056b3;
}
```

```jsx
// Button.jsx
import styles from './Button.module.css';

function Button({ children, variant = 'primary' }) {
  return (
    <button className={styles[variant]}>
      {children}
    </button>
  );
}
```

### Características:
- 🔒 Scoping automático de clases
- 🎯 Composición con `composes`
- 📦 Soporte nativo en Create React App

---

## 3. Styled Components

### Instalación
```bash
npm install styled-components
```

### Uso básico
```jsx
import styled from 'styled-components';

const StyledButton = styled.button`
  padding: 12px 24px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  background-color: ${props => 
    props.variant === 'primary' ? '#007bff' : '#6c757d'};
  color: white;
  transition: all 0.3s ease;

  &:hover {
    background-color: ${props => 
      props.variant === 'primary' ? '#0056b3' : '#545b62'};
  }

  ${props => props.disabled && `
    opacity: 0.6;
    cursor: not-allowed;
  `}
`;

function Button({ children, variant = 'primary', disabled }) {
  return (
    <StyledButton variant={variant} disabled={disabled}>
      {children}
    </StyledButton>
  );
}
```

### Componentes basados en props
```jsx
const Button = styled.button.attrs(props => ({
  type: props.type || 'button',
}))`
  /* Estilos base */
  padding: ${props => props.size === 'large' ? '16px 32px' : '12px 24px'};
  font-size: ${props => props.size === 'large' ? '18px' : '16px'};
  
  /* Variantes */
  ${props => {
    switch (props.variant) {
      case 'primary':
        return `
          background-color: #007bff;
          &:hover { background-color: #0056b3; }
        `;
      case 'secondary':
        return `
          background-color: #6c757d;
          &:hover { background-color: #545b62; }
        `;
      default:
        return `
          background-color: #f8f9fa;
          color: #212529;
          &:hover { background-color: #e2e6ea; }
        `;
    }
  }}
`;
```

### Theme Provider
```jsx
// theme.js
export const theme = {
  colors: {
    primary: '#007bff',
    secondary: '#6c757d',
    success: '#28a745',
    danger: '#dc3545'
  },
  spacing: {
    sm: '8px',
    md: '16px',
    lg: '24px'
  }
};

// App.jsx
import { ThemeProvider } from 'styled-components';
import { theme } from './theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <YourApp />
    </ThemeProvider>
  );
}

// Componente usando el theme
const ThemedButton = styled.button`
  background-color: ${props => props.theme.colors.primary};
  padding: ${props => props.theme.spacing.md} ${props => props.theme.spacing.lg};
`;
```

---

## 4. CSS-in-JS con Emotion

### Instalación
```bash
npm install @emotion/react @emotion/styled
```

### Uso con Emotion
```jsx
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

const buttonStyles = (variant, size) => css`
  padding: ${size === 'large' ? '16px 32px' : '12px 24px'};
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  background-color: ${variant === 'primary' ? '#007bff' : '#6c757d'};
  color: white;

  &:hover {
    background-color: ${variant === 'primary' ? '#0056b3' : '#545b62'};
  }
`;

function Button({ children, variant = 'primary', size = 'medium' }) {
  return (
    <button css={buttonStyles(variant, size)}>
      {children}
    </button>
  );
}
```

### Styled components con Emotion
```jsx
import styled from '@emotion/styled';

const EmotionButton = styled.button`
  padding: ${props => 
    props.size === 'large' ? '16px 32px' : '12px 24px'};
  background-color: ${props => props.theme.colors.primary};
  
  &:hover {
    background-color: ${props => props.theme.colors.primaryDark};
  }
`;
```

---

## 5. Framework CSS

### React Bootstrap
```bash
npm install react-bootstrap bootstrap
```

```jsx
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Card, Container } from 'react-bootstrap';

function App() {
  return (
    <Container>
      <Card>
        <Card.Body>
          <Card.Title>Componente con Bootstrap</Card.Title>
          <Button variant="primary" className="me-2">
            Primary
          </Button>
          <Button variant="outline-secondary">
            Secondary
          </Button>
        </Card.Body>
      </Card>
    </Container>
  );
}
```

### Material-UI
```bash
npm install @mui/material @emotion/react @emotion/styled
```

```jsx
import { Button, Container, Paper, Typography } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Container>
        <Paper elevation={3} sx={{ p: 3 }}>
          <Typography variant="h5" gutterBottom>
            Componente con Material-UI
          </Typography>
          <Button variant="contained" color="primary" sx={{ mr: 2 }}>
            Primary
          </Button>
          <Button variant="outlined" color="secondary">
            Secondary
          </Button>
        </Paper>
      </Container>
    </ThemeProvider>
  );
}
```

---

## 6. Tailwind CSS

### Instalación
```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

### Configuración
```js
// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

### Uso con React
```jsx
function Button({ children, variant = 'primary', size = 'md' }) {
  const baseClasses = "font-semibold rounded transition-colors";
  
  const variantClasses = {
    primary: "bg-blue-600 hover:bg-blue-700 text-white",
    secondary: "bg-gray-600 hover:bg-gray-700 text-white",
    outline: "border border-gray-300 hover:bg-gray-100 text-gray-700"
  };

  const sizeClasses = {
    sm: "px-3 py-1 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg"
  };

  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]}`;

  return (
    <button className={classes}>
      {children}
    </button>
  );
}

// Uso con clsx para manejo de clases condicionales
import clsx from 'clsx';

function Alert({ children, type = 'info', className }) {
  const alertClasses = clsx(
    'p-4 rounded border',
    {
      'bg-blue-100 border-blue-400 text-blue-700': type === 'info',
      'bg-green-100 border-green-400 text-green-700': type === 'success',
      'bg-red-100 border-red-400 text-red-700': type === 'error',
    },
    className
  );

  return (
    <div className={alertClasses}>
      {children}
    </div>
  );
}
```

---

## 7. Comparativa y Recomendaciones

### 📊 Tabla Comparativa

| Método | Scoping | Dinamismo | Bundle Size | Learning Curve |
|--------|---------|-----------|-------------|----------------|
| CSS Tradicional | ❌ Manual | ❌ Limitado | 🟢 Bajo | 🟢 Fácil |
| CSS Modules | 🟢 Automático | 🟡 Medio | 🟢 Bajo | 🟢 Fácil |
| Styled Components | 🟢 Automático | 🟢 Alto | 🟡 Medio | 🟡 Medio |
| Emotion | 🟢 Automático | 🟢 Alto | 🟡 Medio | 🟡 Medio |
| Framework CSS | ❌ Global | 🟡 Medio | 🔴 Alto | 🟢 Fácil |
| Tailwind CSS | 🟢 Automático | 🟢 Alto | 🟢 Bajo | 🟡 Medio |

### 🎯 Recomendaciones por caso de uso

1. **Proyectos pequeños**: CSS Modules o CSS tradicional
2. **Componentes dinámicos**: Styled Components o Emotion
3. **Prototipado rápido**: Framework CSS (Bootstrap/Material-UI)
4. **Performance crítica**: CSS Modules o Tailwind CSS
5. **Design system**: Styled Components + Theme Provider
6. **Equipos grandes**: CSS Modules o Styled Components

### 🚀 Mejores Prácticas

1. **Consistencia**: Elige un método y manténlo en todo el proyecto
2. **Performance**: Evita estilos dinámicos en componentes que se renderizan frecuentemente
3. **Mantenibilidad**: Usar variables CSS o theme para colores y spacing
4. **Accesibilidad**: No sacrificar accesibilidad por estética

### 🔧 Herramientas útiles

```bash
# Para CSS Modules
npm install clsx  # Manejo de clases condicionales

# Para Styled Components
npm install styled-components
npm install -D babel-plugin-styled-components

# Para Tailwind
npm install -D tailwindcss postcss autoprefixer
npm install clsx

# Para Emotion
npm install @emotion/react @emotion/styled
```

### 📝 Ejemplo de configuración optimizada

```jsx
// styled-components con theme avanzado
export const theme = {
  colors: {
    primary: {
      50: '#eff6ff',
      100: '#dbeafe',
      // ... escala completa
      900: '#1e3a8a'
    }
  },
  spacing: (factor) => `${0.25 * factor}rem`,
  breakpoints: {
    mobile: '480px',
    tablet: '768px',
    desktop: '1024px'
  }
};

// Componente responsive con styled-components
const ResponsiveCard = styled.div`
  padding: ${props => props.theme.spacing(4)};
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);

  @media (min-width: ${props => props.theme.breakpoints.tablet}) {
    padding: ${props => props.theme.spacing(6)};
  }

  @media (min-width: ${props => props.theme.breakpoints.desktop}) {
    padding: ${props => props.theme.spacing(8)};
  }
`;
```

