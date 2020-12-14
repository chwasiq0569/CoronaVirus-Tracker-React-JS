import React, { useState, useEffect } from "react";
import "./news.scss";
import { Link, NavLink } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";
import Skeleton from "@material-ui/lab/Skeleton";
import { makeStyles } from "@material-ui/core/styles";
import { v4 as uuidv4 } from "uuid";
import IndividualNews from "./IndividualNews";
import { truncate } from "../util/util";
import newsBackup from "../backUpData/vaccines.json";

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

  const fetchingApi = (api, isMounted) => {
    if (api) {
      return fetch(api)
        .then((response) => response.json())
        .then((data) => {
          if (isMounted) {
            setData(data);
          }
        });
    }
  };
  console.log("News Loaded");
  useEffect(() => {
    let isMounted = true; // track whether component is mounted
    fetchingApi(
      "https://cors-anywhere.herokuapp.com/https://diseas.sh/v3/covid-19/vaccine",
      isMounted
    ).catch((err) => {
      isMounted = true;
      //if above call failed then call this api
      //honestly I dont know this is good approach or bad but the only solution i found
      console.log("First Call Failed: ", err);
      console.log("2nd Call Started");
      fetchingApi(
        "https://cors-anywhere.herokuapp.com/https://diseas.sh/v3/covid-19/vaccine",
        isMounted
      ).catch((err) => {
        console.log("2nd Call Failed: ", err);
        console.log("getting backup Data");
        if (isMounted) {
          setData(newsBackup);
        }
      });
    });
    return () => {
      // clean up
      isMounted = false;
    };
  }, []);

  return (
    <div className="newsPage__Wrapper">
      <div className="inner__Wrapper">
        <div className="leftSide">
          <div className="innerLeftSide">
            {!data ? (
              <Skeleton variant="rect" width="100%" height="70%" />
            ) : (
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
                  {data?.data[1].sponsors.map((e, i) => (
                    <p key={i} className="sponsors">
                      {e}
                    </p>
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
                if (i > 22 && i <= 26) {
                  return (
                    <div className="innerRightSideRow1" key={uuidv4()}>
                      <IndividualNews data={data} />
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
                  <div className="rightSideData" key={uuidv4()}>
                    <IndividualNews data={data} type="rightCornerNews" />
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
