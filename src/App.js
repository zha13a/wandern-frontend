import React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Pages/Home/Home.js";
import "./App.css";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  },
  {
    path: "/home",
    element: <div>123</div>
  }
]);

const App = () => ( 
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

export default App;
