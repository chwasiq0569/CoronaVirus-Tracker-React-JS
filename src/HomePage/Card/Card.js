import React from "react";
import "./card.scss";
import CasesInfo from "./../../util/CasesInfo";
import "react-count-animation/dist/count.min.css";
import AnimationCount from "react-count-animation";
import Skeleton from "@material-ui/lab/Skeleton";

const Card = ({
  country,
  worldWide,
  setcasesStateWorldWide,
  worldWideData,
  setcasesStateCountry,
}) => {
  const settings = {
    start: 0,
    count: parseInt(country?.cases),
    duration: 3500,
    decimals: 0,
    useGroup: true,
    animation: "up",
  };
  return !country ? (
    <Skeleton
      variant="rect"
      width="100%"
      height="70%"
      style={{ marginBottom: "0.5rem" }}
    />
  ) : (
    <div className="card__Wrapper">
      <div className="TopHeadings">
        <h3>CoronaVirus Cases&nbsp; </h3>
        <h5>- &nbsp; {country?.name}</h5>
      </div>
      <p className="uppercase">TOTAL CONFIRMED CASES</p>
      {/* <h1 className="no_Of_Cases">{numeral(country?.cases).format("0,0")}</h1> */}
      <h1 className="no_Of_Cases">
        {country?.cases ? <AnimationCount {...settings} /> : "0"}
      </h1>
      {/* <CountUp end={vars} /> */}
      <CasesInfo
        country={country}
        worldWide={worldWide}
        setcasesStateWorldWide={setcasesStateWorldWide}
        worldWideData={worldWideData}
        setcasesStateCountry={setcasesStateCountry}
      />
    </div>
  );
};

export default Card;
