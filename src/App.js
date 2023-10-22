import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from "./Pages/Home/Home.js";
import Nodes from "./Pages/Nodes/Nodes.js";
import NodeInformation from "./Pages/NodeInformation/NodeInformation.js";
import Services from "./Pages/Services/Services.js";
import UserGroups from "./Pages/UserGroups/UserGroups.js";

import "./App.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  },
  {
    path: "/nodes/all",
    element: <Nodes />
  },
  {
    path: "/node/:nodeId",
    element: <NodeInformation />
  },
  {
    path: "/services",
    element: <Services />
  },
  {
    path: "/groups",
    element: <UserGroups />
  }
]);

const App = () => ( 
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

export default App;
