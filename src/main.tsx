import React from 'react'
import ReactDOM from 'react-dom/client'
// import App from './App'
import './index.css'

// import HomePage from './page/home/home'

// import ErrorPage from './page/error'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
// import DeatilPage from './page/deatil-page'
// import NearbyPage from './page/nearby-page'

const router = createBrowserRouter([
  {
    path:'/',
    element:<>123</>
  }
])
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
const rootElement = document.getElementById('root');
if(rootElement){
  ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <div>123</div>
    {/* <RouterProvider router={router}/>     */}
  </React.StrictMode>,
)
}

// ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//     <RouterProvider router={router}/>    
//   </React.StrictMode>,
// )
