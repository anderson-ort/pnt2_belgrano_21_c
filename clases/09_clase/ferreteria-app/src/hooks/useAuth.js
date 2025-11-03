import { useNavigate } from "react-router";
import { useSessionStore } from "../store/sessionStore";
import { supabase } from "../lib/supabase";
import { useState } from "react";
import localAuth from "../lib/localSessionFallBack";



export function useAuth() {
	// recupero las acciones del global storage zustand

	const setUser = useSessionStore((state) => state.setUser);
	const clearUser = useSessionStore((state) => state.clearUser);
	const navigate = useNavigate();

	const [isOfflineMode, setIsOfflineMode] = useState(false);

	// Helper: Valida si tenemos conexion con supabase
	const checkSupabaseConnection = async () => {
		try {
			await supabase.auth.getSession();
			return true;
		} catch (error) {
			console.warn("Supabase no disponible:", error);
			return false;
		}
	};

	const login = async (email, password) => {
		const isSupabaseAvailable = await checkSupabaseConnection();

		if (!isSupabaseAvailable) {
			await loginOffline(email, password);
			return
		}


		try {
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
			setIsOfflineMode(false);
			navigate("/dashboard");

		} catch (error) {
			console.error("Error de conexión:", error);
			await loginOffline(email, password);
		}
	};

	const loginOffline = async (email, password) => {
		setIsOfflineMode(true);

		let user = localAuth.findUser(email);

		if (!user) {
			// Auto-crear usuario en modo demo si no existe
			user = {
				id: crypto.randomUUID(),
				email,
				created_at: new Date().toISOString(),
				app_metadata: {},
				user_metadata: {},
			};
			localAuth.saveUser(user);
			console.log("✅ Usuario creado en modo offline");
		}


		const mockUser = {
			...user,
			access_token: localAuth.createMockToken(user.id)
		};

		setUser(mockUser);
		alert("Sesión iniciada en MODO OFFLINE\nLos datos se guardan localmente.");
		navigate("/dashboard");
	};

	const signup = async (email, password) => {

		const isSupabaseAvailable = await checkSupabaseConnection();

		if (!isSupabaseAvailable) {
			await signupOffline(email, password);
			return
		}

		try {
			const { data, error } = await supabase.auth.signUp({
				email,
				password,
			});

			if (error) {
				console.error("Error al registrarse:", error.message);
				alert("Error: " + error.message);
				return;
			}

			if (data.user) {
				setUser(data.user);
				setIsOfflineMode(false);
				navigate("/dashboard");
			}

		} catch (error) {
			console.error("Error de conexión:", error);
			await signupOffline(email, password);
		}

	};

	const signupOffline = async (email, password) => {
		setIsOfflineMode(true);

		const existingUser = localAuth.findUser(email);
		if (existingUser) {
			alert("Error: El email ya está registrado (localmente)");
			return;
		}

		const newUser = {
			id: crypto.randomUUID(),
			email,
			created_at: new Date().toISOString(),
			app_metadata: {},
			user_metadata: {},
			access_token: localAuth.createMockToken(crypto.randomUUID())
		};

		localAuth.saveUser(newUser);
		setUser(newUser);

		alert("Usuario registrado en MODO OFFLINE\nLos datos se guardan localmente.");
		navigate("/dashboard");
	};

	const logout = async () => {
		const isSupabaseAvailable = await checkSupabaseConnection();

		if (isSupabaseAvailable && !isOfflineMode) {
			try {
				await supabase.auth.signOut();
			} catch (error) {
				console.warn("No se pudo cerrar sesión en Supabase:", error);
			}
		}

		clearUser();
		setIsOfflineMode(false);
		navigate("/login");
	};

	return {
		login,
		signup,
		logout,
		isOfflineMode
	};
}
// Que pasa si no hay conexion, necesito de alguna manera
// hacer algun fallback, por si no exista conexion con el backend

// export function useAuth() {
// 	const setUser = useSessionStore((state) => state.setUser);
// 	const clearUser = useSessionStore((state) => state.clearUser);
// 	const navigate = useNavigate();

// 	const login = async (email, password) => {
// 		const { data, error } = await supabase.auth.signInWithPassword({
// 			email,
// 			password,
// 		});

// 		if (error) {
// 			console.error("Error al iniciar sesión:", error.message);
// 			alert("Error: " + error.message);
// 			return;
// 		}

// 		setUser(data.user);
// 		navigate("/dashboard");
// 	};

// 	const signup = async (email, password) => {
// 		console.log("Datos ingresados");
// 		console.log({ email, password });

// 		const { data, error } = await supabase.auth.signUp({
// 			email,
// 			password,
// 		});

// 		if (error) {
// 			console.error("Error al registrarse:", error.message);
// 			alert("Error: " + error.message);
// 			return;
// 		}

// 		// Algunos flujos requieren confirmación por email.
// 		// Si Supabase ya devuelve el usuario activo, lo guardamos:
// 		if (data.user) {
// 			setUser(data.user);
// 			navigate("/dashboard");
// 		}
// 	};

// 	const logout = async () => {
// 		await supabase.auth.signOut();
// 		clearUser();
// 		navigate("/login");
// 	};

// 	return {
// 		login,
// 		signup,
// 		logout,
// 	};
// }
