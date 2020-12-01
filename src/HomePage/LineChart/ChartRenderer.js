import React, { useEffect, useState } from "react";
import numeral from "numeral";

const ChartRenderer = (props) => {
  const { casesStateWorldWide, apiInstance } = props;
  //casesStateWorldWide  can contain string "cases" || "deaths"||  "recovered"
  const [keyArr, setKeyArr] = useState([]); // contain dates
  const [valueArr, setValueArr] = useState([]); //contain cases
  let valueArrTemp = []; // just for temporary storage contain dates
  let keyArrTemp = []; // just for temporary storage contain cases

  useEffect(() => {
    const fetchData = async (casesState) => {
      //this api will fetch historical data of last 15 days
      const api = await fetch(apiInstance);
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
      let lastData1 = 0;

      //this will render incase of cases by country
      for (let key in response[casesState]) {
        //here we want to access values of response.cases.keys
        //here keys are dates and values are cases
        //like 11/16/20 : 55030781
        keyArrTemp.push(key);
        //response[casesState][key] will return cases(values) with respect to keys(dates)
        //if we place lastData = response[casesState][key]; before if condition it will return 0 after every subtration
        if (lastData1) {
          lastData1 = response[casesState][key] - lastData1;
          valueArrTemp.push(lastData1);
        }
        lastData1 = response[casesState][key];
        // console.log("valueArrTemp: ", valueArrTemp);
      }
      setKeyArr(keyArrTemp);
      setValueArr(valueArrTemp);
      //thats how we will plot the number of cases are dropping or increasing
      //this will render incase of cases by worldwide
    };
    casesStateWorldWide && fetchData(casesStateWorldWide);
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

  return <>{props.render(returnChart, options)}</>;
};

export default ChartRenderer;
