import { useState, useEffect, useMemo } from "react";
import "./evaluate-card.scss";
const evaluateCard = () => {
  return (
    <>
      <section>
        <div className="user">
          <div className="user-photo">
            <img src="" alt="" />
          </div>
          <p className="user-name">{"Kristin Watson"}</p>
        </div>
        <div className="evaluate star-shape"></div>
        <div>
          <div>
            <img src="" alt="" />
          </div>
          <p>有幫助的評價</p>
        </div>
      </section>
    </>
  );
};

export default evaluateCard;
