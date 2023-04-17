import { useState, useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import "./detail-page.scss";

type exhibitionType = {
  title: string;
  descriptionFilterHtml: String;
  UID: string;
  imageUrl: string;
  discountInfo: string;
  startDate: string;
  endDate: string;
  showUnit: string;
};

// const detailTitle = styled.h3`
//   color: #986f4f;
//   font-style: normal;
//   font-weight: 700;
//   font-size: 24px;
// `;

export default function DeatilPage() {
  let [exhibition, setExhibition] = useState<exhibitionType[]>([]);
  let params = useParams();

  //todo recall api to get page's data
  useEffect(() => {
    async function fetchData() {
      try {
        let response = await axios.get(
          "https://cloud.culture.tw/frontsite/trans/SearchShowAction.do?method=doFindTypeJ&category=6"
        );
        //todo 改從全域資料庫取
        setExhibition(() => (exhibition = response.data));
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  let currentData = useMemo(() => {
    return exhibition.filter((item) => item.UID === params.dataID);
  }, [exhibition]);
  console.log(currentData);

  return (
    <>
      <section>
        <div className="banner">
          <img className="banner-image" src={currentData[0]?.imageUrl} />
        </div>
        <p className="banner-title">{currentData[0]?.title}</p>
      </section>
      <section className="menu">
        <div className="menu-item">展覽總覽</div>
        <div className="menu-item">展覽簡介</div>
        <div className="menu-item">展覽票價</div>
        <div className="menu-item">展覽地點</div>
      </section>
      <article>
        <section className="info">
          <h3 className="info-title">展覽總覽</h3>
          <div>
            <div className="info-menu">展覽類別</div>
            <div className="info-menu">展覽日期</div>
            <div className="info-menu">營業時間</div>
            <div className="info-menu">主辦單位</div>
            <div className="info-menu">展覽官網</div>
            <div className="info-menu">展覽電話</div>
          </div>
        </section>
      </article>
    </>
  );
}
