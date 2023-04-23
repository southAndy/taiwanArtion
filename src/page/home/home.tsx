import { useEffect, useState, useMemo } from "react";
import React from "react";

//third-part
import axios from "axios";
import dayjs from "dayjs";
import "./home.scss";
import SwiperSlide from "../../plugins/Swiper/swiper-slide";

import Header from "../../container/Header/Header";
import Card from "../../component/Card/Card";
import NewSection from "../../container/News/New";
import Modal from "../../component/modal/Modal";
import { Link } from "react-router-dom";

// import db from "../../../firebase.config";
// import { collection, getDocs } from "firebase/firestore";

const categoryIcons: string[] = [];

const HomePage = () => {
  interface Month {
    name: String;
    number: Number;
  }
  const monthList: { name: string; value: number }[] = [
    { name: "一月", value: 1 },
    { name: "二月", value: 2 },
    { name: "三月", value: 3 },
    { name: "四月", value: 4 },
    { name: "五月", value: 5 },
    { name: "六月", value: 6 },
    { name: "七月", value: 7 },
    { name: "八月", value: 8 },
    { name: "九月", value: 9 },
    { name: "十月", value: 10 },
    { name: "十一月", value: 11 },
    { name: "十二月", value: 12 },
  ];

  type exhibitionType = {
    title: string;
    descriptionFilterHtml: string;
    UID: string;
    imageUrl: string;
    discountInfo: string;
    startDate: string;
    endDate: string;
    showUnit: string;
  };

  let [exhibitionList, setList] = useState<exhibitionType[]>([]);
  let [currentMonth, setMonth] = useState(3);
  let [isShowModal, setModal] = useState(false);
  let [isClick, setClick] = useState(false);
  let selectedExhibition = useMemo(() => {
    return exhibitionList.filter(
      (data: exhibitionType) => data.imageUrl !== ""
    );
  }, [exhibitionList, currentMonth]);

  useEffect(() => {
    async function fetchData() {
      try {
        let response = await axios.get(
          "https://cloud.culture.tw/frontsite/trans/SearchShowAction.do?method=doFindTypeJ&category=6"
        );
        setList(() => (exhibitionList = response.data));
        //從 firestore 取出資料，並存入 state 中, firestore 資料架構：data.docs[0]._document.data.value.mapValue.fields => 單筆資料
        // let data = await getDocs(collection(db,'exhibitions'));
        // setList(() => exhibitionList = data.docs)
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);
  return (
    <>
      <Modal isClick={isClick} setClick={setClick} />
      <Header setClick={setClick} />
      <SwiperSlide dataArr={selectedExhibition} />
      <div className="months">
        {monthList.map((month, index) => {
          return (
            <div
              onClick={() => setMonth(month.value)}
              className="months-item"
              key={index}
            >
              {month.name}
            </div>
          );
        })}
      </div>
      <section className="category">
        {categoryIcons.map((category, index) => {
          return (
            <div className="category-item" key={index}>
              <div>1</div>
              <p>2</p>
            </div>
          );
        })}
      </section>
      <main>
        <section className="exhibition">
          <div>
            <h3>熱門展覽</h3>
          </div>
          <div className="exhibition-card">
            {selectedExhibition.map((item) => {
              return (
                <Link to={`/detail/${item.UID}`}>
                  <Card key={item.UID} dataArr={item} />
                </Link>
              );
            })}
          </div>
        </section>
        {/* <NewSection /> */}
        <section className="result">
          <h4>所有展覽</h4>
          <section>
            {selectedExhibition.map((item, index) => {
              return <Card key={index} dataArr={item} />;
            })}
          </section>
        </section>
      </main>
    </>
  );
};

export default HomePage;
