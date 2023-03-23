import './Dropdown.scss'

const Dropdown = ({menu,icon,isShowModal,setShowModal})=>{
    return(
        <>
            <div className="dropdown" onClick={()=>setShowModal(!isShowModal)}>
                <div className='dropdown-title'>{menu}</div>
                <div className='dropdown-icon'>
                    <img src={icon?icon:'##'}  />
                </div>
            </div>
        </>
    )
}

export default Dropdown