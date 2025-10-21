# Clase de Routing - Login - LogOut - Session

## 1. **Routing**

El *routing* es el mecanismo que permite que tu aplicación muestre distintas pantallas (componentes) según la URL actual.

Con **React Router**, lo básico se ve así:

```javascript
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}
```

Esto define las rutas `/` y `/login`.
Ahora, necesitamos proteger algunas rutas (por ejemplo, `/dashboard`) para que solo las vean usuarios autenticados.

---

## 2. **Protected Routing**

Un *protected route* es un componente que verifica si el usuario está logueado antes de mostrar el contenido.
Si no está logueado, lo redirige a `/login`.

```javascript
import { Navigate } from "react-router-dom";
import { useSessionStore } from "../store/sessionStore";

export function ProtectedRoute({ children }) {
  const { user } = useSessionStore();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
```

Uso:

```tsx
<Route
  path="/dashboard"
  element={
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  }
/>
```

De esta forma, si el usuario no tiene sesión, se lo manda al login.

---

## 3. **Login (con Supabase)**

Supabase maneja autenticación fácilmente. Primero, creás un cliente:

```javascript
import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_KEY
);
```

Luego, un ejemplo de login simple:

```javascript
import { supabase } from "../lib/supabase";
import { useSessionStore } from "../store/sessionStore";

export function Login() {
  const setUser = useSessionStore((state) => state.setUser);

  const handleLogin = async (e) => {
    e.preventDefault();
    const email = "user@example.com";
    const password = "password123";

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error("Error al iniciar sesión:", error.message);
      return;
    }

    setUser(data.user);
  };

  return <button onClick={handleLogin}>Iniciar sesión</button>;
}
```

---

## 4. **Mantener la sesión (con Zustand)**

Zustand nos sirve para manejar el estado global de la sesión.

```javascript
import { create } from "zustand";

interface SessionState {
  user: any;
  setUser: (user: any) => void;
  clearUser: () => void;
}

export const useSessionStore = create<SessionState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null }),
}));
```

Y además, podemos escuchar los cambios de sesión de Supabase para mantener sincronizado el estado:

```javascript
import { useEffect } from "react";
import { supabase } from "../lib/supabase";
import { useSessionStore } from "../store/sessionStore";

export function useAuthListener() {
  const setUser = useSessionStore((state) => state.setUser);
  const clearUser = useSessionStore((state) => state.clearUser);

  useEffect(() => {
    const { data: listener } = supabase.auth.onAuthStateChange((_, session) => {
      if (session?.user) {
        setUser(session.user);
      } else {
        clearUser();
      }
    });

    return () => listener.subscription.unsubscribe();
  }, []);
}
```

Esto mantiene el store actualizado si el usuario refresca la página o cambia su sesión.

---

## 5. **LogOut (borrar sesión)**

Cerrar sesión simplemente implica eliminar la sesión en Supabase y limpiar el estado global.

```javascript
import { supabase } from "../lib/supabase";
import { useSessionStore } from "../store/sessionStore";

export function LogoutButton() {
  const clearUser = useSessionStore((state) => state.clearUser);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    clearUser();
  };

  return <button onClick={handleLogout}>Cerrar sesión</button>;
}
```

---

## 6. **Resumen del flujo**

1. El usuario entra a la app.
2. Si no tiene sesión, lo manda al `/login`.
3. Hace login con Supabase → guardamos el `user` en Zustand.
4. Las rutas protegidas leen ese estado para dejarlo pasar o no.
5. Si hace logout, borramos la sesión de Supabase y el store.
