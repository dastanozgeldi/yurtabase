import React from "react";
import ReactDOM from "react-dom/client";
import Home from "./pages";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Table from "./pages/table";
import { NewTable } from "./pages/new";
import { UpdateTable } from "./pages/update";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/tables/:tableId",
    element: <Table />,
  },
  {
    path: "/new",
    element: <NewTable />,
  },
  {
    path: "/update/:tableId",
    element: <UpdateTable />,
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
