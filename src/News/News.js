import React, { useState, useEffect } from "react";
import "./news.scss";
import { Link, NavLink } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";
import Skeleton from "@material-ui/lab/Skeleton";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    width: 300,
  },
});

const News = () => {
  const classes = useStyles();
  const [data, setData] = useState(null);
  const [arrayOfClasses, setArrayofClasses] = useState([
    "innerRightSideRow1",
    "innerRightSideRow2",
    "innerRightSideRow3",
    "innerRightSideRow4",
  ]);

  useEffect(() => {
    const fetchData = async () => {
      const api = await fetch("https://disease.sh/v3/covid-19/vaccine");
      const response = await api.json();
      console.log("response.data: ", response.data);
      setData(response);
    };
    fetchData();
  }, []);

  console.log("data: ", data?.data[1]);

  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "....." : str;
  }

  return (
    <div className="newsPage__Wrapper">
      <div className="inner__Wrapper">
        <Sidebar />
        <div className="leftSide">
          <div className="innerLeftSide">
            {!data ? (
              <Skeleton variant="rect" width="100%" height="70%" />
            ) : (
              // <Skeleton variant="rect" width="100%" height="70%" />
              <NavLink
                to={{
                  pathname: `importantinfo/${data?.data[1]?.candidate}`,
                  state: data?.data[1],
                }}
                style={{ textDecoration: "none" }}
              >
                <div className="innerLeftUpperSection">
                  <h1>{data?.data[1]?.candidate}</h1>
                  <h3>{data?.data[1]?.mechanism}</h3>
                  <p className="details">
                    {truncate(data?.data[1]?.details, 150)}
                  </p>
                  <p className="trialphase">{data?.data[1]?.trialPhase}</p>
                  {data?.data[1].sponsors.map((e) => (
                    <p className="sponsors">{e}</p>
                  ))}
                </div>
              </NavLink>
            )}

            <div className="innerLeftLowerSection">
              {!data ? (
                <Skeleton
                  variant="rect"
                  width="100%"
                  height="95%"
                  style={{
                    marginTop: "0.5rem",
                  }}
                />
              ) : (
                <>
                  <NavLink
                    to={{
                      pathname: `importantinfo/${data?.data[1]?.candidate}`,
                      state: data?.data[1],
                    }}
                    style={{ textDecoration: "none", width: "100%" }}
                  >
                    <div className="innerLeftLowerSectionLeftSide">
                      <h3> {data?.data[1].candidate}</h3>
                      <p className="funding">{data?.data[1]?.mechanism}</p>
                      <p className="details">
                        {truncate(data?.data[1]?.details, 100)}
                      </p>
                    </div>
                  </NavLink>
                  <NavLink
                    to={{
                      pathname: `importantinfo/${data?.data[12]?.candidate}`,
                      state: data?.data[12],
                    }}
                    style={{ textDecoration: "none" }}
                  >
                    <div className="innerLeftLowerSectionRightSide">
                      <h3> {data?.data[12]?.candidate}</h3>
                      <p className="funding">{data?.data[12]?.mechanism}</p>
                      <p className="details">
                        {truncate(data?.data[12]?.details, 100)}
                      </p>
                    </div>
                  </NavLink>
                </>
              )}
            </div>
          </div>
          {!data ? (
            <Skeleton
              variant="rect"
              width="30%"
              height="100%"
              style={{ marginLeft: "0.5rem" }}
            />
          ) : (
            <div className="innerRightSide">
              {data?.data.map((data, i) => {
                if (i > 8 && i <= 12) {
                  return (
                    <div className="innerRightSideRow1" key={i}>
                      <NavLink
                        to={{
                          pathname: `importantinfo/${data?.candidate}`,
                          state: data,
                        }}
                        style={{
                          textDecoration: "none",
                        }}
                      >
                        <h3> {data?.candidate}</h3>
                        <p className="funding">{data?.mechanism}</p>
                        <p className="details">{truncate(data?.details, 45)}</p>
                      </NavLink>
                    </div>
                  );
                }
              })}
            </div>
          )}
        </div>
        {!data ? (
          <Skeleton
            variant="rect"
            width="25%"
            height="95%"
            style={{ marginLeft: "1rem" }}
          />
        ) : (
          <div className="rightSide">
            {data?.data.map((data, i) => {
              if (i === 11 || i === 13 || i === 14 || i === 17) {
                return (
                  <div className="rightSideData" key={i}>
                    <NavLink
                      to={{
                        pathname: `importantinfo/${data?.candidate}`,
                        state: data,
                      }}
                      style={{ textDecoration: "none", color: "white" }}
                    >
                      <p className="news">{data?.mechanism}</p>
                    </NavLink>
                  </div>
                );
              }
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default News;
