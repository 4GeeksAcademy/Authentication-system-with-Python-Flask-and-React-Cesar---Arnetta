const baseUrl = import.meta.env.VITE_BACKEND_URL;
console.log(baseUrl);

export const authenticationServices = {
  signUp: async ({ email, password }) => {
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
      console.log("API response:", response);
      console.log(response);
      return response;
    } catch (error) {}
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
      console.log("API response:", response);
      console.log(response);
      localStorage.setItem("jwt-token", response.token);
      return response;
    } catch (error) {}
  },

  getMyTask: async () => {
    // Retrieve token from localStorage
    const token = localStorage.getItem("jwt-token");
    console.log(token);
    
    try {
      const resp = await fetch(`https://silver-telegram-jjqx47v4x4973q664-3001.app.github.dev/api/private`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + token, // ⬅⬅⬅ authorization token
        },
      });
      if (resp.status === 403) {
        throw new Error("Missing or invalid token");
      }
      if (!resp.ok) {
        throw new Error("There was a problem in the request");
      }
      const data = await resp.json();
      console.log("This is the data you requested", data);
      return data;
    } catch (error) {}
  },
};

// const resp = await fetch(`https://your_api.com/token`, {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ username, password })
//      })

//      if(!resp.ok) throw Error("There was a problem in the login request")

//      if(resp.status === 401){
//           throw("Invalid credentials")
//      }
//      else if(resp.status === 400){
//           throw ("Invalid email or password format")
//      }
//      const data = await resp.json()
//      // Save your token in the localStorage
//      // Also you should set your user into the store using the setItem function
//      localStorage.setItem("jwt-token", data.token);

//      return data
