import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import HomePage from './pages/home/home'
import ErrorPage from './pages/Errors/Error'
import DetailPage from './pages/Detail/Detail'
import ResultPage from './pages/Result/Result'
import AccountPage from './container/Account'
import LoginPage from './container/Login'
import Register from './pages/Register/Register'
import Backstage from './pages/Backstage/Backstage'
// import MapPage from './page/Map/Map'
import './assets/scss/main.scss'
import Header from './container/Header/Header'
import app from '../firebase.config'

//redux
import { Provider } from 'react-redux'
import { createSlice, configureStore } from '@reduxjs/toolkit'
import testSlice from './store/testSlice'

const store = configureStore({
   reducer: {
      test: testSlice,
   },
})

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
      path: '/backstage/:username',
      element: <Backstage />,
      errorElement: <ErrorPage />,
   },
])
const rootElement = document.getElementById('root')
if (rootElement) {
   ReactDOM.createRoot(rootElement).render(
      <Provider store={store}>
         <RouterProvider router={router}>
            <Header />
            {router}
         </RouterProvider>
         ,
      </Provider>,
   )
}
