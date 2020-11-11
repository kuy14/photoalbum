import axios from "axios";

export const getUserAsync = (username, password) => (dispatch, getState) => {
  dispatch({
    type: "SET_LOADING",
    payload: true,
  });
  let endpoint = "";
  if (username.includes("@")) {
    endpoint = "https://jsonplaceholder.typicode.com/users?email=" + username;
  } else {
    endpoint =
      "https://jsonplaceholder.typicode.com/users?username=" + username;
  }
  if (password === "12345") {
    return axios
      .get(endpoint)
      .then((res) => {
        dispatch({
          type: "GET_USERS",
          payload: res.data,
        });
      })
      .catch((err) => {
        dispatch({
          type: "ERROR_DATA",
          payload: console.log(err),
        });
      })
      .finally(() => {
        dispatch({
          type: "SET_LOADING",
          payload: false,
        });
      });
  } else {
    dispatch({
      type: "ERROR_DATA",
      payload: { error: true, message: "Wrong Password!" },
    });
  }
};
