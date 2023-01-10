import Header from '../../container/Header/Header'
import Scrolls from '../../plugins/Swiper/Swiper'

import './Home.scss'

const homePage = ()=>{
    const monthList =['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月','全部'];
    return (
        <>
            <Header/>
            <Scrolls/>
            <div className="months">
                {monthList.map((month)=>{
                    return (<div className='months-item'>{month}</div>)
                })}
            </div>
        </>
    )
}

export default homePage