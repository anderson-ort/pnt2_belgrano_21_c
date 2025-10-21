import { useNavigate } from "react-router";
import { useSessionStore } from "../store/sessionStore";
import { supabase } from "../lib/supabase";

export function useAuth() {
	const setUser = useSessionStore((state) => state.setUser);
	const clearUser = useSessionStore((state) => state.clearUser);
	const navigate = useNavigate();

	const login = async (email, password) => {
		const { data, error } = await supabase.auth.signInWithPassword({
			email,
			password,
		});

		if (error) {
			console.error("Error al iniciar sesión:", error.message);
			alert("Error: " + error.message);
			return;
		}

		setUser(data.user);
		navigate("/dashboard");
	};

	const signup = async (email, password) => {
		console.log("Datos ingresados");
		console.log({ email, password });

		const { data, error } = await supabase.auth.signUp({
			email,
			password,
		});

		if (error) {
			console.error("Error al registrarse:", error.message);
			alert("Error: " + error.message);
			return;
		}

		// Algunos flujos requieren confirmación por email.
		// Si Supabase ya devuelve el usuario activo, lo guardamos:
		if (data.user) {
			setUser(data.user);
			navigate("/dashboard");
		}
	};

	const logout = async () => {
		await supabase.auth.signOut();
		clearUser();
		navigate("/login");
	};

	return {
		login,
		signup,
		logout,
	};
}
