import React from "react";
const RenderCharts = (OriginalChart, apiInstance) => {
  const EnhancedChart = (props) => {
    const [keyArr, setKeyArr] = useState([]);
    const [valueArr, setValueArr] = useState([]);
    let keyArrTemp = [];
    useEffect(() => {
      const fetchCountryData = async (casesState) => {
        const api = await fetch(apiInstance);
        const response = await api.json();
        console.log("response:", response?.timeline);
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
      <OriginalChart
        count={count}
        increment={increment}
        //name={props.name}
        {...props}
      />
    );
  };
  return EnhancedChart;
};

export default RenderCharts;
