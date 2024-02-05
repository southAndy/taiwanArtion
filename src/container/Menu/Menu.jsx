import { useState } from 'react'
import Input from '../../components/Input/Input'
import { City } from './CityMenu'

const DefaultMenu = () => {
   return <div>DefaultMenu</div>
}

const ExhibitionMenu = () => {
   return <div>ExhibitionMenu</div>
}

export default function Default() {
   const menuNameList = ['縣市', '展覽館', '日期', '票價']
   const [currentMenu, setMenuList] = useState()
   const menuList = [<City />, <ExhibitionMenu />]
   function renderMenu() {
      switch (currentMenu) {
         case 0:
            return menuList[0]
         case 1:
            return menuList[1]
         case 2:
            return <div>日期</div>
         case 3:
            return <div>票價</div>
         default:
            return <DefaultMenu />
      }
   }
   return (
      <div>
         <Input placeholder={'請輸入展覽名稱'} />
         <div className='flex gap-8 mt-5'>
            {menuNameList.map((menu, index) => {
               return (
                  <p className='text-red' key={index} onClick={() => setMenuList(index)}>
                     {menu}
                  </p>
               )
            })}
         </div>
         {renderMenu()}
      </div>
   )
}
