import { useState } from 'react';
const Navigator = () => {

    const user = useSessionStore(state => state.user);

    const isAuthenticated = !!user;

    const clearUser = useSessionStore(state => state.clearUser);

    if (!isAuthenticated) {
        return (
            <nav>
                <button onClick={handleLogin}>Login/SignUp</button>
                <span> | </span>
                <a href="/store">Store</a>
            </nav>
        );
    }

    return (
        <nav>
            <button onClick={handleLogout}>Logout</button>
            <span> | </span>
            <a href="/store">Store</a>
            <span> | </span>
            <a href="/dashboard">Dashboard</a>
        </nav>
    );
};

export default Navigator;
