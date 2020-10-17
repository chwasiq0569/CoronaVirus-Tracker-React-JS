import React, { useEffect, useState } from "react";
import Card from "./Card/Card";
import SearchIcon from "@material-ui/icons/Search";
import "./homepage.scss";
import { sortData, unitConvert } from "../util/util";
import LineChart from "./LineChart/LineChart";
import PlottedMap from "./Map/PlottedMap";
import LineChartTwo from "./LineChart/BarChartTwo";
import Sidebar from "./../Sidebar/Sidebar";

const HomePage = () => {
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [worldWide, setWorldWide] = useState(null);
  const [searchData, setSearchData] = useState("");
  const [searchResultList, setSearchResultList] = useState([]);
  const [mapCenter, setMapCenter] = useState({
    lat: 37.09024,
    lng: -95.7128919,
  });
  const [mapCountries, setMapCountries] = useState([]);
  const [mapZoom, setMapZoom] = useState(3);
  const [casesStateWorldWide, setcasesStateWorldWide] = useState("cases");
  const [casesStateCountry, setcasesStateCountry] = useState("cases");
  const [selected, setSelected] = useState("");

  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
      .then((response) => response.json())
      .then((data) => {
        setWorldWide({
          name: "Worldwide",
          cases: data.cases,
          active: data.active,
          recovered: data.recovered,
          deaths: data.deaths,
        });
      });
  }, []);
  function userToClass(user = "USA") {
    var userClass = "";
    console.log(selectedCountry);
    if (user === selectedCountry?.name) {
      userClass = "selected";
    } else {
      userClass = "";
    }
    return userClass;
  }
  const searchDataFunc = (e) => {
    var queryData = [];
    setSearchData(e.target.value);
    if (e.target.value != "") {
      countries.forEach(function (country) {
        if (
          country?.name.toLowerCase().indexOf(e.target.value.toLowerCase()) !==
          -1
        ) {
          if (queryData.length < 10) {
            queryData.push(country);
          }
        }
      });
    }
    console.log("queryData:", queryData);
    setSearchResultList(queryData);
    // this.setState({ list: queryData });
  };

  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/countries")
      .then((response) => response.json())
      .then((data) => {
        setMapCountries(data);
        const countries = data.map((countries) => ({
          name: countries?.country,
          value: countries?.countryInfo?.iso3,
          cases: countries?.cases,
          active: countries?.active,
          recovered: countries?.recovered,
          deaths: countries?.deaths,
          lat: countries?.countryInfo?.lat,
          long: countries?.countryInfo?.long,
        }));
        const sortedData = sortData(countries);
        console.log(sortedData);
        setCountries(sortedData);
        setSelectedCountry(sortedData[0]);
      });
  }, []);

  const individualCountry = (country) => {
    setSelectedCountry(country);
    setMapCenter({ lat: country?.lat, lng: country?.long });
    console.log(country);
  };

  return (
    <div className="homePage__Wrapper">
      <div className="inner__Wrapper">
        <Sidebar />
        <div className="upper__Section">
          <div className="upper__leftSide">
            <Card
              country={worldWide}
              worldWide={true}
              setcasesStateWorldWide={setcasesStateWorldWide}
              setcasesStateCountry={setcasesStateCountry}
              worldWideData={worldWide}
            />
            <Card
              country={selectedCountry}
              worldWide={false}
              setcasesStateWorldWide={setcasesStateWorldWide}
              setcasesStateCountry={setcasesStateCountry}
              worldWideData={worldWide}
            />
          </div>

          <div className="upper__rightSide">
            <div className="countries__Filter">
              <div className="SearchBar__Container">
                <input
                  type="search"
                  placeholder="Cases by Country"
                  value={searchData}
                  onChange={searchDataFunc}
                />
                <SearchIcon
                  style={{
                    backgroundColor: "#f7f8fc",
                    color: "#737585",
                    fontSize: "1.2rem",
                  }}
                />
              </div>
              <div className="countries__List">
                <ul>
                  {searchResultList.length > 0
                    ? searchResultList.map((country) => (
                        <li
                          key={country?.value}
                          onClick={() => individualCountry(country)}
                        >
                          <span>{country?.name}</span>
                          <span>{unitConvert(country?.cases)}</span>
                        </li>
                      ))
                    : countries.map((country, i) => (
                        <li
                          key={country?.name}
                          onClick={() => individualCountry(country)}
                          className={userToClass(country?.name)}
                        >
                          <span>{country?.name}</span>
                          <span>{unitConvert(country?.cases)}</span>
                        </li>
                      ))}
                </ul>
              </div>
            </div>
            <div className="plotted__Map">
              <PlottedMap
                mapCountries={mapCountries}
                mapCenter={mapCenter}
                mapZoom={mapZoom}
                casesStateWorldWide={casesStateWorldWide}
                casesStateCountry={casesStateCountry}
              />
            </div>
          </div>
        </div>
        <div className="lower__Section">
          <div className="leftSide">
            <LineChart casesStateWorldWide={casesStateWorldWide} />
          </div>
          <div className="rightSide">
            <LineChartTwo
              casesStateCountry={casesStateCountry}
              country={selectedCountry}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
