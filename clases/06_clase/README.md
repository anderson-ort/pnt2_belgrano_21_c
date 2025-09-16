## Clase: Routing, Global Storage y Data Fetching en React

### Objetivos

* Entender el enrutamiento en una SPA con React Router.
* Implementar almacenamiento global con Zustand.
* Utilizar React Query para manejo de datos asincrónicos.
* Aplicar login, manejo de usuarios y autenticación.
* Usar Axios, json-server y linters como Biome.
* (Opcional) Introducción a Firebase o Supabase para autenticación real.

---

### 1. Setup del Proyecto

```bash
npm install react-router
npm install zustand
npm install @tanstack/react-query
npm install axios
npm install -g json-server@0.17.4
npm install --save-dev --save-exact @biomejs/biome
npx @biomejs/biome init

# Iniciar json-server Optional
npx json-server ./src/users.json --port 5000
```

---

### 2. Routing con React Router

* Rutas: `/`, `/login`, `/profile`
* Componentes: `<BrowserRouter>`, `<Routes>`, `<Route>`
* Actividad práctica:

  * Crear una app con 3 páginas enlazadas por rutas.
  * Agregar links de navegación.

---

### 3. Global Storage con Zustand

* Crear store de usuario (login/logout)
* Actividad práctica:

  * Guardar el usuario logueado en Zustand.
  * Mostrar datos en la barra de navegación.

---

### 4. Data Fetching con React Query

* Configurar `QueryClient` y `QueryClientProvider`
* Fetch de usuarios desde GitHub o `json-server`
* Actividad práctica:

  * Crear una tabla o lista de usuarios usando `useQuery`.

---

### 5. Login Básico y Validación

* Formulario de login con username y password
* Validación local o vía `json-server`
* Actividad práctica:

  * Validar usuario y guardar en Zustand
  * Redireccionar al profile si está logueado

---

### 6. Axios y Interceptors

* Configurar un `axiosInstance` centralizado
* Usar interceptor para agregar headers (ej. token)
* Actividad práctica:

  * Agregar un header falso para autenticación

---

### 7. (Opcional) Firebase / Supabase

* Demostración de autenticación con Firebase
* Conectar login con SDK de Firebase

---

### Propuesta de estructura de carpetas

```bash
├───components
│   ├───LandingPage
│   ├───Loader
│   ├───Login
│   ├───LogOut
│   ├───NavBtn
│   ├───NotFoundPage
│   ├───Profile
│   ├───RepositoryCard
│   └───SignUp
├───routes
├───_constants
├───_helpers
├───_hooks
└───_store
```
