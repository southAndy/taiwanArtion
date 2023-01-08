//本身設定
import './Header.scss'

import Dropdown from '../component/Dropdown/Dropdown'

const Header = ()=>{
    return (
        <header className='header-container'>
            <a className='logo' href="##">
                <img src="/src/assets/images/logo-05 3.png" alt="網站logo" />
            </a>
            <div className=' filter filter-box'>
                <Dropdown className='filter-item' menu={'輸入展覽名稱'} icon={'../assets/images/search-icon.png'} />
                <Dropdown className='filter-item' menu={'選擇地區'} />
                <Dropdown className='filter-item' menu={'選擇展區'} />
                <Dropdown className='filter-item' menu={'開始日期'} />
                <Dropdown className='filter-item' menu={'結束日期'} />
                <div>
                    {/* <img src="../assets/images/search icon.png" alt="" /> */}
                </div>
            </div>

        </header>
    )
}

export default Header