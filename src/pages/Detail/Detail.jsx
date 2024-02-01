import { useState, useEffect, useMemo } from 'react'
import { useParams, Link } from 'react-router-dom'

import { MapContainer, TileLayer, useMap } from 'react-leaflet'
import { Marker, Popup } from 'react-leaflet'
import axios from 'axios'

import './detail-page.scss'
import styled from '@emotion/styled'

import EvaluateCard from '../../component/evaluate/evaluate-card'

const DetailTitle = styled.h3`
   border-left: 10px solid #986f4f;
   // border-radius: 10px 10px;
   font-family: 'Noto Sans TC';
   font-style: normal;
   font-weight: 700;
   font-size: 24px;
   line-height: 35px;
   color: #986f4f;
`
const DetailContainer = styled.section`
   display: flex;
   justify-content: center;
   flex-direction: column;
   padding: 0 40px;
`
const DetailBanner = styled.section`
   display: flex;
   flex-direction: column;
   margin-bottom: 50px;
`
const DetailOption = styled.p`
   padding: 20px;
   cursor: pointer;
`

const BannerImage = styled.img`
   width: 1356.75px;
   height: 711px;
   border-radius: 10px;
   position: relative;
`

export default function DetailPage() {
   let [exhibition, setExhibition] = useState([])
   const params = useParams()
   const [currentOption, setCurrentOption] = useState(0)
   //todo recall api to get page's data
   useEffect(() => {
      async function fetchData() {
         try {
            const response = await axios.get(
               'https://cloud.culture.tw/frontsite/trans/SearchShowAction.do?method=doFindTypeJ&category=6',
            )
            //todo 改從全域資料庫取
            setExhibition(() => (exhibition = response.data))
            //? 引入地圖
         } catch (error) {
            console.log(error)
         }
      }
      fetchData()
   }, [])

   const currentData = useMemo(() => {
      console.log(exhibition)

      return exhibition.filter((item) => item.UID === params.dataID)
   }, [exhibition])
   // let getCurrentOption = useMemo(()=>,[currentOption])

   return (
      <>
         <DetailContainer>
            <DetailBanner>
               <Link to={'/'}>返回首頁</Link>
               <div className='banner'>
                  <img className='banner-image' src={currentData[0]?.imageUrl} />
               </div>
               <p className='banner-title'>{currentData[0]?.title}</p>
            </DetailBanner>
            <section className='menu'>
               <DetailOption isActive={true}>展覽總覽</DetailOption>
               <DetailOption isActive={false}>展覽簡介</DetailOption>
               <DetailOption isActive={false}>展覽票價</DetailOption>
               <DetailOption isActive={false}>地點總覽</DetailOption>
            </section>
            <article>
               <section>
                  <DetailTitle>展覽總覽</DetailTitle>
                  <p>
                     展覽日期 {currentData[0]?.startDate}- {currentData[0]?.endDate}
                  </p>
                  <p>主辦單位 {currentData[0]?.masterUnit[0]}</p>
                  <a href={currentData[0]?.webSales}>
                     <p>展覽官網 {currentData[0]?.masterUnit[0]}</p>
                  </a>
               </section>
               <section className='info'>
                  <DetailTitle>展覽簡介</DetailTitle>
                  <p>{currentData[0]?.descriptionFilterHtml}</p>
               </section>
               <section className='info'>
                  <DetailTitle>展覽售票</DetailTitle>
                  <p>{currentData[0]?.showInfo[0]?.price}</p>
               </section>
               <section className='info'>
                  <DetailTitle>展覽地點</DetailTitle>
                  <div>
                     {currentData[0]?.showInfo[0]?.latitude ? (
                        <div id={currentData[0]?.UID} className='map'>
                           <MapContainer
                              center={[
                                 currentData[0]?.showInfo[0]?.latitude,
                                 currentData[0]?.showInfo[0]?.longitude,
                              ]}
                              zoom={18}
                              scrollWheelZoom={false}
                           >
                              <TileLayer
                                 attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                 url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                              />
                              <Marker position={[51.505, -0.09]}>
                                 <Popup>
                                    A pretty CSS3 popup. <br /> Easily customizable.
                                 </Popup>
                              </Marker>
                           </MapContainer>
                        </div>
                     ) : (
                        <div></div>
                     )}
                     {/* 右側說明欄位 */}
                     <div></div>
                  </div>
               </section>
               <section className='info'>
                  <DetailTitle>展覽評價</DetailTitle>
                  <EvaluateCard />
               </section>
            </article>
         </DetailContainer>
      </>
   )
}
