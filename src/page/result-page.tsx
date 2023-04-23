import { useState, useEffect, useMemo } from "react";
import axios from "axios";

import Card from "../../src/component/Card/Card";

export default function ResultPage() {
  let [temp, setTemp] = useState([]);
  useEffect(() => {
    //todo 改為：讀取全域資料
    async function fetchData() {
      try {
        let response = await axios.get(
          "https://cloud.culture.tw/frontsite/trans/SearchShowAction.do?method=doFindTypeJ&category=6"
        );
        // setList(() => (exhibitionList = response.data));
        //從 firestore 取出資料，並存入 state 中, firestore 資料架構：data.docs[0]._document.data.value.mapValue.fields => 單筆資料
        // let data = await getDocs(collection(db,'exhibitions'));
        // setList(() => exhibitionList = data.docs)
        console.log(response.data);
        setTemp((temp = response.data));
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);
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
      <section className="result">
        <h4>所有展覽</h4>
        <section>
          {temp.map((item, index) => {
            return <Card key={index} dataArr={item} />;
          })}
        </section>
      </section>
    </>
  );
}
