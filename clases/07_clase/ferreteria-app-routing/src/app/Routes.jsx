// En este sector necesitamos organizar las routes y como se van a dirigiendo el usuario
// por ahora enfocaremos en los siguientes puntos:
// - login
// - logout
// - main-dashboard(o pagina principal)
// - para ello necesitamos una dependencia nueva: ReactRouter https://reactrouter.com/start/declarative/installation

import { Routes, Route, Navigate } from "react-router";

import ProtectedRoute from "../components/ProtectedRoute.jsx";
import Dashboard from "../pages/Dashboard.jsx";
import Login from "../pages/Login.jsx";
import Home from "../pages/Home.jsx";

const routesConfig = [
	{ path: "/", element: <Home />, protected: false },
	{ path: "/login", element: <Login />, protected: false },
	{ path: "/dashboard", element: <Dashboard />, protected: false },
];

const AppRoutes = () => {
	return (
		<Routes>
			{routesConfig.map((route) => (
				<Route
					key={route.path}
					path={route.path}
					element={
						route.protected ? (
							<ProtectedRoute>{route.element}</ProtectedRoute>
						) : (
							route.element
						)
					}
				/>
			))}
			<Route path="*" element={<Navigate to="/" replace />} />
		</Routes>
	);
};

export default AppRoutes;

// otra forma basica
// export function AppRoutes() {
//   return (
//     <Routes>
//       <Route path="/" element={<Home />} />
//       <Route path="/login" element={<Login />} />
//       <Route
//         path="/dashboard"
//         element={
//           <ProtectedRoute>
//             <Dashboard />
//           </ProtectedRoute>
//         }
//       />
//     </Routes>
//   );
// }
