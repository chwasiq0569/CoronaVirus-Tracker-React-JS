import React, { useEffect, useState } from "react";
import Card from "./Card/Card";
import SearchIcon from "@material-ui/icons/Search";
import "./homepage.scss";
import { sortData, unitConvert } from "../util/util";
import LineChart from "./LineChart/LineChart";
import PlottedMap from "./Map/PlottedMap";
import LineChartTwo from "./LineChart/LineChartTwo";
import Sidebar from "./../Sidebar/Sidebar";
import ListItem from "./ListItem/ListItem";
import ChartRenderer from "./LineChart/ChartRenderer";

const HomePage = () => {
  //in countries data of all countries stored
  const [countries, setCountries] = useState([]);
  //in selectedCountry data of clicked item will be stored
  const [selectedCountry, setSelectedCountry] = useState(null);
  //in worldwide state data of another api will be stored / contains data of worldwide (total overall deaths, recoveries, activecases)
  const [worldWide, setWorldWide] = useState(null);
  //searchData is for storing input value
  const [searchData, setSearchData] = useState("");
  //searchResultList will contain list of countries returned after search
  const [searchResultList, setSearchResultList] = useState([]);
  //mapCenter contain central location of map
  const [mapCenter, setMapCenter] = useState({
    lat: 37.09024,
    lng: -95.7128919,
  });
  //contain countries to plot on Map
  const [mapCountries, setMapCountries] = useState([]);
  //mapZoom contains initial zoom of Map
  const [mapZoom, setMapZoom] = useState(3);
  //casesStateWorldWide is used to plot cases on graph (incase of cases we will plot cases, incase of deaths we will plot deaths, incase of recovered we will plot recovered)
  const [casesStateWorldWide, setcasesStateWorldWide] = useState("cases");
  //casesStateCountry is used to plot cases on graph (incase of cases we will plot cases, incase of deaths we will plot deaths, incase of recovered we will plot recovered)
  const [casesStateCountry, setcasesStateCountry] = useState("cases");
  // const [selected, setSelected] = useState("");

  useEffect(() => {
    //fetching worldwide data
    let isMounted = true; // track whether component is mounted
    fetch(
      "https://cors-anywhere.herokuapp.com/https://disease.sh/v3/covid-19/all"
    )
      .then((response) => response.json())
      .then((data) => {
        if (isMounted) {
          setWorldWide({
            name: "Worldwide",
            cases: data.cases,
            active: data.active,
            recovered: data.recovered,
            deaths: data.deaths,
          });
        }
      })
      .catch((err) => {
        console.log("Error Occured: ", err);
        //if above call failed then call this api
        //honestly I dont know this is good approach or bad but the only solution i found
        console.log("Started 2nd Fetch");
        isMounted = true; // track whether component is mounted
        fetch(
          "https://cors-anywhere.herokuapp.com/https://disease.sh/v3/covid-19/all"
        )
          .then((response) => response.json())
          .then((data) => {
            if (isMounted) {
              setWorldWide({
                name: "Worldwide",
                cases: data.cases,
                active: data.active,
                recovered: data.recovered,
                deaths: data.deaths,
              });
            }
          })
          .catch((err) => console.log("2nd Request is also Failed: ", err));
      });
    //fetching data of all countries

    return () => {
      // clean up
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    let isMounted = true; // track whether component is mounted
    fetch(
      "https://cors-anywhere.herokuapp.com/https://disease.sh/v3/covid-19/countries"
    )
      .then((response) => response.json())
      .then((data) => {
        if (isMounted) {
          setMapCountries(data);
        }
        const countries = data.map((countries) => ({
          name: countries?.country,
          value: countries?.countryInfo?.iso3,
          cases: countries?.cases,
          active: countries?.active,
          recovered: countries?.recovered,
          deaths: countries?.deaths,
          lat: countries?.countryInfo?.lat, // we need this for plotting graph
          long: countries?.countryInfo?.long, // we need this for plotting graph
        }));
        //sortData is utility function that will sort data based on number of cases (in descending order)
        const sortedData = sortData(countries);
        //sorted data is stored in countries state
        if (isMounted) {
          setCountries(sortedData);
        }
        //at first before selecting any country result of country at index 0 will be dispalyed (the countries with higher no of cases)
        setSelectedCountry(sortedData[0]);
      })
      .catch((err) => {
        console.log("Error Occured: ", err);
        //if above call failed then call this api
        //honestly I dont know this is good approach or bad but the only solution i found
        console.log("Started 2nd Fetch");

        isMounted = true; // track whether component is mounted
        fetch(
          "https://cors-anywhere.herokuapp.com/https://disease.sh/v3/covid-19/countries"
        )
          .then((response) => response.json())
          .then((data) => {
            if (isMounted) {
              setMapCountries(data);
            }
            const countries = data.map((countries) => ({
              name: countries?.country,
              value: countries?.countryInfo?.iso3,
              cases: countries?.cases,
              active: countries?.active,
              recovered: countries?.recovered,
              deaths: countries?.deaths,
              lat: countries?.countryInfo?.lat, // we need this for plotting graph
              long: countries?.countryInfo?.long, // we need this for plotting graph
            }));
            //sortData is utility function that will sort data based on number of cases (in descending order)
            const sortedData = sortData(countries);
            //sorted data is stored in countries state
            if (isMounted) {
              setCountries(sortedData);
            }
            //at first before selecting any country result of country at index 0 will be dispalyed (the countries with higher no of cases)
            setSelectedCountry(sortedData[0]);
          })
          .catch((err) => console.log("2nd Request is also Failed: ", err));
      });
    return () => {
      // clean up
      isMounted = false;
    };
  }, []);

  //this function will set classNames
  //the className of "selected" will be given to selected Country
  function userToClass(user = "USA") {
    var userClass = "";
    // console.log(selectedCountry);
    if (user === selectedCountry?.name) {
      userClass = "selected";
    } else {
      userClass = "";
    }
    return userClass;
  }

  const searchDataFunc = (e) => {
    var queryData = [];
    //input is stored inside searchData state
    setSearchData(e.target.value);
    if (e.target.value !== "") {
      // basic searching logic
      countries.forEach(function (country) {
        if (
          country?.name.toLowerCase().includes(e.target.value.toLowerCase())
        ) {
          queryData.push(country);
        }
      });
    }
    setSearchResultList(queryData);
  };

  const individualCountry = (country) => {
    setSelectedCountry(country);
    setMapCenter({ lat: country?.lat, lng: country?.long });
  };

  return (
    <div className="homePage__Wrapper">
      <div className="inner__Wrapper">
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
                  placeholder="Search by Country"
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
                  {searchResultList.length !== 0
                    ? searchResultList.map((country) => (
                        <ListItem
                          key={country?.name}
                          onClickEvent={() => individualCountry(country)}
                          name={country?.name}
                          cases={unitConvert(country?.cases)}
                          styleClass={userToClass(country?.name)}
                        />
                      ))
                    : countries.map((country) => (
                        <ListItem
                          key={country?.name}
                          onClickEvent={() => individualCountry(country)}
                          name={country?.name}
                          cases={unitConvert(country?.cases)}
                          styleClass={userToClass(country?.name)}
                        />
                      ))}
                </ul>
              </div>
            </div>
            <div className="plotted__Map">
              <PlottedMap
                mapCountries={mapCountries}
                mapCenter={mapCenter}
                mapZoom={mapZoom}
                casesStateCountry={casesStateCountry}
              />
            </div>
          </div>
        </div>
        <div className="lower__Section">
          <div className="leftSide">
            <ChartRenderer
              render={(returnChart, options, loadingState) => (
                <LineChart
                  returnChart={returnChart}
                  options={options}
                  loadingState={loadingState}
                />
              )}
              casesStateWorldWide={casesStateWorldWide}
              apiInstance={
                "https://cors-anywhere.herokuapp.com/https://disease.sh/v3/covid-19/historical/all?lastdays=15"
              }
            />
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
