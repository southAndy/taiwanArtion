import { useEffect, useState, useMemo } from 'react';

//third-part
import axios from 'axios';
import dayjs from 'dayjs'

import Header from '../../container/Header/Header'
import SwiperSlide from '../../plugins/Swiper/swiper-slide'
import Card from "../../component/Card/Card";
import NewSection from '../../container/News/New';
import Modal from '../../component/modal/Modal';


import db from "../../../firebase.config";
import { collection,getDocs } from 'firebase/firestore';


import './home.scss'

//圖檔 類別區
import category1 from "../../assets/images/categoryicon1.png";
import category2 from "../../assets/images/categoryicon2.png";
import category3 from "../../assets/images/categoryicon3.png";
import category4 from "../../assets/images/categoryicon4.png";
import category5 from "../../assets/images/categoryicon5.png";
import category6 from "../../assets/images/categoryicon6.png";
import category7 from "../../assets/images/categoryicon7.png";
import category8 from "../../assets/images/categoryicon8.png";
import category9 from "../../assets/images/categoryicon9.png";
import category10 from "../../assets/images/categoryicon10.png";

const HomePage = () => {

    const monthList = [{ name: '一月', value: 1 }, { name: '二月', value: 2 }, { name: '三月', value: 3 }, { name: '四月', value: 4 }, { name: '五月', value: 5 }, { name: '六月', value: 6 }, { name: '七月', value: 7 }, { name: '八月', value: 8 }, { name: '九月', value: 9 }, { name: '十月', value: 10 }, { name: '十一月', value: 11 }, { name: '十二月', value: 12 }, { name: '全部', value: 'all' }];

    let categoryIcons = [{ file: category10, name: '繪畫' }, { file: category1, name: '雕塑' },
    { file: category7, name: '書法' }, { file: category6, name: '設計' }, { file: category8, name: '文學' }, { file: category6, name: '攝影' },
    { file: category3, name: '歷史古物' }, { file: category4, name: '裝置藝術' }, { file: category5, name: '影音' }]
    let tempExhibition = ['1', '2', '3', '4', '5']
    let tempResult = Array.from(20).fill(9);

    //? 展覽資料 state
    let [exhibitionList, setList] = useState([])
    let [currentMonth, setMonth] = useState('all')
    let [category, setCategory] = useState(null)
    //管理彈窗
    let [isShowModal,setModal] = useState(false)
    let [isClick,setClick]=useState(false)

    let selectedExhibition = useMemo(() => {
        //  return exhibitionList.filter((exhibition)=> (currentMonth==='all' || dayjs(exhibition.startDate).isAfter(dayjs()) && (!category)))
        return exhibitionList.filter((data)=>data.imageUrl!='')
    }, [exhibitionList,currentMonth, category])

    useEffect(() => {
        console.log(selectedExhibition)
        
    }, [selectedExhibition])


    //? 呼叫展覽API
    useEffect(() => {
        async function fetchData() {
            try {
                // let response = await axios.get('https://cloud.culture.tw/frontsite/trans/SearchShowAction.do?method=doFindTypeJ&category=6').then((data)=>{
                //     console.log(data);
                //     data.data.forEach((data,index)=>{
                //         addDoc(collection(db, "exhibitions"),data)
                //     })
                // })
                //todo 從 firestore 取出資料，並存入 state 中
                let data = await getDocs(collection(db,'exhibitions'));
                console.log(data.docs[0]._document.data.value.mapValue.fields);
                // setList(() => exhibitionList = response.data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchData()
    }, [])

    const setValue = (newValue) => {
        value = newValue
    }
    return (
        <>
            <Modal isClick={isClick} setClick={setClick}/>
            <Header setClick={setClick}/>
            <SwiperSlide dataArr={selectedExhibition.slice(0,5)}/>
            <div className="months">
                {monthList.map((month, index) => {
                    return (<div onClick={() => setMonth(month.value)} className='months-item' key={index}>{month.name}</div>)
                })}
            </div>
            <section className='category'>
                {categoryIcons.map((category, index) => {
                    return (
                        <div className='category-item' key={index}>
                            <div>
                                <img src={category.file} />
                            </div>
                            <p>{category.name}</p>
                        </div>
                    )
                })}
            </section>
            <main>
                <section className="exhibition">
                    <div>
                        <h3>熱門展覽</h3>
                    </div>
                    <div className='exhibition-card'>
                        {selectedExhibition.map((item) => {
                            return (<Card key={item.UID} dataArr={item} />)
                        })}
                    </div>
                </section>
                <NewSection />
                <section className='result'>
                    <h4>所有展覽</h4>
                    <section>
                        {selectedExhibition.map((item, index) => {
                            return <Card key={index} dataArr={item}/>
                        })}
                    </section>
                </section>
            </main>
        </>
    )
}

export default HomePage