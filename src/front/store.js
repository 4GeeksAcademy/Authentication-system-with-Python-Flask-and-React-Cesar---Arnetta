export const initialStore = () => {
  return {
    users: [
      {
        email: "",
        password: "",
      },
    ],
  };
};

export default function storeReducer(store, action = {}) {
  switch (action.type) {
    case "logUser":
      return {
        ...store,
        users: [...store.users, store.logUser],
      };
    default:
      throw Error("Unknown action.");
  }
}
