import { useNavigate } from "react-router-dom";

export const Home = () => {

	  const navigate = useNavigate();

	return (
		<div className="container py-4">
			<div className="p-5 mb-4 bg-body-tertiary rounded-3">
				<div className="container-fluid py-5">
					<h1 className="display-5 fw-bold">Proyecto de autenticación</h1>
					<p className="col-md-12 fs-4">Prueba iniciar sesión en el barra de navegación o en este botón que te dejamos a continuación.
						¿No tienes usuario? Dentro del login podrás crear uno, sino igual te dejamos el botón para cerar el usuario</p>
					<button className="btn btn-primary btn-lg m-2" onClick={() => navigate("/login")}>Login</button>
					<button className="btn btn-primary btn-lg m-2" onClick={() => navigate("/signup")}>Signup</button>
				</div>
			</div>
		</div>
	);
}; 