import { create } from 'zustand'


const userStorage =
    (set) => (
        {
            user: null,
            setUser: (user) => set({ user }),
            clearUser: (user) => set({ user: null })
        })

export const  useSessionStore = create(userStorage)
