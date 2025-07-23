import './Card.scss'
// import "../../assets/sass/animation.scss";

import calendarIcon from '../../assets/images/categoryicon.png'
import timeIcon from '../../assets/images/icon02.png'
import locationIcon from '../../assets/images/locationicon.png'

const Card = ({ data, isLoading = true }) => {
  return (
    <>
      <section className="card">
        <div className="card-image">
          <img src={data?.imageUrl} alt="" className={isLoading ? 'skeleton' : ''} />
        </div>
        <div className="card-title">
          <h4 className={isLoading ? 'skeleton' : ''}>{data?.title}</h4>
          {/* <div className={isLoading ? "skeleton" : "tag"}>{"isLoading ? 雕塑"}</div> */}
        </div>
        <div className="card-detail">
          <div className={isLoading ? 'skeleton' : 'date'}>
            <div className={isLoading ? 'skeleton' : 'date-image'}>
              <img src={calendarIcon} alt="" className={isLoading ? 'hide' : ''} />
            </div>
            <time>{isLoading ? '' : '2022/03/21-04/21'}</time>
          </div>
          <div className="time">
            <div className="time-image">
              <img src={timeIcon} alt="" className={isLoading ? 'skeleton' : ''} />
            </div>
            <time>{isLoading ? '' : '09:00-18:00'}</time>
          </div>
          <div className={isLoading ? 'skeleton' : 'location'}>
            <div className={isLoading ? 'skeleton' : 'location-image'}>
              <img src={locationIcon} alt="" className={isLoading ? 'hide' : ''} />
            </div>
            <span>{isLoading ? '' : '假縣市'}</span>
          </div>
        </div>
      </section>
    </>
  )
}

export default Card
