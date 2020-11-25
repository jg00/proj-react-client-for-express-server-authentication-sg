import axios from "axios";
import { AUTH_USER, AUTH_ERROR } from "./types";

// Sign Up
export const signup = (formProps, callback) => async (dispatch) => {
  // 1 async request
  try {
    const response = await axios.post(
      "http://localhost:3090/signup",
      formProps
    ); // Send POST request but will see CORS issue. Cross Origin Resource Sharing.  Browser restriction.
    // We expect a token in exchange for email/password to signup.

    // 2 dispatch
    dispatch({ type: AUTH_USER, payload: response.data.token });

    // 3 persist local state. Upon refresh make sure to localStorage.getItem('token') and set redux store initial state inside src/index.js.
    localStorage.setItem("token", response.data.token);

    // 4 auto redirect after sign up
    callback();
  } catch (e) {
    dispatch({ type: AUTH_ERROR, payload: "Email in use" });
  }
};

// Sign Out - normal sync code - two steps - clear local storage token, update redux state
export const signout = () => {
  localStorage.removeItem("token");

  return {
    type: AUTH_USER,
    payload: "",
  };
};

// Sign In
export const signin = (formProps, callback) => async (dispatch) => {
  // 1 async request
  try {
    const response = await axios.post(
      "http://localhost:3090/signin",
      formProps
    ); // Send POST request but will see CORS issue. Cross Origin Resource Sharing.  Browser restriction.
    // We expect a token in exchange for email/password to signin.

    // 2 dispatch
    dispatch({ type: AUTH_USER, payload: response.data.token });

    // 3 persist local state. Upon refresh make sure to localStorage.getItem('token') and set redux store initial state inside src/index.js.
    localStorage.setItem("token", response.data.token);

    // 4 auto redirect after sign up
    callback();
  } catch (e) {
    dispatch({ type: AUTH_ERROR, payload: "Invalid login credentials" });
  }
};

// redux-thunk middleware allows us to return different value types from our action creators.
// formProps object: { email, password }
