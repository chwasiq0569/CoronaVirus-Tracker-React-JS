import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import numeral from "numeral";
import CircularProgress from "@material-ui/core/CircularProgress";
import { savingFetchedDataInStates } from "../../util/util";
import { responsiveFontSizes } from "@material-ui/core";

const LineChartTwo = ({ casesStateCountry, country }) => {
  const [keyArr, setKeyArr] = useState([]);
  const [valueArr, setValueArr] = useState([]);
  const [loadingState, setLoadingState] = useState(true);
  let keyArrTemp = [];
  let valueArrTemp = [];

  useEffect(() => {
    let controller = new AbortController();
    let isMounted = true; // track whether component is mounted
    const fetchCountryData = (casesState) => {
      console.log("Started Fetching: ", casesState);
      setLoadingState(true);
      const api = fetch(
        `https://cors-anywhere.herokuapp.com/https://disease.sh/v3/covid-19/historical/${country?.name}?lastdays=15`,
        { signal: controller.signal }
      );
      api
        .then((res) => res.json())
        .then((response) => {
          savingFetchedDataInStates(
            response.timeline,
            casesState,
            isMounted,
            setKeyArr,
            setValueArr,
            setLoadingState,
            keyArrTemp,
            valueArrTemp
          );
        })
        .catch((err) => {
          if (err.name == "AbortError") {
            return;
          }
          console.log("Error Occured: ", err);
          console.log("Started 2nd Fetch");
          const api = fetch(
            `https://disease.sh/v3/covid-19/historical/${country?.name}?lastdays=15`,
            { signal: controller.signal }
          );
          api
            .then((res) => res.json())
            .then((response) => {
              console.log("RESPONSE: ", response)
              savingFetchedDataInStates(
                response.timeline,
                casesState,
                isMounted,
                setKeyArr,
                setValueArr,
                setLoadingState,
                keyArrTemp,
                valueArrTemp
              );
            })
            .catch((err) => console.log("2nd Request Failed: ", err));
        });
    };
    country && casesStateCountry && fetchCountryData(casesStateCountry);
    return () => {
      // clean up
      isMounted = false;
      controller.abort();
    };
  }, [casesStateCountry, country]);



  const dataChartCases = {
    labels: keyArr,
    datasets: [
      {
        label: `Covid 19 Cases in ${country?.name} in last 15 days`,
        data: valueArr,
        backgroundColor: "transparent",
        borderColor: "#6b7add",
      },
    ],
  };
  const dataChartRecovered = {
    labels: keyArr,
    datasets: [
      {
        label: `Covid 19 Recovered in ${country?.name} in last 15 days`,
        data: valueArr,
        backgroundColor: "transparent",
        borderColor: "green",
      },
    ],
  };
  const dataChartDeaths = {
    labels: keyArr,
    datasets: [
      {
        label: `Covid 19 Deaths in ${country?.name} in last 15 days`,
        data: valueArr,
        backgroundColor: "transparent",
        borderColor: "red",
      },
    ],
  };

  const returnChart = () => {
    if (casesStateCountry === "cases") {
      return dataChartCases;
    }
    if (casesStateCountry === "recovered") {
      return dataChartRecovered;
    }
    if (casesStateCountry === "deaths") {
      return dataChartDeaths;
    }
  };




  const options = {
    legend: {
      display: true,
    },
    elements: {
      point: {
        radius: 4,
      },
    },
    maintainAspectRatio: false,
    tooltips: {
      mode: "index",
      intersect: false,
      callbacks: {
        label: function (tooltipItem, data) {
          return numeral(tooltipItem.value).format("+0,0");
        },
      },
    },
    scales: {
      xAxes: [
        {
          type: "time",
          time: {
            parser: "MM/DD/YY",
            tooltipFormat: "ll",
          },
        },
      ],
      yAxes: [
        {
          gridLines: {
            display: false,
          },
          ticks: {
            // Include a dollar sign in the ticks
            callback: function (value, index, values) {
              
              return numeral(value).format("0a");
            },
          },
        },
      ],
    },
  };
 
  return (
    <div
      style={{
        height: "auto",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {returnChart &&
        (!loadingState ? (
          <Line data={() => returnChart()} height={120} options={options} />
        ) : (
          <CircularProgress />
        ))}
    </div>
  );
};

export default LineChartTwo;
