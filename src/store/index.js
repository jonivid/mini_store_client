import { configureStore } from "@reduxjs/toolkit";
// import thunkMiddleware from "redux-thunk";
// import { composeWithDevTools } from "redux-devtools-extension";
import itemsSlice from "./items/itemSlice";
import usersSlice from "./users/usersSlice";

export const store = configureStore({
  reducer: {
    itemsSlice: itemsSlice,
    usersSlice: usersSlice,
  },
});
