import { useState, useEffect, useMemo } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setMemberInterests } from '../../store/memberSlice'
import Header from '../../container/Header/Header'
import Button from '../../components/Button'
import BaseImageBox from '../../styles/base/BaseImageBox'
import {
   calendarIcon,
   shareIcon,
   sampleResult,
   vectorIcon,
   unStarIcon,
   loveIcon,
   likeIcon,
} from '../../assets/images'
import styled from '@emotion/styled'

export default function DetailPage() {
   let [exhibition, setExhibition] = useState([])
   const params = useParams()
   const navigate = useNavigate()
   const [currentOption, setCurrentOption] = useState(0)
   // 是否收藏此展覽
   const [isStore, setIsStore] = useState(false)
   const dispatch = useDispatch()
   const isLogin = useSelector((state) => state.member.isLogin)
   const interestList = useSelector((state) => state.member.interests)
   const currentData = useMemo(() => {
      return exhibition.filter((item) => item.UID === params.dataID && item.imageUrl !== '')
   }, [exhibition])

   const storeExhibition = () => {
      //先判斷是否登入
      if (isLogin) {
         // 如果登入，可以將此展覽加入收藏
         setIsStore(true)
         //加入會員的收藏清單
         dispatch(setMemberInterests(['ID12354E']))
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
               <div className='h-[285px] mb-6 rounded-xl'>
                  <img className='rounded-xl' src={sampleResult} />
               </div>
               <h3 className='text-[24px] font-bold'>
                  {'會動的文藝復興 Friendship Blooming in Music'}
               </h3>
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
                     <div>2022.12.01(一）- 2022.12.01(一）</div>
                  </div>
                  <div className='info-option'>
                     <div>營業時間</div>
                     <div>9:00a.m - 10:00p.m</div>
                  </div>
                  <div className='info-option'>
                     <div>主辦單位</div>
                     <div>Queeny女人迷你俱樂部</div>
                  </div>

                  <div className='info-option'>
                     <div>展覽官網</div>
                     <a href='https://womany.net/terms' className='flex text-blue-300'>
                        Queeny女人迷你俱樂部
                     </a>
                  </div>
                  <div className='info-option'>
                     <div>展覽電話</div>
                     <div>(02)-23530506</div>
                  </div>
               </div>
            </StyledInfo>
            <StyledInfo>
               <StyledInfoTitle id='introduce'>展覽介紹</StyledInfoTitle>
               <p>
                  自然寫作中的一種特殊形式，是「動物小說」。人將自己放到動物的環境中，探索動物與自然的關係，進而從中獲取如何與自然共處的教訓或智慧。讀者當然知道作者不可能真正化身為動物，然而卻又被刺激出了最高度的好奇心與跨物種的同情心。
                  有一個相當長的時代，從美國開始而影響全世界，將「動物小說」視為小孩，至少是小男孩成長必備的讀物，強調「動物小說」所能提供的特殊情感體驗。『野性的呼喚』和『鹿苑長春』就是那個時代中出現最具有代表性的經典作品...自然寫作中的一種特殊形式，是「動物小說」。人將自己放到動物的環境中，探索動物與自然的關係，進而從中獲取如何與自然共處的教訓或智慧。讀者當然知道作者不可能真正化身為動物，然而卻又被刺激出了最高度的好奇心與跨物種的同情心。
                  有一個相當長的時代，從美國開始而影響全世界，將「動物小說」視為小孩，至少是小男孩成長必備的讀物，強調「動物小說」所能提供的特殊情感體驗。『野性的呼喚』和『鹿苑長春』就是那個時代中出現最具有代表性的經典作品...自然寫作中的一種特殊形式，是「動物小說」。
               </p>
            </StyledInfo>
            <StyledInfo>
               <StyledInfoTitle id='price'>展覽票價</StyledInfoTitle>
               <p>
                  全票 ＄199 備註：11/25-12/1優惠活動正式開跑,凡購買早鳥優惠送一顆大蘋果。
                  學生票＄199 備註：11/25-12/1優惠活動正式開跑,凡購買早鳥優惠送一顆大蘋果。
                  團體票＄199 備註：11/25-12/1優惠活動正式開跑,凡購買早鳥優惠送一顆大蘋果。
                  愛心票＄199 備註：11/25-12/1優惠活動正式開跑,凡購買早鳥優惠送一顆大蘋果。 免票入場
                  須出示相關證件 年齡未滿五歲之兒童
                  (須由一位大人持票陪同入場)，未帶證件以身高110公分作判定。
               </p>
            </StyledInfo>
            <StyledInfo>
               <StyledInfoTitle id='place'>展覽地點</StyledInfoTitle>
               <div>place</div>
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
                  <img src={loveIcon} alt='收藏此展覽按鈕' />
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
