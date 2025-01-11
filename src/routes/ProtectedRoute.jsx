import { Navigate } from 'react-router-dom'

const ProtectedRoute = ({ children }) => {
   const isLoggedIn = document.cookie.includes('accessToken')

   if (isLoggedIn) {
      return <Navigate to='/' replace />
   }

   return children
}

export default ProtectedRoute
