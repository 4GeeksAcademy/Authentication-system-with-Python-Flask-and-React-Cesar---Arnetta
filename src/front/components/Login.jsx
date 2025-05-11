import { useState } from "react";
import { authenticationServices } from "../services/authenticationServices";
import { TextField } from "@mui/material";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const Login = () => {

  const { store, dispatch } = useGlobalReducer();
  const [loginData, setLoginData] = useState(
    {
      email: "",
      password: ""
    }
  )

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const loginUser = {
        email: loginData.email.trim(),
        password: loginData.password.trim()
      }
     await authenticationServices.login(loginUser)
    }
    catch (error) {
      console.error('Error al agregar usuario:', error);
    }
  }

  const logOut = () => {
    console.log("Token antes de logout:", localStorage.getItem("jwt-token"))
    localStorage.removeItem("jwt-token");
    console.log("Token después de logout:", localStorage.getItem("jwt-token")); // debe ser null
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="container">
          <ul className="list-group">
            <TextField
              label="Email"
              variant="outlined"
              name="email"
              value={loginData.email}
              onChange={handleChange}
              fullWidth
              required
              type="email"
              helperText="Ingrese un correo electrónico válido"
            />
            <TextField
              label="Password"
              variant="outlined"
              name="password"
              value={loginData.password}
              onChange={handleChange}
              fullWidth
              required
              type="password"
            />
            <button type="submit" className="btn btn-primary">Login</button>

          </ul>
        </div>
      </form>
      <div>
        <button type="button" className="btn btn-primary" onClick={logOut}>Logout</button>
      </div>
    </>
  );
};