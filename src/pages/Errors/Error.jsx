import { useRouteError, Link } from 'react-router-dom'

export default function ErrorPage() {
   const error = useRouteError()
   console.log(error, 5)

   return (
      <div id='error'>
         <h1>Oops</h1>
         <h3>是否要回到首頁？</h3>
         <Link to='/'>首頁</Link>
      </div>
   )
}
