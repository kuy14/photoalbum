import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import rootReducer from "../reducers";
const user = JSON.parse(localStorage.getItem("userAuth"));
console.log(user);
const initialState = localStorage.getItem("userAuth")
  ? { login: { users: user } }
  : {};

const middleware = [thunk];

const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
