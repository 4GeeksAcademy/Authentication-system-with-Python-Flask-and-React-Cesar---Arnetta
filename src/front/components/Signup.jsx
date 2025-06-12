import { useState } from "react";
import { authenticationServices } from "../services/authenticationServices";
import { TextField } from "@mui/material";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const Signup = () => {

  const { store, dispatch } = useGlobalReducer();

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [signupData, setSignupData] = useState(
    {
      email: "",
      password: ""
    }
  )

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignupData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newUser = {
        email: signupData.email.trim(),
        password: signupData.password.trim()
      }
      await authenticationServices.signup(newUser)
      setSuccessMessage("Haz credo tu cuenta ✅");
      setTimeout(() => {
        setSuccessMessage("");
        navigate("/");
      }, 1500);
    }
    catch (error) {
      console.error('Error al agregar usuario:', error);
      setErrorMessage("Error al crear cuenta. Por favor intenta de nuevo ❌");
      setTimeout(() => setErrorMessage(""), 1500);
    }
  }

  return (
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
            value={signupData.email}
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
            value={signupData.password}
            onChange={handleChange}
            fullWidth
            required
            type="password"
          />
          <button type="submit" className="btn btn-primary">Submit</button>
        </ul>
      </div>
    </form>
  );
};