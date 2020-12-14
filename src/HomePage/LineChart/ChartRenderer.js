import React, { useEffect, useState } from "react";
import numeral from "numeral";
import { savingFetchedDataInStates } from "../../util/util";
import historialbackUp from "../../backUpData/historicalData.json";

const ChartRenderer = (props) => {
  const { casesStateWorldWide, apiInstance } = props;
  //casesStateWorldWide  can contain string "cases" || "deaths"||  "recovered"
  const [keyArr, setKeyArr] = useState([]); // contain dates
  const [valueArr, setValueArr] = useState([]); //contain cases
  const [loadingState, setLoadingState] = useState(true);

  let valueArrTemp = []; // just for temporary storage contain dates
  let keyArrTemp = []; // just for temporary storage contain cases

  useEffect(() => {
    let isMounted = true; // track whether component is mounted
    const fetchData = (casesState) => {
      //this api will fetch historical data of last 15 days
      setLoadingState(true);
      const api = fetch(apiInstance);
      api
        .then((res) => res.json())
        .then((response) => {
          savingFetchedDataInStates(
            response,
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
          console.log("Error Occured: ", err);
          console.log("2nd Fetch Started");
          const api = fetch(
            "https://disease.sh/v3/covid-19/historical/all?lastdays=15"
          );
          api
            .then((res) => res.json())
            .then((response) => {
              savingFetchedDataInStates(
                response,
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
              console.log("2nd Fetch Failed: ", err);
              console.log("getting backup data");
              savingFetchedDataInStates(
                historialbackUp,
                casesState,
                isMounted,
                setKeyArr,
                setValueArr,
                setLoadingState,
                keyArrTemp,
                valueArrTemp
              );
            });
        });
    };
    casesStateWorldWide && fetchData(casesStateWorldWide);

    return () => {
      // clean up
      isMounted = false;
    };
  }, [casesStateWorldWide]);

  const dataChartCases = {
    labels: keyArr, // x-axis
    datasets: [
      {
        label: "Covid 19 Deaths Worldwide in last 15 Days",
        data: valueArr, // y-axis
        backgroundColor: "transparent",
        borderColor: "#6b7add",
      },
    ],
  };
  const dataChartRecovered = {
    labels: keyArr,
    datasets: [
      {
        label: "Covid 19 Deaths Worldwide in last 15 Days",
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
        label: `Covid 19 Deaths Worldwide in last 15 Days`,
        data: valueArr,
        backgroundColor: "transparent",
        borderColor: "red",
      },
    ],
  };

  const returnChart = () => {
    // the chart will be updating casesStateWorldWide
    if (casesStateWorldWide === "cases") {
      return dataChartCases;
    }
    if (casesStateWorldWide === "recovered") {
      return dataChartRecovered;
    }
    if (casesStateWorldWide === "deaths") {
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
        //label will be appeared on hovering chart
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

  return <>{props.render(returnChart, options, loadingState)}</>;
};

export default ChartRenderer;
