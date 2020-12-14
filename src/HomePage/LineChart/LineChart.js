import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import CircularProgress from "@material-ui/core/CircularProgress";

const LineChart = (props) => {
  const { loadingState } = props;

  //casesStateWorldWide  can contain string "cases" || "deaths"||  "recovered"
  return (
    <div style={{ height: "auto", width: "100%" }}>
      {props.returnChart &&
        (loadingState ? (
          <div className="spinnerWrapper">
            <CircularProgress />
          </div>
        ) : (
          <Line
            data={() => props.returnChart()}
            height={120}
            options={props.options}
          />
        ))}
    </div>
  );
};

// export default RenderCharts(LineChart, 5);
export default LineChart;
