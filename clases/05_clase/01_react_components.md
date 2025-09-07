# Componentes en React - Fundamentos, Buenas Prácticas y Técnicas Avanzadas

## Índice
1. [¿Qué son los componentes?](#1-qué-son-los-componentes)
2. [Tipos de componentes](#2-tipos-de-componentes)
3. [Buenas prácticas esenciales](#3-buenas-prácticas-esenciales)
4. [Técnicas avanzadas](#4-técnicas-avanzadas)
5. [Patrones de diseño](#5-patrones-de-diseño)
6. [Performance y optimización](#6-performance-y-optimización)
7. [Testing y mantenibilidad](#7-testing-y-mantenibilidad)

---

## 1. ¿Qué son los componentes?

### Definición
Los componentes son los **bloques fundamentales** de las aplicaciones React. Son piezas independientes y reutilizables de UI que encapsulan:
- **Estructura** (HTML)
- **Comportamiento** (JavaScript)
- **Estilos** (CSS)

### Analogía de LEGO
```jsx
// Piezas pequeñas (componentes básicos)
<Button />
<Input />
<Card />

// Ensambles (componentes compuestos)
<Header />
<Sidebar />
<ProductGrid />

// Estructura completa (página)
<HomePage />
```

### Características principales
- **Reutilizables**: Un componente puede usarse múltiples veces
- **Componibles**: Los componentes pueden contener otros componentes
- **Aislados**: Cada componente maneja su propio estado y lógica
- **Testeables**: Fáciles de probar de forma aislada

---

## 2. Tipos de componentes

### Componentes funcionales (modernos)
```jsx
// Componente funcional básico
function Welcome({ name }) {
  return <h1>Hola, {name}!</h1>;
}

// Arrow function
const Welcome = ({ name }) => {
  return <h1>Hola, {name}!</h1>;
};

// Implicit return
const Welcome = ({ name }) => <h1>Hola, {name}!</h1>;
```

### Componentes de clase (legacy)
```jsx
class Welcome extends React.Component {
  render() {
    return <h1>Hola, {this.props.name}!</h1>;
  }
}
```

### Componentes presentacionales vs contenedores
```jsx
// Presentacional (Cómo se ve)
function UserCard({ user, onEdit, onDelete }) {
  return (
    <div className="user-card">
      <h3>{user.name}</h3>
      <p>{user.email}</p>
      <button onClick={() => onEdit(user.id)}>Editar</button>
      <button onClick={() => onDelete(user.id)}>Eliminar</button>
    </div>
  );
}

// Contenedor (Qué hace)
function UserListContainer() {
  const [users, setUsers] = useState([]);
  
  const handleEdit = (userId) => {
    // Lógica de edición
  };
  
  const handleDelete = (userId) => {
    // Lógica de eliminación
  };
  
  return (
    <div>
      {users.map(user => (
        <UserCard
          key={user.id}
          user={user}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      ))}
    </div>
  );
}
```

---

## 3. Buenas prácticas esenciales

### 3.1 Estructura de archivos
```
src/
  components/
    Button/
      index.js
      Button.jsx
      Button.module.css
      Button.test.js
    UserCard/
      index.js
      UserCard.jsx
      UserCard.module.css
      UserCard.test.js
```

### 3.2 Nomenclatura clara
```jsx
// ✅ Bien
<UserProfile />
<NavigationMenu />
<ProductCard />

// ❌ Mal
<Profile />
<Nav />
<Card />
```

### 3.3 Props bien definidas
```jsx
// Con destructuring
function UserCard({ user, onEdit, isLoading }) {
  // ...
}

// Con default props
UserCard.defaultProps = {
  isLoading: false,
  onEdit: () => {}
};

// Con PropTypes --> esto se fue deprecando por el uso de TypeScript
import PropTypes from 'prop-types';

UserCard.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired
  }).isRequired,
  onEdit: PropTypes.func,
  isLoading: PropTypes.bool
};
```

### 3.4 Key única en listas
```jsx
// ✅ Bien
{users.map(user => (
  <UserItem key={user.id} user={user} />
))}

// ❌ Mal
{users.map((user, index) => (
  <UserItem key={index} user={user} />
))}
```

### 3.5 Componentes puros
```jsx
// Evitar efectos secundarios en render
function UserList({ users }) {
  // ❌ Mal - efecto secundario durante render
  users.forEach(user => {
    console.log(user.name);
  });
  
  // ✅ Bien
  useEffect(() => {
    users.forEach(user => {
      console.log(user.name);
    });
  }, [users]);
  
  return (
    // ...
  );
}
```

---

## 4. Técnicas avanzadas

### 4.1 Custom Hooks
```jsx
// Hook personalizado para API calls
function useApi(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, loading, error };
}

// Uso en componente
function UserList() {
  const { data: users, loading, error } = useApi('/api/users');
  
  if (loading) return <Spinner />;
  if (error) return <ErrorMessage message={error} />;
  
  return (
    <div>
      {users.map(user => (
        <UserCard key={user.id} user={user} />
      ))}
    </div>
  );
}
```

### 4.2 Render Props
```jsx
function DataFetcher({ url, children }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(url)
      .then(response => response.json())
      .then(data => {
        setData(data);
        setLoading(false);
      });
  }, [url]);

  return children({ data, loading });
}

// Uso
<DataFetcher url="/api/users">
  {({ data, loading }) => (
    loading ? <Spinner /> : <UserList users={data} />
  )}
</DataFetcher>
```

### 4.3 Compound Components
```jsx
const AccordionContext = createContext();

function Accordion({ children }) {
  const [openIndex, setOpenIndex] = useState(-1);
  
  return (
    <AccordionContext.Provider value={{ openIndex, setOpenIndex }}>
      <div className="accordion">{children}</div>
    </AccordionContext.Provider>
  );
}

function AccordionItem({ children, index }) {
  const { openIndex, setOpenIndex } = useContext(AccordionContext);
  const isOpen = openIndex === index;
  
  return (
    <div className="accordion-item">
      {React.Children.map(children, child => 
        React.cloneElement(child, { isOpen, onClick: () => setOpenIndex(index) })
      )}
    </div>
  );
}

function AccordionHeader({ children, isOpen, onClick }) {
  return (
    <div className="accordion-header" onClick={onClick}>
      {children}
      <span>{isOpen ? '▼' : '►'}</span>
    </div>
  );
}

function AccordionContent({ children, isOpen }) {
  return isOpen ? <div className="accordion-content">{children}</div> : null;
}

// Uso
<Accordion>
  <AccordionItem index={0}>
    <AccordionHeader>Sección 1</AccordionHeader>
    <AccordionContent>Contenido 1</AccordionContent>
  </AccordionItem>
  <AccordionItem index={1}>
    <AccordionHeader>Sección 2</AccordionHeader>
    <AccordionContent>Contenido 2</AccordionContent>
  </AccordionItem>
</Accordion>
```

---

## 5. Patrones de diseño

### 5.1 Atomic Design
```jsx
// Átomos
function Button({ children, variant }) {
  return <button className={`btn btn-${variant}`}>{children}</button>;
}

// Moléculas
function SearchInput({ onSearch }) {
  const [query, setQuery] = useState('');
  
  return (
    <div className="search-input">
      <Input value={query} onChange={setQuery} />
      <Button onClick={() => onSearch(query)}>Buscar</Button>
    </div>
  );
}

// Organismos
function Header({ onSearch, user }) {
  return (
    <header className="header">
      <Logo />
      <SearchInput onSearch={onSearch} />
      <UserMenu user={user} />
    </header>
  );
}
```

### 5.2 Container/Presenter
```jsx
// Container (lógica)
function UserListContainer() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    const response = await fetch('/api/users');
    const data = await response.json();
    setUsers(data);
    setLoading(false);
  };

  return <UserListPresenter users={users} loading={loading} />;
}

// Presenter (UI)
function UserListPresenter({ users, loading }) {
  if (loading) return <Spinner />;
  
  return (
    <div>
      {users.map(user => (
        <UserCard key={user.id} user={user} />
      ))}
    </div>
  );
}
```

### 5.3 Higher-Order Components (HOC)
```jsx
function withLoading(WrappedComponent) {
  return function WithLoadingComponent({ isLoading, ...props }) {
    return isLoading ? <Spinner /> : <WrappedComponent {...props} />;
  };
}

// Uso
const UserListWithLoading = withLoading(UserList);

<UserListWithLoading isLoading={true} users={users} />
```

---

## 6. Performance y optimización

### 6.1 React.memo
```jsx
const UserCard = React.memo(function UserCard({ user, onEdit }) {
  return (
    <div>
      <h3>{user.name}</h3>
      <button onClick={() => onEdit(user.id)}>Editar</button>
    </div>
  );
});

// Solo se rerenderiza si las props cambian
```

### 6.2 useCallback y useMemo
```jsx
function UserList() {
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState('');
  
  // Evita recrear la función en cada render
  const handleEdit = useCallback((userId) => {
    // lógica de edición
  }, []);
  
  // Memoiza el cálculo costoso
  const filteredUsers = useMemo(() => {
    return users.filter(user => 
      user.name.toLowerCase().includes(filter.toLowerCase())
    );
  }, [users, filter]);
  
  return (
    <div>
      <input 
        value={filter} 
        onChange={(e) => setFilter(e.target.value)}
      />
      {filteredUsers.map(user => (
        <UserCard key={user.id} user={user} onEdit={handleEdit} />
      ))}
    </div>
  );
}
```

### 6.3 Lazy loading con React.lazy
```jsx
const LazyComponent = React.lazy(() => import('./HeavyComponent'));

function App() {
  return (
    <div>
      <Suspense fallback={<Spinner />}>
        <LazyComponent />
      </Suspense>
    </div>
  );
}
```

---

## 7. Testing y mantenibilidad *(se va a omitir pero seria super interesante verlo en algun momento)*

### 7.1 Testing con Jest y React Testing Library
```jsx
// UserCard.test.js
import { render, screen, fireEvent } from '@testing-library/react';
import UserCard from './UserCard';

test('renders user information', () => {
  const user = { id: 1, name: 'John Doe', email: 'john@example.com' };
  
  render(<UserCard user={user} />);
  
  expect(screen.getByText('John Doe')).toBeInTheDocument();
  expect(screen.getByText('john@example.com')).toBeInTheDocument();
});

test('calls onEdit when edit button is clicked', () => {
  const mockOnEdit = jest.fn();
  const user = { id: 1, name: 'John Doe' };
  
  render(<UserCard user={user} onEdit={mockOnEdit} />);
  
  fireEvent.click(screen.getByText('Editar'));
  
  expect(mockOnEdit).toHaveBeenCalledWith(1);
});
```

### 7.2 Documentación con Storybook
```jsx
// UserCard.stories.js
export default {
  title: 'Components/UserCard',
  component: UserCard,
};

const Template = (args) => <UserCard {...args} />;

export const Default = Template.bind({});
Default.args = {
  user: {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com'
  }
};

export const Loading = Template.bind({});
Loading.args = {
  isLoading: true
};
```

### 7.3 Principio de responsabilidad única
```jsx
// ❌ Mal - componente que hace demasiado
function UserDashboard() {
  // Lógica de usuarios
  // Lógica de estadísticas
  // Lógica de notificaciones
  // Lógica de preferencias
  
  return (
    // UI enorme y compleja
  );
}

// ✅ Bien - componentes separados
function UserDashboard() {
  return (
    <div>
      <UserProfile />
      <UserStats />
      <Notifications />
      <UserPreferences />
    </div>
  );
}
```

---

## 🎯 Resumen de mejores prácticas

### ✅ DOs
- **Nombres descriptivos** para componentes y props
- **Componentes pequeños** con responsabilidad única
- **Props drilling** vs Context para estado global
- **Custom Hooks** para lógica reutilizable
- **Testing** desde el inicio
- **Documentación** con Storybook
- **TypeScript** para tipos estáticos

### ❌ DON'Ts
- **Props en exceso** (más de 5-6 props)
- **Componentes gigantes** (más de 200 líneas)
- **Lógica en UI** separar concerns
- **Mutación directa** de estado y props
- **Index como key** en listas dinámicas
- **Efectos secundarios** durante render

### 📊 Métricas de calidad
- **Tamaño**: 50-150 líneas por componente
- **Props**: Máximo 5-6 props esenciales
- **Complexidad**: Baja complejidad ciclomática
- **Acoplamiento**: Bajo acoplamiento entre componentes
- **Cohesión**: Alta cohesión interna

Los componentes bien diseñados son la base de aplicaciones React mantenibles, escalables y performantes. La inversión en buenas prácticas desde el inicio paga dividendos en el largo plazo.
