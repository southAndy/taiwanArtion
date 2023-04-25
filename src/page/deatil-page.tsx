import { useState, useEffect, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

import "./detail-page.scss";
import styled from "@emotion/styled";

const DetailTitle = styled.h3`
  border-left: 10px solid #986f4f;
  // border-radius: 10px 10px;
  font-family: "Noto Sans TC";
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  line-height: 35px;
  color: #986f4f;
`;
const DetailContainer = styled.section`
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding: 0 40px;
`;
const DetailBanner = styled.section`
  display: flex;
  flex-direction: column;
`;
const DetailOption = styled.p`
  padding: 20px;
  cursor: pointer;
  border-bottom: ${(props: { isActive: boolean }) =>
    props.isActive ? "5px #986F4F solid" : "none"};
  color: ${(props: { isActive: boolean }) =>
    props.isActive ? "#986F4F" : "black"};
`;

const BannerImage = styled.img`
  width: 1356.75px;
  height: 711px;
  border-radius: 10px;
  position: relative;
`;

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

export default function DetailPage() {
  let [exhibition, setExhibition] = useState<exhibitionType[]>([]);
  let params = useParams();
  let [currentOption, setCurrentOption] = useState<number>(0);
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
  // let getCurrentOption = useMemo(()=>,[currentOption])

  return (
    <>
      <DetailContainer>
        <DetailBanner>
          <Link to={"/"}>返回首頁</Link>
          <div className="banner">
            <img className="banner-image" src={currentData[0]?.imageUrl} />
          </div>
          <p className="banner-title">{currentData[0]?.title}</p>
        </DetailBanner>
        <section className="menu">
          <DetailOption isActive={true}>展覽總覽</DetailOption>
          <DetailOption isActive={false}>展覽簡介</DetailOption>
          <DetailOption isActive={false}>展覽票價</DetailOption>
          <DetailOption isActive={false}>地點總覽</DetailOption>
        </section>
        <article>
          <section className="info">
            <DetailTitle>展覽簡介</DetailTitle>
            <p>{currentData[0]?.descriptionFilterHtml}</p>
          </section>
        </article>
      </DetailContainer>
    </>
  );
}
