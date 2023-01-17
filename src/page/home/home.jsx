import Header from '../../container/Header/Header'
import Scrolls from '../../plugins/Swiper/Swiper'
import Card from "../../component/Card/Card";
import NewSection from '../../container/News/New';


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

const HomePage = ()=>{

    const monthList =['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月','全部'];
    let categoryIcons = [{file:category1,name:'雕塑'},{file:category2,name:'裝置藝術'},{file:category3,name:'歷史古物'},{file:category4,name:'裝置藝術'},{file:category5,name:'影音'},{file:category6,name:'設計'},{file:category7,name:'書法'},{file:category8,name:'裝置藝術'},{file:category9,name:'裝置藝術'},{file:category10,name:'繪畫'}]
    let tempExhibition =['1','2','3','4','5']
    let tempResult = Array.from(20).fill(9);
    console.log(27,tempResult);
    
    return (
        <>
            <Header/>
            <Scrolls/>
            <div className="months">
                {monthList.map((month)=>{
                    return (<div className='months-item'>{month}</div>)
                })}
            </div>
            <section className='category'>
                {categoryIcons.map((category,index)=>{
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
                        {tempExhibition.map((item,index)=>{
                            return (<Card key={index}/>)
                        })}
                    </div>
                </section>
                <NewSection/>
                <section className='result'>
                    <h4>所有展覽</h4>
                    <section>
                        {monthList.map((item,index)=>{
                            return (<Card key={index}/>)
                        })}
                    </section>
                </section>
            </main>
        </>
    )
}

export default HomePage