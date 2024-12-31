import { createBrowserRouter } from 'react-router-dom'
import HomePage from '../pages/home/home'
import ErrorPage from '../pages/Errors/Error'
import DetailPage from '../pages/Detail/Detail'
import ResultPage from '../pages/Result/Result'
import AccountPage from '../container/Account'
import LoginPage from '../container/Login'
import Register from '../pages/Register/Register'
import Backstage from '../pages/Backstage/Backstage'
// import Success from '../pages/Register/Success'
import Login from '../container/Login'
import MapPage from '../pages/Map/Map'

import handleLogin from './authLogin'

const router = createBrowserRouter([
   {
      path: '/',
      element: <HomePage />,
      errorElement: <ErrorPage />,
      children: [],
   },
   {
      path: '/map',
      element: <MapPage />,
   },
   {
      path: '/detail/:id',
      element: <DetailPage />,
   },
   {
      path: '/result/:keyword',
      element: <ResultPage />,
   },
   {
      path: '/account',
      element: <AccountPage />,
      // 新增檢查權限
   },
   {
      path: '/login',
      element: <LoginPage />,
   },
   {
      path: '/register',
      element: <Register />,
   },
   // {
   //    path: '/reset',
   //    element: <Reset />,
   // },
   {
      path: '/backstage/',
      element: <Backstage />,
      loader: handleLogin,
   },
])

export default router
