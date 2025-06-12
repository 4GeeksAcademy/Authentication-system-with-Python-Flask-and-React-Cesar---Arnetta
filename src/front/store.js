

export const initialStore = () => {
  return {
    users: [
      {
        user_id: entero,
        email: "",
        password: "",
      },
    ],
  };
};

export default function storeReducer(store, action = {}) {
  switch (action.type) {
    case "LOGIN":
      localStorage.setItem("jwt-token", action.payload.token);
      return {
        ...store,
        auth: {
          token: action.payload.token,
          isAuthenticated: true,
        },
        user_data: action.payload.user_data,
      };

    case "LOGOUT":
      localStorage.removeItem("jwt-token");
      return {
        ...store,
        auth: {
          token: null,
          isAuthenticated: false,
        },
        user_data: null,
        selected_errand: null,
      };

    case "SET_USER_DATA": 
      return {
        ...store,
        user_data: {
          ...store.user_data,
          ...action.payload,
        },
      };

    default:
      return store;
  }
}
