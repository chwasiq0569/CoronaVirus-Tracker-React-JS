import React, { useEffect } from "react";
import numeral from "numeral";
import "./casesInfo.scss";

const CasesInfo = ({
  country,
  worldWide,
  setcasesStateWorldWide,
  worldWideData,
  setcasesStateCountry,
}) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const settingStateByCheckingStatusofWorldWide = (p1, p2) =>
    !worldWide ? setcasesStateCountry(p1) : setcasesStateWorldWide(p2);
  window.scrollTo(0, document.body.scrollHeight);

  return (
    <div className={!worldWide ? "cases__Info" : "cases__Info2"}>
      <div
        className={!worldWide ? "info_Row" : "info_Row2"}
        onClick={() => {
          settingStateByCheckingStatusofWorldWide("cases", "cases");
        }}
      >
        <div
          className={!worldWide ? "leftSide" : "leftSide2"}
          onClick={() => {
            settingStateByCheckingStatusofWorldWide("cases", "cases");
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
          settingStateByCheckingStatusofWorldWide("recovered", "recovered");
        }}
      >
        <div
          className={!worldWide ? "leftSide" : "leftSide2"}
          onClick={() => {
            settingStateByCheckingStatusofWorldWide("recovered", "recovered");
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
            settingStateByCheckingStatusofWorldWide("deaths", "deaths");
          }}
        >
          <div className="markerRed"></div>
          <p className="cases">Deaths</p>
        </div>
        <div
          className={!worldWide ? "no_of_Cases" : "no_of_Cases_deaths"}
          onClick={() => {
            settingStateByCheckingStatusofWorldWide("deaths", "deaths");
          }}
        >
          {numeral(country?.deaths).format("0,0")}
        </div>
      </div>
    </div>
  );
};

export default CasesInfo;
