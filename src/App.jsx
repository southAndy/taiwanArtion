import React from 'react'
import { RouterProvider } from 'react-router-dom'
import router from './routes'
import './assets/scss/main.scss'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { monitorUserState } from './store/userSlice'

const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(monitorUserState())
  }, [])
  return <RouterProvider router={router} />
}

export default App
