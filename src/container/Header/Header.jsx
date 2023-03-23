//本身設定
import './Header.scss'
import { useState } from 'react'


import Dropdown from '../../component/Dropdown/Dropdown'
import DateSelecter from '../../plugins/date-picker'

import {Link} from "react-router-dom"

//images
import searchIcon from "../../assets/images/search-icon.png"
import dropdownIcon from "../../assets/images/Vector.png"
import fakeUserIcon from '../../assets/images/Ellipse22.png'
import notifyIcon from "../../assets/images/notify159.png"
import Input from '../../component/Input'

const Header = ({setClick})=>{
    let [isShowModal,setShowMoal]=useState(false)
    //? 存多選的狀態
    let [selectedParams,setParams]=useState([])

    return (
        <header className='header-container'>
            <Link to={'/'} className="logo">
                <img src="/src/assets/images/logo-05 3.png" alt="網站logo" />
            </Link>
            <div className='filter filter-box'>
                <Input/>
                <DateSelecter isShowModal={isShowModal}/>
                <Dropdown className='filter-item' menu={'選擇地區'} icon={dropdownIcon}/>
                <Dropdown className='filter-item' menu={'選擇展區'} icon={dropdownIcon}/>
                <Dropdown className='filter-item' menu={'開始日期'} icon={dropdownIcon} isShowModal={isShowModal} setShowModal={setShowMoal}/>
                <Dropdown className='filter-item' menu={'結束日期'} icon={dropdownIcon}/>
                <div className='filter-item_button'>
                    <img src={searchIcon} alt="搜尋樣式" />
                </div>
            </div>
            <Link to={`/nearby`}>附近展覽</Link>
            <Link to={`/detail`}>所有展覽</Link>
            {/* //todo 當登入狀態顯示鈴鐺按鈕 */}
            <Dropdown icon={notifyIcon}/>
            {/* <Dropdown icon={fakeUserIcon}/> */}
            <div className='login' onClick={()=>setClick((val)=>val=!val)}>註冊 / 登入</div>
        </header>
    )
}

export default Header