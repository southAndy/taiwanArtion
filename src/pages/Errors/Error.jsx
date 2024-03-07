import { useRouteError, Link } from 'react-router-dom'
import { notfindBg } from '../../assets/images'
import Header from '../../container/Header/Header'
export default function ErrorPage() {
   const error = useRouteError()
   console.log(error)

   return (
      <div id='error'>
         <Header />
         <div className='w-[100%] h-[50%]'>
            <img src={notfindBg} alt='' />
         </div>
         <div className='flex flex-col items-center gap-2'>
            <h1 className='font-bold text-[24px]'>Oops！ 找不到你說的那一頁</h1>
            <h3>是否要回到首頁？或是點擊上方導覽列開啟旅程！</h3>
            <Link
               to='/'
               className=' text-center w-[50%] bg-[#a9622a] text-white p-4 rounded-lg mt-3'
            >
               首頁
            </Link>
         </div>
      </div>
   )
}
