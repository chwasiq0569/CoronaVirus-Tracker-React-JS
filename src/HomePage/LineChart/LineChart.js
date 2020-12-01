import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import numeral from "numeral";
const LineChart = ({ casesStateWorldWide }) => {
  //casesStateWorldWide  can contain string "cases" || "deaths"||  "recovered"
  const [keyArr, setKeyArr] = useState([]);
  const [valueArr, setValueArr] = useState([]);
  let valueArrTemp = []; // just for temporary storage
  let keyArrTemp = []; // just for temporary storage

  useEffect(() => {
    const fetchData = async (casesState) => {
      //this api will fetch historical data of last 15 days
      const api = await fetch(
        "https://cors-anywhere.herokuapp.com/https://disease.sh/v3/covid-19/historical/all?lastdays=15"
      );
      const response = await api.json();
      //inside response we will get object containing 3 objects like
      /* response = {
        cases: {},
        deaths: {},
        recovered: {}
      } */
      // As we know
      //response[casesState] means response.casesState or response.cases (if casesState contains "cases")
      //and we used [] notion to access values dynamically

      let lastData = 0;
      for (let key in response[casesState]) {
        //here we want to access values of response.cases.keys
        //here keys are dates and values are cases
        //like 11/16/20 : 55030781
        keyArrTemp.push(key);
        //response[casesState][key] will return cases(values) with respect to keys(dates)
        //if we place lastData = response[casesState][key]; before if condition it will return 0 after every subtration
        if (lastData) {
          lastData = response[casesState][key] - lastData;
          valueArrTemp.push(lastData);
        }
        lastData = response[casesState][key];
        // console.log("valueArrTemp: ", valueArrTemp);
      }
      setKeyArr(keyArrTemp);
      setValueArr(valueArrTemp);
      //thats how we will plot the number of cases are dropping or increasing
      console.log("keyArrTemp: ", keyArrTemp);
      console.log("valueArrTemp: ", valueArrTemp);
    };
    fetchData(casesStateWorldWide);
  }, [casesStateWorldWide]);

  const dataChartCases = {
    labels: keyArr,
    datasets: [
      {
        label: "Covid 19 Deaths Worldwide in last 15 Days",
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
        radius: 0,
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
    <div style={{ height: "auto", width: "100%" }}>
      {returnChart && (
        <Line data={() => returnChart()} height={120} options={options} />
      )}
    </div>
  );
};

export default LineChart;
