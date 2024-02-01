import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import HomePage from './pages/home/Home'
import ErrorPage from './pages/Error'
import DeatilPage from './pages/Detail'
import ResultPage from './pages/Result'
import MapPage from './pages/Map'
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
