import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import numeral from "numeral";
const LineChartTwo = ({ casesStateCountry, country }) => {
  const [keyArr, setKeyArr] = useState([]);
  const [valueArr, setValueArr] = useState([]);
  let keyArrTemp = [];
  let valueArrTemp = [];
  useEffect(() => {
    const fetchCountryData = (casesState) => {
      fetch(
        `https://disease.sh/v3/covid-19/historical/${country?.name}?lastdays=15`
      )
        .then((res) => res.json())
        .then((response) => {
          let lastData = 0;
          for (let key in response?.timeline[casesState]) {
            keyArrTemp.push(key);
            if (lastData) {
              lastData = response?.timeline[casesState][key] - lastData;
              valueArrTemp.push(lastData);
            }
            lastData = response?.timeline[casesState][key];
          }
          setKeyArr(keyArrTemp);
          setValueArr(valueArrTemp);
        })
        .catch((error) => console.log(error));
    };
    country && casesStateCountry && fetchCountryData(casesStateCountry);
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

export default LineChartTwo;
