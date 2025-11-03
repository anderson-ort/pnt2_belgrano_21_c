import { BrowserRouter } from "react-router";
import "./App.css";
import AppRoutes from "./routes";
import { useAuthListener } from "../hooks/useAuthListener";

const App = () => {
	// Supabase maneja internamente una sesión del usuario (guarda un token en localStorage y lo refresca automáticamente).
	useAuthListener();

	return (
		<BrowserRouter>
			<AppRoutes />
		</BrowserRouter>
	);
};

export default App;
