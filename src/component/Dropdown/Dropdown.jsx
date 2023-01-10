import './Dropdown.scss'

const Dropdown = ({menu,icon})=>{
    return(
        <>
            <div className="dropdown">
                <div className='dropdown-title'>{menu}</div>
                <div className='dropdown-icon'>
                    <img src={icon?icon:'##'}  />
                </div>
            </div>
            {/* 點擊顯示內容 */}
        </>
    )
}

export default Dropdown