import { useState } from "react";
import { authenticationServices } from "../services/authenticationServices";
import { TextField } from "@mui/material";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const SignUp = () => {

  const { store, dispatch } = useGlobalReducer();
  const [signUpData, setSignUpData] = useState(
    {
      email: "",
      password: ""
    }
  )

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignUpData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newUser = {
        email: signUpData.email.trim(),
        password: signUpData.password.trim()
      }
      await authenticationServices.signUp(newUser)
    }
    catch (error) {
      console.error('Error al agregar usuario:', error);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="container">
        <ul className="list-group">
          <TextField
            label="Email"
            variant="outlined"
            name="email"
            value={signUpData.email}
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
            value={signUpData.password}
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