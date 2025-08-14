import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
	
	const [token,setToken]= useState(localStorage.getItem("access_token"))

	const cerrarSesion = () => {
		localStorage.removeItem("access_token")
		localStorage.removeItem("usuario")
		setToken("")
	}

	useEffect(() => {
		// token = localStorage.getItem("access_token")
	}, [token])
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
				) :
					<button onClick={cerrarSesion} className="btn btn-primary">Cerrar sesion</button>
				}
			</div>
		</nav>
	);
};