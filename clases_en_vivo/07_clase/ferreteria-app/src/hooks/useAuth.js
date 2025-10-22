import { supabase } from "../lib/supabase"
import { useSessionStore } from "../store/sessionStore"

export function useAuth() {

    const setUser = useSessionStore(state => state.setUser)
    const logIn = async (email, password) => {
        let { data, error } = await supabase.auth.signInWithPassword({ email, password })

        if (error) {
            console.error("Error en la sesion", error)
            return
        }

        setUser(data.user)

    }


    const signUp = async (email, password) => {
        let { data, error } = await supabase.auth.signUp({ email, password })

        if (error) {
            console.error("Error al registrarse", error)
            return
        }

        setUser(data.user)
    }


    return { logIn, signUp }

}