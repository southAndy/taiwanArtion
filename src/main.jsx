import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import HomePage from './pages/home/home'
import ErrorPage from './pages/Errors/Error'
import DetailPage from './pages/Detail/Detail'
import ResultPage from './pages/Result/Result'
import AccountPage from './container/Account'
import LoginPage from './container/Login'
// import MapPage from './page/Map/Map'
import './assets/scss/main.scss'
import Header from './container/Header/Header'

const router = createBrowserRouter([
   {
      path: '/',
      element: <HomePage />,
   },
   // {
   //    path: '/map',
   //    element: <MapPage />,
   //    errorElement: <ErrorPage />,
   // },
   {
      path: '/detail/:id',
      element: <DetailPage />,
      errorElement: <ErrorPage />,
   },
   {
      path: '/result/:keyword',
      element: <ResultPage />,
      errorElement: <ErrorPage />,
   },
   {
      path: '/account',
      element: <AccountPage />,
      errorElement: <ErrorPage />,
      // children: [
      //    {
      //       path: '/account/login',
      //       element: <LoginPage />,
      //       errorElement: <ErrorPage />,
      //    },
      //    // {
      //    //    path: '/register',
      //    //    element: <LoginPage />,
      //    //    errorElement: <ErrorPage />,
      //    // },
      // ],
   },
   {
      path: '/login',
      element: <LoginPage />,
      errorElement: <ErrorPage />,
   },
])
const rootElement = document.getElementById('root')
if (rootElement) {
   ReactDOM.createRoot(rootElement).render(
      <RouterProvider router={router}>
         <Header />
         {router}
      </RouterProvider>,
   )
}
