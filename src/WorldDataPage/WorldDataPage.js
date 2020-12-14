import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import "./worlddatapage.scss";
import numeral from "numeral";
import { sortData } from "./../util/util";
import CircularProgress from "@material-ui/core/CircularProgress";
import { mapCountriesData } from "../util/util";
import allCountriesBackup from "../backUpData/allCountries.json";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
    borderRadius: "5px",
    backgroundColor: "#F7F8FC",
  },
  borderLeftCell: {
    borderLeft: "1px solid #dee0f4",
  },
  newDeathsHighlight: {
    backgroundColor: "red",
    fontWeight: "550",
    color: "white",
  },
  bolderText: {
    fontWeight: "550",
  },
});
//name of columns
function createData(
  country,
  totalcases,
  newcases,
  totaldeaths,
  newdeaths,
  totalrecovered,
  activecases,
  seriouscritical
) {
  return {
    country,
    totalcases,
    newcases,
    totaldeaths,
    newdeaths,
    totalrecovered,
    activecases,
    seriouscritical,
  };
}
const WorldDataPage = () => {
  const [countries, setCountries] = useState([]);
  const [info, setInfo] = useState([]);
  const [loadingState, setLoadingState] = useState(true);
  let controller = new AbortController();

  const fetchingApi = (api, isMounted) => {
    if (api) {
      return fetch(api, { signal: controller.signal })
        .then((response) => response.json())
        .then((data) => {
          //countriesData is an array
          if (isMounted) {
            const countriesData = mapCountriesData(data);
            const sortedData = sortData(countriesData);
            setCountries(sortedData);
            setLoadingState(false);
          }
        });
    }
  };

  useEffect(() => {
    let isMounted = true;
    setLoadingState(true);
    console.log("Started Fetching WorldWidePageData");
    fetchingApi(
      "https://cors-anywhere.herokuapp.com/https://disease.sh/v3/covid-19/countries",
      isMounted
    ).catch((err) => {
      if (err.name == "AbortError") {
        return;
      }
      isMounted = true;
      console.log("Error Occured in WorldWideData Page Request1: ", err);
      //if above call failed then call this api
      //honestly I dont know this is good approach or bad but the only solution i found
      console.log("Another Fetch Started");
      setLoadingState(true);
      fetchingApi("https://disease.sh/v3/covid-19/countries", isMounted).catch(
        (err) => {
          if (err.name == "AbortError") {
            return;
          }
          //getting Backup of worldwidedata page
          console.log("Error Occured in WorldWideData Page Request2: ", err);
          console.log("getting Backup of worldwidedata page");
          if (isMounted) {
            const countriesData = mapCountriesData(allCountriesBackup);
            const sortedData = sortData(countriesData);
            setCountries(sortedData);
            setLoadingState(false);
          }
        }
      );
    });
    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  let data = countries.map((e) =>
    createData(
      e.name,
      e.cases,
      e.newcases,
      e.deaths,
      e.newdeaths,
      e.active,
      e.recovered,
      e.seriouscritical
    )
  );
  const classes = useStyles();
  return (
    <div className="worldDataPage__Wrapper">
      <div className="inner__Wrapper">
        {/* <Sidebar /> */}
        {loadingState ? (
          <div className="spinnerWrapper">
            <CircularProgress />
          </div>
        ) : (
          <TableContainer className="custom" component={Paper}>
            <Table
              className={classes.table}
              aria-label="simple table"
              style={{ pointerEvents: "none" }}
            >
              <TableHead>
                <TableRow>
                  <TableCell
                    className={classes.bolderText}
                    style={{
                      position: "sticky",
                      top: "0",
                      backgroundColor: "white",
                    }}
                  >
                    Country,Other
                  </TableCell>
                  <TableCell
                    align="right"
                    className={`${classes.bolderText}`}
                    style={{
                      position: "sticky",
                      top: "0",
                      backgroundColor: "white",
                    }}
                  >
                    Total Cases
                  </TableCell>
                  <TableCell
                    align="right"
                    className={`${classes.bolderText}`}
                    style={{
                      position: "sticky",
                      top: "0",
                      backgroundColor: "white",
                    }}
                  >
                    New Cases
                  </TableCell>
                  <TableCell
                    align="right"
                    className={`${classes.bolderText}`}
                    style={{
                      position: "sticky",
                      top: "0",
                      backgroundColor: "white",
                    }}
                  >
                    Total Deaths
                  </TableCell>
                  <TableCell
                    align="right"
                    className={`${classes.bolderText}`}
                    style={{
                      position: "sticky",
                      top: "0",
                      backgroundColor: "white",
                    }}
                  >
                    New Deaths
                  </TableCell>
                  <TableCell
                    align="right"
                    className={`${classes.bolderText}`}
                    style={{
                      position: "sticky",
                      top: "0",
                      backgroundColor: "white",
                    }}
                  >
                    Total Recovered
                  </TableCell>
                  <TableCell
                    align="right"
                    className={`${classes.bolderText}`}
                    style={{
                      position: "sticky",
                      top: "0",
                      backgroundColor: "white",
                    }}
                  >
                    Active Cases
                  </TableCell>
                  <TableCell
                    align="right"
                    className={`${classes.bolderText}`}
                    style={{
                      position: "sticky",
                      top: "0",
                      backgroundColor: "white",
                    }}
                  >
                    Serious Critical
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((row, i) => (
                  <TableRow key={i}>
                    <TableCell
                      component="th"
                      scope="row"
                      className={classes.bolderText}
                    >
                      {row.country}
                    </TableCell>
                    <TableCell align="right">
                      {numeral(row.totalcases).format("0,0")}
                    </TableCell>
                    <TableCell align="right">
                      {row.newcases
                        ? `+${numeral(row.newcases).format("0,0")}`
                        : row.newcases}
                    </TableCell>
                    <TableCell align="right">
                      {/* {row.totaldeaths} */}
                      {row.totaldeaths
                        ? `${numeral(row.totaldeaths).format("0,0")}`
                        : row.totaldeaths}
                    </TableCell>
                    <TableCell
                      align="right"
                      className={`${
                        row.newdeaths > 0 && classes.newDeathsHighlight
                      }`}
                    >
                      {row.newdeaths
                        ? `+${numeral(row.newdeaths).format("0,0")}`
                        : row.newdeaths}
                    </TableCell>
                    <TableCell align="right">
                      {numeral(row.activecases).format("0,0")}
                    </TableCell>
                    <TableCell align="right">
                      {numeral(row.totalrecovered).format("0,0")}
                    </TableCell>
                    <TableCell align="right">
                      {numeral(row.seriouscritical).format("0,0")}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </div>
    </div>
  );
};

export default WorldDataPage;
