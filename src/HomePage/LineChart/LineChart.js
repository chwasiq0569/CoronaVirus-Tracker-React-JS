import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import numeral from "numeral";
const LineChart = ({ casesStateWorldWide }) => {
  const [keyArr, setKeyArr] = useState([]);
  const [valueArr, setValueArr] = useState([]);
  let valueArrTemp = [];
  let keyArrTemp = [];

  useEffect(() => {
    const fetchData = async (casesState) => {
      const api = await fetch(
        "https://cors-anywhere.herokuapp.com/https://disease.sh/v3/covid-19/historical/all?lastdays=15"
      );
      const response = await api.json();
      let lastData = 0;
      for (let key in response[casesState]) {
        keyArrTemp.push(key);
        if (lastData) {
          lastData = response[casesState][key] - lastData;
          valueArrTemp.push(lastData);
        }
        lastData = response[casesState][key];
      }
      setKeyArr(keyArrTemp);
      setValueArr(valueArrTemp);
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
