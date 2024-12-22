import { useState, useEffect, useMemo } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Header from '../../container/Header/Header'
import Button from '../../components/Button'
import BaseImageBox from '../../styles/base/BaseImageBox'
import { db } from '../../../firebase.config'
import { updateDoc, doc, arrayUnion, arrayRemove } from 'firebase/firestore'
import {
   calendarIcon,
   shareIcon,
   sampleResult,
   vectorIcon,
   unStarIcon,
   loveIcon,
   likeIcon,
   loveFullIcon,
} from '../../assets/images'
import styled from '@emotion/styled'

export default function DetailPage() {
   const params = useParams()
   const navigate = useNavigate()
   const [currentOption, setCurrentOption] = useState(0)
   const [isStore, setIsStore] = useState(false) // 聯動收藏愛心 icon

   const dispatch = useDispatch()
   const openData = useSelector((state) => state.common.openData)

   // 當前展覽資料
   const currentData = useMemo(() => {
      return openData.filter((item) => item.UID === params.id)
   }, [openData])

   // 收藏展覽
   const storeExhibition = () => {
      //先判斷是否登入
      if (true) {
         setIsStore((n) => !n) //更新收藏 icon

         const userData = doc(db, 'users', '9Jx7yrqhjuoM4VxrmSCh') //todo 根據會員回傳資料存入
         if (isStore) {
            updateDoc(userData, {
               favorite: arrayUnion(params.id),
            })
         } else {
            updateDoc(userData, {
               favorite: arrayRemove(params.id),
            })
         }
      } else {
         // 如果沒登入，跳轉到登入頁面
         navigate('/login')
      }
   }
   return (
      <>
         <Header />
         <DetailContainer>
            <DetailBanner>
               <div className='back'>
                  <BaseImageBox width={'14px'} height={'14px'}>
                     <img src={vectorIcon} alt='' />
                  </BaseImageBox>
                  <Link to={'/'}>返回首頁</Link>
               </div>
               <BaseImageBox width={'327px'} height={'245px'}>
                  <img className='rounded-xl' src={currentData[0]?.imageUrl} />
               </BaseImageBox>
               <h3 className='text-[24px] font-bold'>{currentData[0]?.title}</h3>
            </DetailBanner>
            <section className='menu'>
               <DetailOption isActive={true} href='#overview'>
                  總覽
               </DetailOption>
               <DetailOption isActive={false} href='#introduce'>
                  簡介
               </DetailOption>
               <DetailOption isActive={false} href='#price'>
                  票價
               </DetailOption>
               <DetailOption isActive={false} href='#place'>
                  地點
               </DetailOption>
               <DetailOption isActive={false} href='#comment'>
                  評價
               </DetailOption>
            </section>
            <StyledInfo>
               <StyledInfoTitle id='overview'>總覽</StyledInfoTitle>
               <div className='info'>
                  <div className='info-option'>
                     <div>展覽日期</div>
                     <div>{`${currentData[0]?.startDate} - ${currentData[0]?.endDate}`}</div>
                  </div>
                  <div className='info-option'>
                     <div>營業時間</div>
                     <div>{'9:00a.m'}</div>
                  </div>
                  <div className='info-option'>
                     <div>主辦單位</div>
                     <div>{currentData[0]?.showUnit}</div>
                  </div>

                  <div className='info-option'>
                     <div>展覽官網</div>
                     <a href='https://womany.net/terms' className='flex text-blue-300'>
                        {'-'}
                     </a>
                  </div>
                  <div className='info-option'>
                     <div>展覽電話</div>
                     <div>{'-'}</div>
                  </div>
               </div>
            </StyledInfo>
            <StyledInfo>
               <StyledInfoTitle id='introduce'>展覽介紹</StyledInfoTitle>
               <p>{currentData[0]?.descriptionFilterHtml}</p>
            </StyledInfo>
            <StyledInfo>
               <StyledInfoTitle id='price'>展覽票價</StyledInfoTitle>
               <p>{currentData[0]?.webSales ?? '-'}</p>
            </StyledInfo>
            {/* todo  */}
            <StyledInfo>
               <StyledInfoTitle id='place'></StyledInfoTitle>
            </StyledInfo>
            <StyledInfo>
               <div className='menu flex gap-3 whitespace-nowrap'>
                  <Button content={'全部'}></Button>
                  <Button content={'最新評價'}></Button>
                  <Button content={'最高評價'}></Button>
                  <Button content={'撰寫評價'}></Button>
               </div>
               <StyledInfoTitle id='comment'>展覽評論</StyledInfoTitle>
               <StyledInfoComment>
                  <div className='user flex gap-4'>
                     <BaseImageBox width={'48px'} height={'48px'}>
                        <img className='rounded-lg' src={sampleResult} alt='' />
                     </BaseImageBox>
                     <div className=' flex flex-col'>
                        <p>{0}則評論</p>
                        <div className='user-star flex gap-1'>
                           {[1, 2, 3, 4, 5].map((item, index) => {
                              return (
                                 <BaseImageBox width={'24px'} height={'24px'} key={index}>
                                    <img
                                       src={unStarIcon}
                                       alt='此展覽評論星星數，星星越多代表評價越好'
                                    />
                                 </BaseImageBox>
                              )
                           })}
                        </div>
                     </div>
                  </div>
                  <div className='rating item flex-col'>
                     <div className='rating-option rating-option '>
                        <p>豐富度</p>
                        <StyledCommentStyle></StyledCommentStyle>
                        <div>{0}</div>
                     </div>
                     <div className='rating-option '>
                        <p>展覽置</p>
                        <StyledCommentStyle></StyledCommentStyle>
                        <div>{0}</div>
                     </div>
                     <div className='rating-option'>
                        <p>動線</p>
                        <StyledCommentStyle></StyledCommentStyle>

                        <div>{0}</div>
                     </div>
                     <div className='rating-option '>
                        <p>服務</p>
                        <StyledCommentStyle></StyledCommentStyle>
                        <div>{0}</div>
                     </div>
                     {/* <div className='flex items-center gap-1'>
                        <div className='w-[18px] h-[18px]'>
                           <img src={likeIcon} alt='點擊此按鈕，表達對這則留言的評價' />
                        </div>
                        <p>有幫助的評價</p>
                     </div> */}
                  </div>
               </StyledInfoComment>
            </StyledInfo>
         </DetailContainer>
         <StyledToolBar>
            <div className='option' onClick={storeExhibition}>
               <BaseImageBox width={'24px'} height={'24px'}>
                  <img src={isStore ? loveFullIcon : loveIcon} alt='收藏此展覽按鈕' />
               </BaseImageBox>
               <div>收藏展覽</div>
            </div>
            <div className='option'>
               <BaseImageBox width={'24px'} height={'24px'}>
                  <img src={shareIcon} alt='分享此展覽按鈕' />
               </BaseImageBox>
               <div>分享展覽</div>
            </div>
            <div className='option'>
               <BaseImageBox width={'24px'} height={'24px'}>
                  <img src={calendarIcon} alt='點擊按鈕，將展覽加入自己的行事曆' />
               </BaseImageBox>
               <div>加入月曆</div>
            </div>
         </StyledToolBar>
      </>
   )
}

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
   padding: 24px;
   .menu {
      display: flex;
      justify-content: space-between;
      margin-bottom: 40px;
   }
`
const DetailBanner = styled.section`
   display: flex;
   flex-direction: column;
   margin-bottom: 24px;

   .back {
      display: flex;
      margin-bottom: 16px;
   }
   a {
      cursor: pointer;
   }
`
const DetailOption = styled.a`
   display: flex;
   color: #929292;
   cursor: pointer;

   &:hover {
      color: #be8152;
   }
`

const BannerImage = styled.img`
   width: 1356.75px;
   height: 711px;
   border-radius: 10px;
   position: relative;
`
const StyledInfo = styled.article`
   display: flex;
   flex-direction: column;
   margin-bottom: 40px;

   .info {
      display: flex;
      flex-direction: column;
      gap: 8px;
      color: #535353;

      &-option {
         display: flex;
         gap: 12px;
      }
   }
   .menu {
      display: flex;
      gap: 12px;
      white-space: nowrap;
      overflow: scroll;
   }
`
const StyledInfoTitle = styled.a`
   font-size: 18px;
   font-weight: 700;
   color: #a9622a;
   border-left: 5px solid #a9622a;
   padding-left: 4px;
   margin-bottom: 16px;
`
const StyledInfoComment = styled.section`
   display: flex;
   flex-direction: column;
   gap: 16px;
   padding: 16px;
   border-radius: 12px;
   background-color: #f9f9f9;
   margin-bottom: 16px;

   .user {
      display: flex;
      gap: 12px;

      &-star {
         display: flex;
         gap: 4px;
      }
   }
   .rating {
      &-option {
         display: flex;
         flex-wrap: nowrap;
         align-items: center;
         gap: 12px;
      }
   }
`
const StyledCommentStyle = styled.div`
   padding: 4px;
   border-radius: 12px;
   height: 1px;
   width: 165px;
   background-color: #333;
`
const StyledToolBar = styled.div`
   position: fixed;
   bottom: 0;
   width: 100%;
   display: flex;
   justify-content: space-between;
   background-color: #ffffff;
   box-shadow: 0px -1px 4px rgba(0, 0, 0, 0.25);
   padding: 8px 32px;

   .option {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 4px;
      cursor: pointer;
   }
`
