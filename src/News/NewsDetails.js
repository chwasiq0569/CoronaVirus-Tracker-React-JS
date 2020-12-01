import React from "react";
import "./newsDetails.scss";
import Sidebar from "../Sidebar/Sidebar";
import { v4 as uuidv4 } from "uuid";

const NewsDetails = ({ match, history }) => {
  console.log(history.location.state);
  const state = history.location.state;
  console.log("state: ", state);
  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "....." : str;
  }
  return (
    <div className="newsDetails__Wrapper">
      <div className="inner__Wrapper">
        <h1 className="candidate">{state?.candidate}</h1>
        <p className="explaination">{truncate(state?.details, 800)}</p>
        <p className="institutions">{state?.institutions}</p>
        <p className="phase">{state?.trialPhase}</p>
        <div className="flexTwoElements">
          <div className="sponsors">
            {state?.sponsors.map((data, i) => (
              <p key={uuidv4()}>{data}</p>
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
