import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { store } from "./store/index";
import { Provider } from "react-redux";
// import {
//   BrowserRouter,

// } from "react-router-dom";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./components/errorPage/ErrorPage";
import { Home } from "./components/home/Home";
import HomeLayout from "./components/homeLayout/HomeLayout";
import { ItemsLayout } from "./components/itemsLayout/ItemsLayout";
import { ItemCardDetails } from "./components/itemCardDetails/ItemCardDetails";

const root = ReactDOM.createRoot(document.getElementById("root"));
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/items",
        element: <ItemsLayout />,
      },
      {
        path: "/items/:id",
        element: <ItemCardDetails />,
      },
    ],
  },
]);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      {/* <BrowserRouter>
        <App />
      </BrowserRouter> */}
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
