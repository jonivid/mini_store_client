import { configureStore } from "@reduxjs/toolkit";
// import thunkMiddleware from "redux-thunk";
// import { composeWithDevTools } from "redux-devtools-extension";
import itemsSlice from "./items/itemSlice";

export const store = configureStore({
  reducer: { itemsSlice: itemsSlice },
});
