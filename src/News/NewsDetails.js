import React from "react";
import "./newsDetails.scss";
import Sidebar from "../Sidebar/Sidebar";

const NewsDetails = ({ match, history }) => {
  console.log(history.location.state);
  const state = history.location.state;
  console.log("state: ", state);
  return (
    <div className="newsDetails__Wrapper">
      <Sidebar />
      <div className="inner__Wrapper">
        <h1>{state?.candidate}</h1>
        <p className="explaination">{state?.details}</p>
        <p className="institutions">{state?.institutions}</p>
        <p className="phase">{state?.trialPhase}</p>
        <div className="flexTwoElements">
          <div className="sponsors">
            {state?.sponsors.map((data) => (
              <p>{data}</p>
            ))}
          </div>
          <div className="funding">
            <p>{state?.mechanism}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsDetails;
