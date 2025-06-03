import React from 'react'
import Header from './container/Header/Header'
import { Provider } from 'react-redux'
import store from './store'
import { RouterProvider } from 'react-router-dom'
import router from './routes/index'
import CreateGlobalStyle from './styles/theme/CreateGlobalStyle'

const App = () => {
   return (
      <Provider store={store}>
         <CreateGlobalStyle />
         <RouterProvider router={router}>
            <Header />
         </RouterProvider>
      </Provider>
   )
}

export default App
