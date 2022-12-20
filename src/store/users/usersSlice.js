import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export let usersSlice = createSlice({
  name: "usersSlice",
  initialState: {},
  reducers: {},
});

export const loginWithGoogle = (userDetails) => async (dispatch, getState) => {
  console.log(userDetails);
  try {
    const res = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/users/login_with_google`,
      {userDetails},
    );
  } catch (error) {
    console.log("loginWithGoogle:", error);
  }
};

export const {} = usersSlice.actions;

export default usersSlice.reducer;
