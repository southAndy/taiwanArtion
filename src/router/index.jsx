import { createBrowserRouter } from 'react-router-dom'
import HomePage from '../pages/home/home'
import ErrorPage from '../pages/Errors/Error'
import DetailPage from '../pages/Detail/Detail'
import ResultPage from '../pages/Result/Result'
import AccountPage from '../container/Account'
import LoginPage from '../container/Login'
import Register from '../pages/Register/Register'
import Backstage from '../pages/Backstage/Backstage'
import Success from '../pages/Register/Success'
import Login from '../container/Login'

const router = createBrowserRouter([
   {
      path: '/',
      element: <HomePage />,
      errorElement: <ErrorPage />,
      children: [],
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
   },
   {
      path: '/login',
      element: <LoginPage />,
      // 新增檢查權限
      shouldRevalidate: (route) => {
         console.log(route)
         return true
      },
   },
   {
      path: '/register',
      element: <Register />,
   },
   {
      path: '/success',
      element: <Success />,
   },
   {
      path: '/backstage/',
      element: <Backstage />,
   },
])

export default router
