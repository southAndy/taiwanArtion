import { redirect } from 'react-router-dom'

const handleLogin = ({ request, params }) => {
   console.log('handleLogin', request, params)
   if (document.cookie.includes('isLogin=true')) {
      alert('登入成功!')
      return null
   } else {
      alert('請先登入!')
      return redirect('/')
   }
}

export default handleLogin
