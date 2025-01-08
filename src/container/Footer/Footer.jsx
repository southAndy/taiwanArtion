import styled from 'styled-components'
import BaseImageBox from '../../styles/base/BaseImageBox'
import { logoIcon } from '../../assets/images/index'
import { Link } from 'react-router-dom'
import { breakpoint } from '../../styles/utils/breakpoint'
const Footer = () => {
   return (
      <StyledFooter>
         <section className='service'>
            <BaseImageBox alt='logo' width={'140px'} height={'52px'}>
               <img src={logoIcon} alt='logo' />
            </BaseImageBox>

            <div className='service-option'>
               <Link to='/'>關於我們</Link>
               <Link to='/'>聯絡我們</Link>
               <Link to='/'>隱私權政策</Link>
               <Link to='/'>常見問題</Link>
            </div>
         </section>
         <p className='rights'>© {new Date().getFullYear()} ARTION.All Rights Reserved</p>
      </StyledFooter>
   )
}

export default Footer

const StyledFooter = styled.footer`
   width: 100vw;

   .service {
      display: none;
   }

   .rights {
      background: #7b4d29;
      color: #fff;
      white-space: nowrap;
      text-align: center;
      width: 100%;
      margin: 0 auto;
      padding: 20px 0;
   }
   @media (min-width: ${breakpoint.tablet}px) {
      .service {
         display: flex;
         justify-content: space-between;
         align-items: center;
         padding: 54px;
         width: 100%;
         margin: 0 auto;
         background: #eeeeee;
         box-shadow: 0px -1px 0px 0px #00000033;

         &-option {
            display: flex;
            gap: 20px;
            a {
               color: #7b4d29;
               text-decoration: none;
            }
         }
      }
   }
`
