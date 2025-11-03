
// Helper: Operaciones locales
const localAuth = {
    // este es el caso del fallback
    getUsers: () => {
        const users = localStorage.getItem('local-users');
        return users ? JSON.parse(users) : [];
    },

    saveUser: (user) => {
        const users = localAuth.getUsers();
        users.push(user);
        localStorage.setItem('local-users', JSON.stringify(users));
    },

    findUser: (email) => {
        const users = localAuth.getUsers();
        return users.find(u => u.email === email);
    },

    createMockToken: (userId) => {
        return btoa(JSON.stringify({
            userId,
            exp: Date.now() + 86400000 // 24 horas
        }));
    }
};

export default localAuth