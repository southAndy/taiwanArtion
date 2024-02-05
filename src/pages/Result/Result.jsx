import { useState, useEffect, useMemo } from 'react'
import axios from 'axios'
import Card from '../../components/Card/Card'

export default function ResultPage() {
   let [temp, setTemp] = useState([])
   useEffect(() => {
      //todo 改為：讀取全域資料
      async function fetchData() {
         try {
            let response = await axios.get(
               'https://cloud.culture.tw/frontsite/trans/SearchShowAction.do?method=doFindTypeJ&category=6',
            )
            console.log(response.data)
            setTemp((temp = response.data))
         } catch (error) {
            console.log(error)
         }
      }
      fetchData()
   }, [])
   return (
      <>
         <h3>共個展覽</h3>
         <section>
            <div>
               <div>搜尋結果</div>
               <div>距離最近</div>
            </div>
            <div></div>
         </section>
         <section className='result'>
            <h4>所有展覽</h4>
            <section>
               {temp.map((item, index) => {
                  return <Card key={index} dataArr={item} />
               })}
            </section>
         </section>
      </>
   )
}
