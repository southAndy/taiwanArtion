import React from 'react'
import { memo } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const Menu = memo(() => {
   // todo 改為 config  or 由後端給
   const menuList = [
      {
         title: '地圖找展覽',
         link: '/map',
      },
      {
         title: '所有展覽',
         link: '/all',
      },
   ]

   return (
      <MenuWrapper>
         {menuList.map((menu, index) => (
            <Link key={index} to={menu.link}>
               {menu.title}
            </Link>
         ))}
      </MenuWrapper>
   )
})
Menu.displayName = 'Menu'

export default Menu

const MenuWrapper = styled.div`
   flex: 2;
   display: flex;
   gap: 20px;
   margin-left: 40px;
   font-weight: 700;

   a {
      font-size: 14px;
      color: #535353;
      text-decoration: none;

      &:hover {
         color: #be875c;
      }
   }
`
