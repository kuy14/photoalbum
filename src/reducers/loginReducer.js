const initialState = {
  users: {},
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

    default:
      return state;
  }
}
