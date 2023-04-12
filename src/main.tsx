import React from "react";
import ReactDOM from "react-dom/client";
// import App from './App'
import "./index.css";

import HomePage from "./page/home/Home";
import ErrorPage from "./page/error";
import DeatilPage from "./page/deatil-page";
import ResultPage from "./page/result-page";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import NearbyPage from './page/nearby-page'

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    children: [
      {
        path: "",
      },
    ],
  },
  {
    path: "/detail",
    element: <DeatilPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/result/:keyword",
    element: <ResultPage />,
    errorElement: <ErrorPage />,
  },
]);
// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <HomePage/>,
//     errorElement:<ErrorPage/>
//   },
//    {
//     path: "/detail",
//     element: <DeatilPage/>,
//     errorElement:<ErrorPage/>
//   },
//   {
//     path: "/nearby",
//     element: <NearbyPage/>,
//     errorElement:<ErrorPage/>
//   },
// ]);
const rootElement = document.getElementById("root");
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>{<RouterProvider router={router} />}</React.StrictMode>
  );
}

// ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//     <RouterProvider router={router}/>
//   </React.StrictMode>,
// )
