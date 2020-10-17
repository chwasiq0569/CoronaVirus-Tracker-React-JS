import React from "react";
import CasesInfo from "./../../util/CasesInfo";
import numeral from "numeral";
import "./individualCard.scss";

const IndividualCard = ({ country }) => {
  return (
    <div className="card__Wrapper">
      <div className="TopHeadings">
        <h3>CoronaVirus Cases&nbsp; </h3>
        <h5>- &nbsp; {country?.name}</h5>
      </div>
      <p className="uppercase">TOTAL CONFIRMED CASES</p>
      <h1 className="no_Of_Cases">{numeral(country?.cases).format("0,0")}</h1>
      <CasesInfo country={country} />
    </div>
  );
};

export default IndividualCard;
