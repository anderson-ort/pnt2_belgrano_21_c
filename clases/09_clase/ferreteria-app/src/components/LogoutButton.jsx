import { useAuth } from "../hooks/useAuth.js";
import { supabase } from "../lib/supabase.js";

const LogoutButton = () => {
	const { logout } = useAuth();

	const handleLogout = async () => {
		logout();
		console.log("Se ha cerrado la sesion");
	};

	return <button onClick={handleLogout}>Log Out</button>;
};

export default LogoutButton;
