import "./Card.scss"
import calendarIcon from "../../assets/images/categoryicon.png"
import timeIcon from "../../assets/images/icon02.png"
import locationIcon from "../../assets/images/icon03.png"

const Card = ({dataArr})=>{
    return(
        <>
            <section className="card">
                <div className="card-image">
                    <img src={dataArr?.imageUrl} alt="" />
                </div>
                <div className="card-title">
                    <h4>{ dataArr?.title || "會動的文藝復興"}</h4>
                    <div className="tag">{'雕塑'}</div>
                </div>
                <div className="card-detail">
                    <div className="date">
                        <div className="date-image">
                            <img src={calendarIcon} alt="" />
                        </div>
                        <time >{'2022/03/21-04/21'}</time>
                    </div>
                    <div className="time">
                        <div className="time-image">
                            <img src={timeIcon} alt="" />
                        </div>
                        <time>{'09:00-18:00'}</time>
                    </div>
                    <div className="location">
                        <div className="location-image">
                            <img src={locationIcon} alt="" />
                        </div>
                        <span>{dataArr?.location||"台南市"}</span>
                    </div>
                </div>
            </section>
        </>
    )
}


export default Card