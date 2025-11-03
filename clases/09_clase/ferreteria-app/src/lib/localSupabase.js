const createMockClient = () => {
    console.warn('FallBack LocalSupabase');

    const mockUsers = [];

    return {
        auth: {
            signUp: async ({ email }) => ({
                data: {
                    user: { id: crypto.randomUUID(), email },
                    session: { access_token: 'mock-token' }
                },
                error: null
            }),

            signInWithPassword: async ({ email }) => ({
                data: {
                    user: { id: crypto.randomUUID(), email },
                    session: { access_token: 'mock-token' }
                },
                error: null
            }),

            signOut: async () => ({ error: null }),

            getSession: async () => ({
                data: { session: null },
                error: null
            }),

            onAuthStateChange: (callback) => ({
                data: {
                    subscription: { unsubscribe: () => { } }
                }
            })
        },

        from: () => ({
            select: () => ({ data: [], error: null }),
            insert: () => ({ data: {}, error: null }),
            update: () => ({ data: {}, error: null }),
            delete: () => ({ data: null, error: null })
        })
    };
};

export default createMockClient