import './Dropdown.scss'

const Dropdown = ({menu,icon})=>{
    return(
        <>
            <div className="dropdown">
                <div>{menu}</div>
                <div>
                    <img src={icon?icon:'##'} alt="下拉按鈕" />
                </div>
            </div>
            {/* 點擊顯示內容 */}
        </>
    )
}

export default Dropdown