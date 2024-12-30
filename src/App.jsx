import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import AppLayout from "./Layout/AppLayout";
import Landing from "./Pages/Landing";
import Auth from "./Pages/Auth";
import Dashboard from "./Pages/Dashboard";
import Link from "./Pages/Link";
import Redirectlink from "./Pages/Redirect-link";
import UrlProvider from "./Context/Context";
import Requireauth from "./Componets/Require-auth";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Landing />,
      },
      {
        path: "/auth",
        element: <Auth />,
      },
      {
        path: "/deshboard",
        element: (
          <Requireauth>
            <Dashboard />
          </Requireauth>
        ),
      },
      {
        path: "/link/:id",
        element: (
          <Requireauth>
            <Link />
          </Requireauth>
        ),
      },
      {
        path: "/:id",
        element: <Redirectlink />,
      },
    ],
  },
]);

const App = () => {
  return (
    <UrlProvider>
      <RouterProvider router={router} />;
    </UrlProvider>
  );
};

export default App;
