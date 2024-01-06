import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import Students from "./components/Students";
import Home from "./components/Home";
import "./styles/global.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Students />,
  },
  {
    path: "/add",
    element: <Home />,
  },
  {
    path: "students/:id",
    element: <Home />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <div className="frame">
      <RouterProvider router={router}></RouterProvider>
    </div>
  </React.StrictMode>
);
