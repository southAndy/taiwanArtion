import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import HomePage from '../pages/home/home'
import ErrorPage from '../pages/Errors/Error'
import DetailPage from '../pages/Detail/Detail'
import ResultPage from '../pages/Result/Result'
import AccountPage from '../container/Account'
import LoginPage from '../container/Login'
import Register from '../pages/Register/Register'
import Backstage from '../pages/Backstage/Backstage'

const router = createBrowserRouter([
   {
      path: '/',
      element: <HomePage />,
   },
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
   },
   {
      path: '/login',
      element: <LoginPage />,
      errorElement: <ErrorPage />,
   },
   {
      path: '/register',
      element: <Register />,
      errorElement: <ErrorPage />,
   },
   {
      path: '/backstage/',
      element: <Backstage />,
      errorElement: <ErrorPage />,
   },
])

export default router
