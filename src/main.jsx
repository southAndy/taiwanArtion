import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import HomePage from './page/Home/Home'
import ErrorPage from './page/Errors/Error'
import DeatilPage from './page/Detais/Detail'
import ResultPage from './page/Result/Result'
import MapPage from './page/Map/Map'
import './assets/scss/main.scss'
import Header from './container/Header/Header'

const router = createBrowserRouter([
   {
      path: '/',
      element: <HomePage />,
   },
   {
      path: '/map',
      element: <MapPage />,
      errorElement: <ErrorPage />,
   },
   {
      path: '/detail/:id',
      element: <DeatilPage />,
      errorElement: <ErrorPage />,
   },
   {
      path: '/result/:keyword',
      element: <ResultPage />,
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
