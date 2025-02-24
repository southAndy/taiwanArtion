import Header from './container/Header/Header'
// import { Provider } from 'react-redux'
// import store from './store'
import { RouterProvider } from 'react-router-dom'
import router from './routes/index'

const App = () => {
   return (
      <>
         {/* <Header /> */}
         <RouterProvider router={router}></RouterProvider>
      </>
   )
}

export default App
