import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import HomePage from './page/home/home'
import ErrorPage from './page/error'
import DeatilPage from './page/deatil-page'
import ResultPage from './page/result-page'
import MapPage from './page/map-page'
import './assets/scss/main.scss'

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
      path: '/detail/:dataID',
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
      <React.StrictMode>{<RouterProvider router={router} />}</React.StrictMode>,
   )
}
