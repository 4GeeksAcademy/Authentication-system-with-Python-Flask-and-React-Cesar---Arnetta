// Import necessary components from react-router-dom and other parts of the application.
import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";  // Custom hook for accessing the global state.
import React, { useEffect, useState } from 'react';
import { authenticationServices } from "../services/authenticationServices";

export const Demo = () => {
  // Access the global state and dispatch function using the useGlobalReducer hook.
  const { store, dispatch } = useGlobalReducer()

  const tokenExist = localStorage.getItem("jwt-token")

  const [userData, setUserData] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const data = await authenticationServices.getMyTask(); 
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
    <div className="container">
      <div>
        {tokenExist ?
          (<p>{userData.message}</p>)
          :
          (<p> Debes loguearte</p>)
        }
      </div>
      <Link to="/">
        <button className="btn btn-primary">Back home</button>
      </Link>
    </div>
  );
};
