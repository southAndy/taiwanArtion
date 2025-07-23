import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../../firebase.config'

const ProtectedRoute = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, currentUser => {
      setUser(currentUser)
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  // 如果還在載入中，顯示載入畫面
  if (loading) {
    return <div>Loading...</div>
  }

  // 如果已經登入，跳轉到首頁 (適用於登入頁面等)
  if (user) {
    return <Navigate to="/" replace />
  }

  return children
}

export default ProtectedRoute
