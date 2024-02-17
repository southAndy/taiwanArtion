import { useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import Input from '../../components/Input/Input'
import { CityMenu } from './CityMenu'
import { ExhibitionMenu } from './ExhibitionMenu'
import { PayMenu } from './PayMenu'
import DateMenu from './DateMenu'

const StyledMenu = styled.div`
   font-size: 14px;
   font-weight: 600;
   color: ${(props) => (props.isSelect ? 'red' : '#929292')};
   padding-bottom: 12px;
   cursor: pointer;
   &:hover {
      color: #be875c;
   }
`
const StyledCityItem = styled(Link)`
   display: flex;
   align-items: center;
   padding: 8px 15px;
   border-radius: 12px;
   white-space: nowrap;
   font-size: 14px;
   background: ${(props) => (props.isSelect ? '#BE8152' : '#EEEEEE')};
   color: ${(props) => (props.isSelect ? 'red' : 'black')};
   cursor: pointer;
   &:hover {
      background: #be875c;
      color: #fff;
   }
`

const DefaultMenu = () => {
   return (
      <div className='mt-4'>
         <h3 className=' font-medium text-lg'>熱門搜尋</h3>
         <div className='flex flex-wrap gap-4 mt-4'>
            <StyledCityItem to='/result/台北市'>小王子展</StyledCityItem>
            <StyledCityItem to='/result/台南市'>悲慘世界</StyledCityItem>
            <StyledCityItem to='/result/台中市'>西洋美術</StyledCityItem>
            <StyledCityItem to='/result/台北市'>貓之日</StyledCityItem>
            <StyledCityItem to='/result/台北市'>蒙娜麗莎的探險之旅</StyledCityItem>
         </div>
      </div>
   )
}

export default function Menu() {
   const menuNameList = ['縣市', '展覽館', '日期', '票價']
   const [currentMenu, setMenuList] = useState()
   const menuList = [<CityMenu />, <ExhibitionMenu />, <DateMenu />, <PayMenu />]
   function renderMenu() {
      switch (currentMenu) {
         case 0:
            return menuList[0]
         case 1:
            return menuList[1]
         case 2:
            return menuList[2]
         case 3:
            return menuList[3]
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
                  <StyledMenu className='text-red' key={index} onClick={() => setMenuList(index)}>
                     {menu}
                  </StyledMenu>
               )
            })}
         </div>
         {renderMenu()}
      </div>
   )
}
