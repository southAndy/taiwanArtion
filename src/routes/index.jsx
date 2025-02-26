import { createBrowserRouter } from 'react-router-dom'
import HomePage from '../pages/Home/Home'
import ErrorPage from '../pages/Errors/Error'
import DetailPage from '../pages/Detail/Detail'
import ResultPage from '../pages/Result/Result'
import AccountPage from '../container/Account'
import LoginPage from '../container/Login'
import Register from '../pages/Register/Register'
import Backstage from '../pages/Backstage/Backstage'
import MapPage from '../pages/Map/Map'
import ProtectedRoute from './ProtectedRoute'
import handleLogin from './authLogin'

const routes = [
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
      path: '/result/',
      element: <ResultPage />,
   },
   {
      path: '/account',
      element: (
         <ProtectedRoute>
            <AccountPage />
         </ProtectedRoute>
      ),
      // 新增檢查權限
   },
   {
      path: '/login',
      element: (
         <ProtectedRoute>
            <LoginPage />
         </ProtectedRoute>
      ),
   },
   {
      path: '/register',
      element: (
         <ProtectedRoute>
            <Register />
         </ProtectedRoute>
      ),
   },
   {
      path: '/backstage/',
      element: <Backstage />,
      loader: handleLogin,
   },
]
const router = createBrowserRouter(routes)

export default router
