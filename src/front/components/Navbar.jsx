import { Link, useNavigate } from "react-router-dom";

export const Navbar = () => {

	const token = localStorage.getItem("jwt-token");

const navigate = useNavigate();

	const logOutNavbar = () => {
		localStorage.removeItem("jwt-token");
		navigate("/login");
	}

	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link to="/">
					<span className="navbar-brand mb-0 h1">Home</span>
				</Link>
				<div className="ms-auto d-flex gap-2">
					{token ?
						(<Link to="/miperfil">
							<button className="btn btn-outline-primary">Mi perfil</button>
						</Link>)
						:
						(null)
					}
					{token ?
						(<button type="button" className="btn btn-outline-danger" onClick={logOutNavbar}>Logout</button>)
						:
						(<Link to="/login">
							<button className="btn btn-outline-primary">Login</button>
						</Link>)
					}
				</div>
			</div>
		</nav>
	);
};