import LogoutButton from "../components/LogoutButton";
import { useSessionStore } from "../store/sessionStore";

const Dashboard = () => {
	const { user } = useSessionStore();

	return (
		<>
			{user ? (
				<>
					<h2>
						Bienvenido, <strong>{user.email}</strong>
					</h2>
					<div>Panel principal de la ferretería</div>
					<LogoutButton />
				</>
			) : (
				<h2>No tenés una sesión activa</h2>
			)}
		</>
	);
};

export default Dashboard;
