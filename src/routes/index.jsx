import React, { lazy, Suspense } from 'react'
import { createBrowserRouter } from 'react-router-dom'
import HomePage from '@pages/Home/Home'
import ErrorPage from '@pages/Errors/Error'
import DetailPage from '@pages/Detail/Detail'
import ResultPage from '@pages/Result/Result'
import AccountPage from '@container/Account'
import Register from '@pages/Register/Register'
import Backstage from '@pages/Backstage/Backstage'
import MapPage from '@pages/Map/Map'
import ProtectedRoute from './ProtectedRoute'
import Layout from '@layouts/Layout.tsx'
import LoginPage from '@container/Login'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
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
        element: <AccountPage />,
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
        element: <Register />,
      },
      {
        path: '/backstage/',
        element: (
          <ProtectedRoute>
            <Backstage />
          </ProtectedRoute>
        ),
      },
    ],
  },
])

export default router
