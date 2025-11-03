import { NavLink } from "react-router";
import { useState } from "react";

import "../assets/styles/Login.css";
import { useAuth } from "../hooks/useAuth";

const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [isSignUp, setIsSignUp] = useState(false);

	const { login, signup } = useAuth();

	const handleSubmit = (e) => {
		e.preventDefault();
		if (isSignUp) {
			signup(email, password);
		} else {
			login(email, password);
		}
	};

	const toggleMode = () => {
		setIsSignUp(!isSignUp);
		setEmail("");
		setPassword("");
	};

	return (
		<div className="login-container">
			<form className="login-form" onSubmit={handleSubmit}>
				<h2 className="login-title">{isSignUp ? "Sign Up" : "Login"}</h2>

				<div className="input-group">
					<label className="input-label">Email</label>
					<input
						className="login-input"
						type="email"
						placeholder="tu@ferreteria.com.ar"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
					/>
				</div>

				<div className="input-group">
					<label className="input-label">Password</label>
					<input
						className="login-input"
						type="password"
						placeholder="••••••••"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
					/>
				</div>

				<button className="login-button" type="submit">
					{isSignUp ? "Sign Up" : "Log In"}
				</button>

				<p onClick={toggleMode}>
					{isSignUp
						? "¿Ya tenés cuenta? Iniciar sesión"
						: "¿No tenés cuenta? Registrate"}
				</p>

				<div>
					<NavLink to="/" replace>
						Home
					</NavLink>
				</div>
			</form>
		</div>
	);
};

export default Login;
