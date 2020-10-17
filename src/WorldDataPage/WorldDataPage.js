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
import Sidebar from "./../Sidebar/Sidebar";
import { sortData } from "./../util/util";
import Skeleton from "@material-ui/lab/Skeleton";

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
  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/countries")
      .then((response) => response.json())
      .then((data) => {
        const countriesData = data.map((countries) => ({
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
        const sortedData = sortData(countriesData);
        setCountries(sortedData);
        console.log(countries);
      });
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
  console.log("data: ", data);
  const classes = useStyles();
  return (
    <div className="worldDataPage__Wrapper">
      <div className="inner__Wrapper">
        <Sidebar />
        {countries.length < 1 ? (
          <p style={{ textAlign: "center", letterSpacing: "1px" }}>
            Loading...
          </p>
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
                    <TableCell align="right">{row.totaldeaths}</TableCell>
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
                      {numeral(row.totalrecovered).format("0,0")}
                    </TableCell>
                    <TableCell align="right">
                      {numeral(row.activecases).format("0,0")}
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
