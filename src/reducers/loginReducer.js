const initialState = {
  users: {},
  error: "",
  isLoading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case "GET_USERS":
      if (action.payload.length !== 0) {
        localStorage.setItem("userAuth", JSON.stringify(action.payload));
        console.log(localStorage.getItem("userAuth"));
      }

      return {
        ...state,
        users: action.payload,
      };
    case "LOGOUT":
      return {
        ...state,
        users: {},
      };

    case "ERROR_DATA":
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
}
