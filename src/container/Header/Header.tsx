//本身設定
import "./Header.scss";
import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import Dropdown from "../../component/Dropdown";
import DateSelecter from "../../plugins/date-picker";

//images
import searchIcon from "../../assets/images/search-icon.png";
import dropdownIcon from "../../assets/images/Vector.png";
import fakeUserIcon from "../../assets/images/Ellipse22.png";
import notifyIcon from "../../assets/images/notify159.png";
import Input from "../../component/Input";

import styled from "@emotion/styled";
const StyledHeader = styled.header`
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 80px;
  width: 100%;
  box-sizing: border-box;
  //為了IOS 14.5以下裝置所設計
  margin-right: 16px;
  padding: 20px 40px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1);
  position: relative;
`;

type ResultProps = {
  userInput: string;
  exhibitionList: {
    title: string;
    descriptionFilterHtml: string;
    UID: string;
    imageUrl: string;
    discountInfo: string;
    startDate: string;
    endDate: string;
    showUnit: string;
  }[];
};
const ResultBox = styled.section`
  display: ${(props: { userInput: string }) =>
    props.userInput !== "" ? "block" : "none"};
  position: absolute;
  top: 81%;
  left: 20%;
  z-index: 2;
  width: 466px;
  border-radius: 20px;
  padding: 20px;
  height: auto;
  background: #ffffff;
  box-shadow: 2px -1px 4px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
`;
const ResultDropdown = ({ userInput, exhibitionList }: ResultProps) => {
  return (
    <>
      <ResultBox userInput={userInput}>
        {exhibitionList?.map((matched, index) => {
          return (
            <Link to={`/detail/${matched.UID}`}>
              <p>{matched.title}</p>
              <p>{"台南"}</p>
            </Link>
          );
        })}
      </ResultBox>
    </>
  );
};

type headerProps = {
  exhibitionList: {
    title: string;
    descriptionFilterHtml: string;
    UID: string;
    imageUrl: string;
    discountInfo: string;
    startDate: string;
    endDate: string;
    showUnit: string;
  }[];
  setClick: Function;
};

const Header = ({ setClick, exhibitionList }: headerProps) => {
  let [isShowModal, setShowMoal] = useState(false);
  let [isShowCity, setCityDrop] = useState<boolean>(false);
  let [keyword, setKeyword] = useState<string>("");
  let [city, setCurrentCity] = useState<string>("");
  let [exhibitionType, setExhibitionType] = useState<string>("");
  let navigate = useNavigate();
  let museumType: string[] = ["博物館", "文創園區", "美術館"];
  let cityList: string[] = ["台北", "新北", "台中", "台南", "高雄"];

  //? 進行展覽搜尋
  let matchedExhibitionList = useMemo(() => {
    let matchedResult;
    matchedResult = exhibitionList?.filter((exhibition, index) => {
      return exhibition.title.startsWith(keyword);
    });
    console.log("符合搜尋結果", matchedResult);
    if (matchedResult.length === 0) {
      return [];
    } else {
      return matchedResult;
    }
  }, [keyword]);

  //todo 確認 keyword 參數狀態後移除
  useEffect(() => {
    console.log(keyword);
  }, [matchedExhibitionList]);

  return (
    <header className="header-container">
      <Link to={"/"} className="logo">
        <img src="/src/assets/images/logo-05 3.png" alt="網站logo" />
      </Link>
      <div className="filter filter-box">
        <Input keyword={keyword} setKeyword={setKeyword} />
        <ResultDropdown
          userInput={keyword}
          exhibitionList={matchedExhibitionList}
        />
        {/* <DateSelecter /> */}
        <Dropdown
          dropName={"選擇城市"}
          dropMenu={cityList}
          keyword={city}
          selectedOption={setCurrentCity}
          isShowDrop={isShowCity}
          updateDrop={setCityDrop}
        />
        <Dropdown
          dropName={"選擇展區"}
          dropMenu={museumType}
          isShowDrop={isShowModal}
          updateDrop={setShowMoal}
          keyword={exhibitionType}
          selectedOption={setExhibitionType}
        />
        <Dropdown
          dropName={"開始日期"}
          isShowDrop={isShowModal}
          updateDrop={setShowMoal}
        />
        <Dropdown dropName={"結束日期"} />
        <div
          onClick={() => navigate(`/result/${keyword}`)}
          className="filter-item_button"
        >
          <img src={searchIcon} alt="搜尋樣式" />
        </div>
      </div>
      <Link to={`/nearby`}>附近展覽</Link>
      <Link to={`/detail`}>所有展覽</Link>
      {/* //todo 當登入狀態顯示鈴鐺按鈕 */}
      {/* <Dropdown icon={notifyIcon} /> */}
      {/* <Dropdown icon={fakeUserIcon}/> */}
      <div className="login" onClick={() => setClick((val) => (val = !val))}>
        註冊 / 登入
      </div>
    </header>
  );
};

export default Header;
