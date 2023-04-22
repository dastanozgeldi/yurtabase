import React from "react";
import ReactDOM from "react-dom/client";
import Home from "./pages";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Table from "./pages/table";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/tables/:table",
    element: <Table />,
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
