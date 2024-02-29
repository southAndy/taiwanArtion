import React from 'react'
import ReactDOM from 'react-dom/client'
import router from './router/index'
import { RouterProvider } from 'react-router-dom'
import './assets/scss/main.scss'
import Header from './container/Header/Header'

// import app from '../firebase.config'

import { Provider } from 'react-redux'
//redux instance
import store from './store'

const rootElement = document.getElementById('root')
if (rootElement) {
   ReactDOM.createRoot(rootElement).render(
      <Provider store={store}>
         <RouterProvider router={router}>
            <Header />
            {router}
         </RouterProvider>
      </Provider>,
   )
}
