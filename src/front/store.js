
// En realidad en este proyecto no se usa dipatch de datos del usuario al store. Sin embargo como la plantilla está diseñada
// para recibir un store se ha generado un store borrador  

export const initialStore = () => {
  return {
    auth: {
      isAuthenticated: false,
    },
    user_data: null,
  };
};

export default function storeReducer(store, action = {}) {
  switch (action.type) {
    case "LOGIN":
      return {
        ...store,
        auth: {
          isAuthenticated: true,
        },
        user_data: action.payload.user_data,
      };

    case "LOGOUT":
      return {
        ...store,
        auth: {
          isAuthenticated: false,
        },
        user_data: null,
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
