import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../../firebase.config'

const AuthRequiredRoute = ({ children }) => {
  const { isLogin } = useSelector(state => state.user)
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

  // 如果沒有 Firebase 用戶，跳轉到登入頁面
  if (!user) {
    return <Navigate to="/login" replace />
  }

  return children
}

export default AuthRequiredRoute
