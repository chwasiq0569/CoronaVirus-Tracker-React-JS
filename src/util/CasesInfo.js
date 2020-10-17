import React from "react";
import numeral from "numeral";
import "./casesInfo.scss";

const CasesInfo = ({
  country,
  worldWide,
  setcasesStateWorldWide,
  worldWideData,
  setcasesStateCountry,
}) => {
  return (
    <div className={!worldWide ? "cases__Info" : "cases__Info2"}>
      <div
        className={!worldWide ? "info_Row" : "info_Row2"}
        onClick={() => {
          !worldWide
            ? setcasesStateCountry("cases")
            : setcasesStateWorldWide("cases");
        }}
      >
        <div
          className={!worldWide ? "leftSide" : "leftSide2"}
          onClick={() => {
            !worldWide
              ? setcasesStateCountry("cases")
              : setcasesStateWorldWide("cases");
          }}
        >
          <div className="markerBlue"></div>
          <p className="cases">Active Cases</p>
        </div>
        <div className={!worldWide ? "no_of_Cases" : "no_of_Cases_active"}>
          {numeral(country?.active).format("0,0")}
        </div>
      </div>
      <div
        className={!worldWide ? "info_Row" : "info_Row2"}
        onClick={() => {
          !worldWide
            ? setcasesStateCountry("recovered")
            : setcasesStateWorldWide("recovered");
        }}
      >
        <div
          className={!worldWide ? "leftSide" : "leftSide2"}
          onClick={() => {
            !worldWide
              ? setcasesStateCountry("recovered")
              : setcasesStateWorldWide("recovered");
          }}
        >
          <div className="markerGreen"></div>
          <p className="cases">Recovered</p>
        </div>
        <div className={!worldWide ? "no_of_Cases" : "no_of_Cases_recovered"}>
          {numeral(country?.recovered).format("0,0")}
        </div>
      </div>
      <div className={!worldWide ? "info_Row" : "info_Row2"}>
        <div
          className={!worldWide ? "leftSide" : "leftSide2"}
          onClick={() => {
            !worldWide
              ? setcasesStateCountry("deaths")
              : setcasesStateWorldWide("deaths");
          }}
        >
          <div className="markerRed"></div>
          <p className="cases">Deaths</p>
        </div>
        <div
          className={!worldWide ? "no_of_Cases" : "no_of_Cases_deaths"}
          onClick={() => {
            !worldWide
              ? setcasesStateCountry("deaths")
              : setcasesStateWorldWide("deaths");
          }}
        >
          {numeral(country?.deaths).format("0,0")}
        </div>
      </div>
    </div>
  );
};

export default CasesInfo;
