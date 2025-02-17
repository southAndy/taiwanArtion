import React from 'react'
import Header from './container/Header/Header'
import { Provider } from 'react-redux'
import store from './store'
import { RouterProvider } from 'react-router-dom'
import router from './routes/index'

const App = () => {
   return (
      <Provider store={store}>
         <RouterProvider router={router}>
            <Header />
         </RouterProvider>
      </Provider>
   )
}

export default App
