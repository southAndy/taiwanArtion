import { useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import Input from '../../components/Input/Input'
import { CityMenu } from './CityMenu'
// import { ExhibitionMenu } from './ExhibitionMenu'
import { PayMenu } from './PayMenu'
import DateMenu from './DateMenu'
import { breakpoint } from '../../styles/utils/breakpoint'
import { searchIcon } from '../../assets/images'
import { useNavigate } from 'react-router-dom'

export default function Menu({ setModlaShow }) {
   const menuNameList = ['縣市', '日期']
   const [currentMenu, setMenuList] = useState(0)
   const [currentCityIndex, setCurrentCityIndex] = useState('')
   const [keywords, setKeywords] = useState({
      keyword: '',
      city: '',
      date: { start: null, end: null },
      pay: '',
   })
   const navigate = useNavigate()
   const menuList = [
      <CityMenu
         setKeywords={setKeywords}
         setCurrentCityIndex={setCurrentCityIndex}
         currentCityIndex={currentCityIndex}
      />,
      <DateMenu setKeywords={setKeywords} dateKeywords={keywords.date} />,
      <PayMenu />,
   ]
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
   function search() {
      navigate(
         `/result?keyword=${keywords.keyword}&city=${keywords.city}&start=${keywords.date.start}&end=${keywords.date.end}&pay=${keywords.pay}`,
      )
   }

   return (
      <div>
         <StyledMobileSearch>
            <Input placeholder={'輸入展覽名稱'} width={'100%'} />
            <StyledSearchIcon onClick={search}>
               <img src={searchIcon} alt='' />
            </StyledSearchIcon>
         </StyledMobileSearch>
         <StyledSearchBox>
            <input type='text' />
            <div className='menu' onClick={() => setMenuList(0)}>
               選擇縣市
            </div>
            <div className='menu' onClick={() => setMenuList(1)}>
               開始日期
            </div>
            <div className='menu' onClick={() => setMenuList(1)}>
               結束日期
            </div>
         </StyledSearchBox>
         <StyledMobileOptionBox>
            {menuNameList.map((menu, index) => {
               return (
                  <StyledMobileOption
                     className='option text-red'
                     key={index}
                     onClick={() => setMenuList(index)}
                     isSelect={currentMenu === index}
                  >
                     {menu}
                  </StyledMobileOption>
               )
            })}
         </StyledMobileOptionBox>
         {renderMenu()}
      </div>
   )
}
const DefaultMenu = () => {
   return (
      <div className='mt-4'>
         <h3 className=' font-medium text-lg'>熱門搜尋</h3>
      </div>
   )
}
const StyledMobileSearch = styled.div`
   display: flex;

   @media (min-width: ${breakpoint.tablet}px) {
      display: none;
   }
`
const StyledSearchIcon = styled.div`
   width: 24px;
   height: 24px;
   object-fit: contain;

   cursor: pointer;

   position: absolute;
   top: 6%;
   right: 10%;
`

const StyledSearchBox = styled.div`
   display: none;
   align-items: center;
   flex: 1;
   border: 1px solid #c2c2c2;
   border-radius: 20px;
   width: 100%;
   position: relative;

   .menu {
      display: none;
   }

   @media (min-width: ${breakpoint.tablet}px) {
      gap: 16px;
      display: flex;
      .menu {
         color: #5f5f5f;
         font-weight: 400;
         cursor: pointer;

         &:hover {
            color: #be875c;
         }
      }
   }
`
const StyledMobileOption = styled.div`
   font-size: 14px;
   font-weight: 600;
   padding: 16px;
   color: ${(props) => (props.isSelect ? '#be875c' : '#929292')};
   cursor: pointer;
   &:hover {
      color: #be875c;
   }
`

const StyledMenu = styled.div`
   font-size: 14px;
   font-weight: 600;
   color: ${(props) => (props.isSelect ? 'red' : '#929292')};
   padding-bottom: 12px;
   cursor: pointer;
   &:hover {
      color: #be875c;
   }

   @media (min-width: ${breakpoint.tablet}px) {
      display: none;
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
const StyledMobileOptionBox = styled.div`
   display: flex;
   gap: 16px;

   @media (min-width: ${breakpoint.tablet}px) {
      display: none;
   }
`
