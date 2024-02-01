import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import HomePage from './pages/Home/Home'
import ErrorPage from './pages/Errors/Error'
import DeatilPage from './pages/Detail/Detail'
import ResultPage from './pages/Result/Result'
import MapPage from './pages/Map/Map'
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
