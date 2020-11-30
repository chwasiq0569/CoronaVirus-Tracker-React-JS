import React from "react";
import numeral from "numeral";
import { Circle, Popup } from "react-leaflet";
import "./util.scss";
import CasesInfo from "./CasesInfo";

export const sortData = (data) => {
  const sortedData = [...data];
  sortedData.sort((a, b) => {
    if (a.cases > b.cases) {
      return -1;
    } else {
      // console.log("a: ", a, "b: ", b);
      return 1;
    }
  });
  return sortedData;
};

export const unitConvert = (value) =>
  value ? `+${numeral(value).format("0,0a")}` : value;

const casesTypeColors = {
  cases: {
    hex: "#6b7add",
    multiplier: 800,
  },
  recovered: {
    hex: "#008000",
    multiplier: 1200,
  },
  deaths: {
    hex: "#FF0000",
    multiplier: 2000,
  },
};

export const plottingDataOnMap = (data, casesType = "cases") => {
  return data.map((country) => (
    <Circle
      key={country.country}
      center={[country.countryInfo.lat, country.countryInfo.long]}
      fillOpacity={0.4}
      color={casesTypeColors[casesType].hex}
      fillColor={casesTypeColors[casesType].hex}
      radius={
        Math.sqrt(country[casesType]) * casesTypeColors[casesType].multiplier
      }
    >
      <Popup>
        <div className="popUp_Container">
          <div className="heading">
            <h4>{country.country}</h4>
            <h4>{numeral(country.cases).format("0,0")}</h4>
          </div>
          <CasesInfo country={country} worldWide={false} />
        </div>
      </Popup>
    </Circle>
  ));
};
