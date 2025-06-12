import { useState } from "react";
import { authenticationServices } from "../services/authenticationServices";
import { TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";

export const Login = () => {


  const navigate = useNavigate();

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isAuthenticating, setIsAuthenticating] = useState(false);

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
      setSuccessMessage("Login correcto ✅");
      setTimeout(() => {
        setSuccessMessage("");
        navigate("/");
      }, 1500);

    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      setErrorMessage("Credenciales inválidas. Por favor intenta de nuevo ❌");
      setTimeout(() => setErrorMessage(""), 1500);
    } finally {
      setIsAuthenticating(false);
    }
  };


  return (
    <div className="container py-4">
      <div className="p-5 mb-4 bg-body-tertiary rounded-3">
        <form onSubmit={handleSubmit}>
          <div className="container">
            {successMessage && (
              <div className="alert alert-success text-center" role="alert">
                {successMessage}
              </div>
            )}
            {errorMessage && (
              <div className="alert alert-danger text-center" role="alert">
                {errorMessage}
              </div>
            )}
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
              <button type="submit" className="btn btn-primary mt-2">Login</button>
              <button className="btn btn-primary mt-2" onClick={() => navigate("/signup")}>Signup</button>
            </ul>
          </div>
        </form>
      </div>
    </div>
  );
};