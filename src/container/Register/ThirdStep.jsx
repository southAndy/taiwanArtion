import React from 'react'
import Input from '../../components/Input/Input'
import Button from '../../components/Button'

const thirdStep = () => {
   return (
      <>
         <p className='mb-6 text-sm'>為了確保是你本人，我們將會寄送一封驗證信件到你的電子信箱。</p>
         <h3 className='mb-5 font-medium'>電子信箱</h3>
         <div className='flex gap-2'>
            <Input type='email' placeholder='請輸入電子信箱' />
            <Button content={'送出驗證'} />
         </div>
      </>
   )
}

export default thirdStep
