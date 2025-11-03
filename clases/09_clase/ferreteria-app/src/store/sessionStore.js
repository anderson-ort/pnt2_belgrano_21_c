// esta es la que se encarga de manejar la sesion glopbal del usuario con zustand
// libreria: https://zustand-demo.pmnd.rs/

import { create } from "zustand";

/**
 * STORE DE SESIÓN DEL USUARIO
 *
 * Este store centraliza el estado global de autenticación de la aplicación
 * utilizando Zustand como solución de estado management.
 *
 * IMPORTANCIA:
 * - Evita prop drilling (pasar props por múltiples componentes)
 * - Proporciona un único punto de verdad para el estado del usuario
 * - Permite acceso al estado desde cualquier componente sin necesidad de context providers anidados
 * - Es más ligero y simple que Redux para casos de uso medianos
 */

export const useSessionStore = create((set) => ({
	/**
	 * ESTADO: user
	 *
	 * Almacena la información del usuario autenticado
	 * - null: usuario no autenticado
	 * - objeto: usuario autenticado con sus datos
	 *
	 * ESTRUCTURA TÍPICA:
	 * {
	 *   id: string,
	 *   email: string,
	 *   name: string,
	 *   avatar_url: string
	 * }
	 */
	user: null,

	/**
	 * ACCIÓN: setUser
	 *
	 * Actualiza el estado del usuario cuando:
	 * - El usuario inicia sesión exitosamente
	 * - Se recupera la sesión desde localStorage/Supabase
	 * - Se actualizan los datos del usuario
	 *
	 */
	setUser: (user) => set({ user }),

	/**
	 * ACCIÓN: clearUser
	 *
	 * Limpia el estado del usuario cuando:
	 * - El usuario cierra sesión
	 * - El token expira
	 * - Ocurre un error de autenticación
	 *
	 * IMPORTANCIA: Previene acceso a rutas protegidas y limpia la UI
	 */
	clearUser: () => set({ user: null }),

	/**
	 * Por si tengamos que actualizar el nuevo valor de informacion del usuario
	 * updateUserProfile - Actualiza parcialmente los datos del usuario
	 *
	 */
	updateUserProfile: (updates) =>
		set((state) => ({
			user: state.user ? { ...state.user, ...updates } : null,
		})),
}));
