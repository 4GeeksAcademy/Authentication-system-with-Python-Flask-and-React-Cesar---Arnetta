const baseUrl = import.meta.env.VITE_BACKEND_URL;

export const authenticationServices = {
  signup: async ({ email, password }) => {
    try {
      const request = await fetch(
        `https://silver-telegram-jjqx47v4x4973q664-3001.app.github.dev/api/user/create`,
        {
          method: "POST",
          headers: {
            accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );
      const response = await request.json();
      return response;
    } catch (error) {
      console.error("Error al crear cuenta:", error);
      throw error;
    }
  },

  login: async ({ email, password }) => {
    try {
      const request = await fetch(
        `https://silver-telegram-jjqx47v4x4973q664-3001.app.github.dev/api/user/login`,
        {
          method: "POST",
          headers: {
            accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );
      const response = await request.json();
      localStorage.setItem("jwt-token", response.token);
      return response;
    } catch (error) {
      console.error("Error en login:", error);
      throw error;
    }
  },

  getPrivateInfo: async () => {
    const token = localStorage.getItem("jwt-token");

    try {
      const response = await fetch(
        `https://silver-telegram-jjqx47v4x4973q664-3001.app.github.dev/api/private`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        }
      );
      if (response.status === 403) {
        throw new Error("Missing or invalid token");
      }
      if (!response.ok) {
        throw new Error("There was a problem in the request");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error en traer info:", error);
      throw error;
    }
  },
};
