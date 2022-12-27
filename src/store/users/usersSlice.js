import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export let usersSlice = createSlice({
  name: "usersSlice",
  initialState: {
    userDetails: [],
  },
  reducers: {
    setUserDetails: (state, action) => {
      state.userDetails = action.payload;
    },
  },
});

export const loginWithGoogle =
  (credentials, navigate) => async (dispatch, getState) => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/users/login_with_google`,
        { credentials },
      );
      sessionStorage.setItem("token", "Bearer " + res.data.token);
      sessionStorage.setItem("userName", res.data.firstName);

      axios.defaults.headers.common["Authorization"] =
        "Bearer " + res.data.token;
      dispatch(setUserDetails(res.data));
      navigate("/items");
    } catch (error) {
      console.log("loginWithGoogle:", error);
    }
  };
export const loginHandler =
  (loginValues, navigate) => async (dispatch, getState) => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/users/login`,
        { loginValues },
      );
      if (res.data.status !== false) {
        sessionStorage.setItem("token", "Bearer " + res.data.token);
        sessionStorage.setItem("userName", res.data.firstName);
        axios.defaults.headers.common["Authorization"] =
          "Bearer " + res.data.token;
        dispatch(setUserDetails(res.data));
        navigate("/items");
      } else {
        alert(res.data.message);
      }
    } catch (error) {
      console.log("loginWithGoogle:", error);
    }
  };

export const { setUserDetails } = usersSlice.actions;

export default usersSlice.reducer;
