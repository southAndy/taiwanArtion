import { useState } from 'react'
import styled from '@emotion/styled'

const DropdownContainer = styled.div`
   position: relative;
   display: flex;
   justify-content: center;
   align-items: center;
   font-size: 14px;
   width: 100px;
   height: 100px;
   max-width: 124px;
   box-shadow: 1px 0px 0px #dadada;
   height: 32px;
   cursor: pointer;
`
const DropdownTitle = styled.p`
   color: #b0b0b0;
`

const DropMenuList = styled.div`
   display: ${(props) => (props.show ? 'block' : 'none')};
   width: 128px;
   max-height: 232px;
   position: absolute;
   z-index: 2;
   left: 0%;
   top: 125%;
   background: #ffffff;
   box-shadow: 0px 1px 3px 1px rgba(0, 0, 0, 0.15);
   border-radius: 4px;
`
const DropMenu = styled.div`
   font-size: 14px;
   text-align: center;
   &:hover {
      color: #be875c;
   }
`

const Dropdown = ({ menu, title, setOption }) => {
   const [isShowDrop, setIsShowDrop] = useState(false)
   const selectOption = (e) => {
      setOption((n) => e.target.innerText)
      setIsShowDrop((n) => !n)
   }
   return (
      <>
         <DropdownContainer>
            <DropdownTitle onClick={() => setIsShowDrop((n) => !n)}>
               {title ? title : menu[0]}
            </DropdownTitle>
            <DropMenuList show={isShowDrop}>
               {menu.map((menu, index) => (
                  <DropMenu key={index} onClick={selectOption}>
                     {menu}
                  </DropMenu>
               ))}
            </DropMenuList>
         </DropdownContainer>
      </>
   )
}

export default Dropdown
