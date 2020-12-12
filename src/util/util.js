import React from "react";
import numeral from "numeral";
import { Circle, Popup } from "react-leaflet";
import "./util.scss";
import CasesInfo from "./CasesInfo";

export function truncate(str, n) {
  return str?.length > n ? str.substr(0, n - 1) + "....." : str;
}
export const mapCountriesData = (data) => {
  return data.map((countries) => ({
    //created object
    name: countries.country,
    value: countries.countryInfo.iso3,
    cases: countries.cases,
    newcases: countries.todayCases,
    deaths: countries.deaths,
    newdeaths: countries.todayDeaths,
    active: countries.active,
    recovered: countries.recovered,
    seriouscritical: countries.critical,
  }));
};
//sort cases in descendin order
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
  //data contain countries
  return data.map((country) => (
    // imported Circle and Popup from leaflet library
    <Circle
      key={country.country}
      center={[country.countryInfo.lat, country.countryInfo.long]}
      fillOpacity={0.4}
      //casesTypeColors is object that contains circle colors
      color={casesTypeColors[casesType].hex}
      fillColor={casesTypeColors[casesType].hex}
      //here in radius i basically applied formula
      //country[casesType] = country.cases (number of cases)
      //casesTypeColors[casesType].multiplier = 800 || 1200 || 2000
      radius={
        Math.sqrt(country[casesType]) * casesTypeColors[casesType].multiplier
      }
    >
      {/* popup will appear on clicking circle */}
      <Popup>
        <div className="popUp_Container">
          <div className="heading">
            <h4>{country.country}</h4>
            <h4>{numeral(country.cases).format("0,0")}</h4>
          </div>
          {/* worldwide prop will be used to conditionally render some styles and for applying some classes */}
          <CasesInfo country={country} worldWide={false} />
        </div>
      </Popup>
    </Circle>
  ));
};
