import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";

const LineChart = (props) => {
  //casesStateWorldWide  can contain string "cases" || "deaths"||  "recovered"
  return (
    <div style={{ height: "auto", width: "100%" }}>
      {props.returnChart && (
        <Line
          data={() => props.returnChart()}
          height={120}
          options={props.options}
        />
      )}
    </div>
  );
};

// export default RenderCharts(LineChart, 5);
export default LineChart;
