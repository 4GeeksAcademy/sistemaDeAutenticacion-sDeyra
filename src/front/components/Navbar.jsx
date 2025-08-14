import { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";

export const Navbar = () => {
	const navigate=useNavigate()
	const [token, setToken] = useState(localStorage.getItem("access_token"))

	const cerrarSesion = () => {
		localStorage.removeItem("access_token")
		localStorage.removeItem("usuario")
		setToken(null)
		navigate("/")
	}

	useEffect(() => {
		const handleStorageChange = () => {
			setToken(localStorage.getItem("access_token"));
		};

		// Escuchar cambios en localStorage (ej: cuando el login guarda el token)
		window.addEventListener("storage", handleStorageChange);

		// También revisar en cada render (opcional pero seguro)
		handleStorageChange();

		return () => {
			window.removeEventListener("storage", handleStorageChange);
		};
	}, [token]);

	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link to="/">
					<span className="navbar-brand mb-0 h1">React Boilerplate</span>
				</Link>
				{!token ? (
					<div className="ml-auto">
						<Link to="/demo">
							<button className="btn btn-primary mx-3">Iniciar sesión</button>
						</Link>
						<Link to="/register">
							<button className="btn btn-primary">Registrarse</button>
						</Link>
					</div>
				) :(
					<button onClick={cerrarSesion} className="btn btn-primary">Cerrar sesion</button>
				)}
			</div>
		</nav>
	);
};