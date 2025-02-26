// import Header from './container/Header/Header'
import { Provider } from 'react-redux'
import store from './store'
import { RouterProvider } from 'react-router-dom'
import GlobalStyle from './styles/theme/CreateGlobalStyle'
import router from './routes/index'

const App = () => {
   return (
      <>
         <GlobalStyle />
         <Provider store={store}>
            {/* <Header /> */}
            <RouterProvider router={router}></RouterProvider>
         </Provider>
      </>
   )
}

export default App
