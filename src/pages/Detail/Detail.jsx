import { useState, useEffect, useMemo } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Header from '../../container/Header/Header'
import Button from '../../components/Button'
import BaseImageBox from '../../styles/base/BaseImageBox'
import { db } from '../../../firebase.config'
import { updateDoc, doc, arrayUnion, getDoc, arrayRemove } from 'firebase/firestore'
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
import { breakpoint } from '../../styles/utils/breakpoint'

export default function DetailPage() {
   const params = useParams()
   const navigate = useNavigate()
   const [currentOption, setCurrentOption] = useState(0)
   const [isStore, setIsStore] = useState(false) // 聯動收藏愛心 icon

   const dispatch = useDispatch()
   const openData = useSelector((state) => state.common.openData)
   const user = useSelector((state) => state.member.memberInfo)
   const isLogin = useSelector((state) => state.member.isLogin)

   // 索取使用者資料
   useEffect(() => {
      if (isLogin) {
         // 取得最新的資料(查詢 localStorage)
         const data = JSON.parse(localStorage.getItem('favoriteExhibitions')) || []
         console.log('reading data', data)

         // 判斷是否已收藏
         const hasStoreUID = data.find((item) => item === params.id)
         if (hasStoreUID) {
            setIsStore(true)
         }
      }
   }, [isStore])

   // 新增展覽資料到 localStorage
   function addExhibition() {
      // 取得現有資料
      const data = JSON.parse(localStorage.getItem('favoriteExhibitions')) || []

      // 檢查是否已存在該展覽（以 id 判斷）
      if (data.find((item) => item === params.id)) {
         console.log('該展覽已收藏過了！')
         return
      }

      // 新增展覽到資料中
      data.push(params.id)

      // 更新 localStorage
      localStorage.setItem('favoriteExhibitions', JSON.stringify(data))
      console.log('展覽已加入收藏！')
   }
   // 移除展覽資料
   // 刪除展覽資料
   function deleteExhibition() {
      const data = JSON.parse(localStorage.getItem('favoriteExhibitions')) || []

      // 過濾掉要刪除的展覽
      const updatedData = data.filter((item) => item !== params.id)

      // 更新 localStorage
      localStorage.setItem('favoriteExhibitions', JSON.stringify(updatedData))
      console.log('展覽已刪除！')
   }

   // 分享展覽

   // todo 分享的網址能顯示簡單內容＋圖片
   function shareExhibition() {
      console.log('分享展覽')

      navigator
         .share({
            title: currentData[0].title, // 確保提供標題
            text: `來看看這個有趣的展覽吧！${currentData[0].title}`, // 提供分享內容
            url: window.location.href, // 確保提供網址s
         })
         .then(() => {
            console.log('分享成功！')
         })
         .catch((e) => {
            console.log('分享失敗！', e)
         })
   }

   function handleAddExhibition() {
      // 先判斷是否登入
      if (!document.cookie.includes('accessToken')) {
         navigate('/login', { state: { from: `/detail/${params.id}` } })
         return
      }
      if (isStore) {
         deleteExhibition()
      } else {
         addExhibition()
      }
      setIsStore((n) => !n)
   }

   // 取得使用者資料
   // async function getUserInfo(uid) {
   //    try {
   //       const userDatas = doc(db, 'users', uid)
   //       const docSnap = await getDoc(userDatas)
   //       // 存入 redux
   //       dispatch({ type: 'member/setMemberInfo', payload: docSnap.data() })
   //    } catch (e) {
   //       console.log(e)
   //    }
   // }

   // 當前展覽資料
   const currentData = useMemo(() => {
      return openData.filter((item) => item.UID === params.id)
   }, [openData])

   // 收藏展覽
   // const storeExhibition = async () => {
   //    //先判斷是否登入
   //    if (!isLogin) {
   //       navigate('/login')
   //       return
   //    }
   //    const userData = doc(db, 'users', user.uid)

   //    try {
   //       if (!isStore) {
   //          await updateDoc(userData, {
   //             favorite: arrayUnion(params.id),
   //          })
   //          setIsStore(() => true)
   //       } else {
   //          await updateDoc(userData, {
   //             favorite: arrayRemove(params.id),
   //          })
   //          setIsStore(() => false)
   //       }
   //    } catch (e) {
   //       console.log(e)
   //    }
   // }
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
               <BaseImageBox height={'245px'} tabletHeight={'280px'}>
                  <img className='rounded-xl' src={currentData[0]?.imageUrl} />
               </BaseImageBox>
               <h3 className='title text-[24px] font-bold'>{currentData[0]?.title}</h3>
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
               <DetailOption isActive={false} href='#comment'>
                  評價
               </DetailOption>
            </section>
            <StyledOverviewBox>
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
               <TabletToolBar>
                  <div className='option' onClick={handleAddExhibition}>
                     <BaseImageBox width={'24px'} height={'24px'}>
                        <img src={isStore ? loveFullIcon : loveIcon} alt='收藏此展覽按鈕' />
                     </BaseImageBox>
                     <div>收藏展覽</div>
                  </div>
                  <div className='option' onClick={shareExhibition}>
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
               </TabletToolBar>
            </StyledOverviewBox>
            <StyledContent>
               <StyledInfoTitle id='introduce'>展覽介紹</StyledInfoTitle>
               <p>{currentData[0]?.descriptionFilterHtml}</p>
            </StyledContent>
            <StyledInfo>
               <StyledInfoTitle id='price'>展覽票價</StyledInfoTitle>
               <p>{currentData[0]?.webSales ?? '-'}</p>
            </StyledInfo>
            <StyledInfo>
               <StyledInfoTitle id='place'></StyledInfoTitle>
            </StyledInfo>
            <StyledRateBox>
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
               <div className='menu'>
                  {/* todo 調整共用按鈕 */}
                  <Button content={'全部'}></Button>
                  <Button content={'最新評價'}></Button>
                  <Button content={'最高評價'}></Button>
                  <Button content={'撰寫評價'}></Button>
               </div>
            </StyledRateBox>
         </DetailContainer>
         <StyledToolBar>
            <div className='option' onClick={handleAddExhibition}>
               <BaseImageBox width={'24px'} height={'24px'}>
                  <img src={isStore ? loveFullIcon : loveIcon} alt='收藏此展覽按鈕' />
               </BaseImageBox>
               <div>收藏展覽</div>
            </div>
            <div className='option' onClick={shareExhibition}>
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

const TabletToolBar = styled.div`
   display: none;

   @media (min-width: ${breakpoint.tablet}px) {
      position: absolute;
      top: 0;
      right: 0;

      display: flex;
      gap: 24px;
      padding: 16px;
      background-color: #f9f9f9;
      border-radius: 12px;
      box-shadow: 0px 2px 7px 0px #0000001a;
   }

   .option {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 4px;
      cursor: pointer;
   }
`

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
      gap: 32px;
      margin-bottom: 40px;
   }
   @media (min-width: ${breakpoint.tablet}px) {
      padding: 24px 40px;
   }
`
const DetailBanner = styled.section`
   display: flex;
   flex-direction: column;
   margin-bottom: 24px;
   align-items: center;

   .back {
      display: flex;
      margin-bottom: 16px;
      align-self: flex-start;
      border-radius: 20px;
   }
   .title {
      font-weight: 700;
      font-size: 24px;
   }

   @media (min-width: ${breakpoint.tablet}px) {
      .title {
         font-size: 36px;
      }
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
const StyledInfo = styled.section`
   display: flex;
   flex-direction: column;
   margin-bottom: 40px;
`

const StyledRateBox = styled(StyledInfo)`
   .menu {
      display: flex;
      gap: 12px;
      white-space: nowrap;
      overflow: scroll;
   }
   @media (min-width: ${breakpoint.tablet}px) {
      .menu {
         overflow: auto;
      }
   }
`
const StyledOverviewBox = styled(StyledInfo)`
   position: relative; // 用於設定平版以上的固定按鈕

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
`
const StyledContent = styled(StyledInfo)`
   p {
      font-size: 16px;
      font-weight: 400;
      line-height: 35px;
      color: #535353;
      font-family: Noto Sans TC;
      text-align: left;
      text-underline-position: from-font;
      text-decoration-skip-ink: none;
   }
`

const StyledInfoTitle = styled.a`
   font-size: 18px;
   font-weight: 700;
   color: #bd7e4c;
   padding-left: 4px;
   margin-bottom: 16px;
   font-family: Noto Sans TC;
   font-size: 24px;
   font-weight: 700;
   line-height: 34.75px;
   text-align: left;
   text-underline-position: from-font;
   text-decoration-skip-ink: none;

   @media (min-width: ${breakpoint.tablet}px) {
      font-size: 24px;
   }
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

   @media (min-width: ${breakpoint.tablet}px) {
      display: none;

      .option {
         justify-content: center;
      }
   }
`
