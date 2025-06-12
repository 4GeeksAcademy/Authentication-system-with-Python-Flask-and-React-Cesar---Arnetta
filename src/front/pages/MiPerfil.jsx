import { Link } from "react-router-dom";
import { useEffect, useState } from 'react';
import { authenticationServices } from "../services/authenticationServices";

export const MiPerfil = () => {
  const tokenExist = localStorage.getItem("jwt-token")

  const [userData, setUserData] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const data = await authenticationServices.getPrivateInfo();
        setUserData(data);
      } catch (err) {
        console.error("Error al obtener los datos:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchUserData();
  }, [tokenExist]);

  if (loading) {
    return <p className="text-center">Cargando...</p>;
  }

  return (
    <div className="container py-4">
      <div className="p-5 mb-4 bg-body-tertiary rounded-3">
        <div className="container">
          <div>
            {tokenExist ?
              (<>
                <p className="fs-4 text-center fw-bold">Datos de perfil. Esta es una ruta privada</p>
                <p className="fs-5 text-center border border-primary">Correo: {userData.message}</p>
              </>)
              :
              (<p className="fs-4 text-center fw-bold">Debes iniciar sesión</p>)
            }
          </div >
          <Link className="d-flex justify-content-center" to="/">
            <button className="btn btn-primary">Back home</button>
          </Link>
        </div>
      </div>
    </div>
  );
};
