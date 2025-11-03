import { NavLink, useNavigate } from "react-router";
import { useSessionStore } from "../store/sessionStore";
import { useEffect } from "react";

const Home = () => {
	const { user } = useSessionStore();
	const navigate = useNavigate();
	useEffect(() => {
		// Si ya hay sesión activa, redirige automáticamente al dashboard
		if (user) {
			navigate("/dashboard", { replace: true });
		}
	}, [user, navigate]);

	return (
		<div>
			<h1>
				Ferreteria: <strong>andru-hardstore</strong>{" "}
			</h1>
			<p>Tu ferretería de confianza, con todo para tu proyecto.</p>
			{!user && <NavLink to="/login">Login</NavLink>}
		</div>
	);
};

export default Home;
