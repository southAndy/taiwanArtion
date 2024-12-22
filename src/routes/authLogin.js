import { redirect } from 'react-router-dom'

const authLogin = ({ request, params }) => {
   // 檢查 cookie 是否有 token
   // todo 這邊應該要改成檢查 token 是否有效
   if (document.cookie.includes('accessToken')) {
      alert('登入成功!')
      return null
   } else {
      alert('請先登入!')
      return redirect('/')
   }
}

export default authLogin
