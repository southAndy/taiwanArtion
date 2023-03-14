import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

import HomePage from './page/home/home'
import './index.css'

import ErrorPage from './page/error'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage/>,
    errorElement:<ErrorPage/>
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>    
  </React.StrictMode>,
)
