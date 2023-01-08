//本身設定
import './Header.scss'
//引入元件
import Dropdown from '../component/Dropdown/Dropdown'

//images
import searchIcon from "../assets/images/search-icon.png"
import dropdownIcon from "../assets/images/Vector.png"
import fakeUserIcon from '../assets/images/Ellipse22.png'

const Header = ()=>{
    return (
        <header className='header-container'>
            <a className='logo' href="##">
                <img src="/src/assets/images/logo-05 3.png" alt="網站logo" />
            </a>
            <div className=' filter filter-box'>
                <Dropdown className='filter-item' menu={'輸入展覽名稱'} icon={dropdownIcon} />
                <Dropdown className='filter-item' menu={'選擇地區'} icon={dropdownIcon}/>
                <Dropdown className='filter-item' menu={'選擇展區'} icon={dropdownIcon}/>
                <Dropdown className='filter-item' menu={'開始日期'} icon={dropdownIcon}/>
                <Dropdown className='filter-item' menu={'結束日期'} icon={dropdownIcon}/>
                <div>
                    <img src={searchIcon} alt="搜尋樣式" />
                </div>
            </div>
            <a href="##">所有展覽</a>
            <a href="##">附近展覽</a>
            {/* //todo 鈴鐺按鈕 */}
            <Dropdown/>
            <Dropdown icon={fakeUserIcon}/>
        </header>
    )
}

export default Header