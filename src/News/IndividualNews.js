import React from "react";
import { Link, NavLink } from "react-router-dom";
import { truncate } from "../util/util";

const IndividualNews = ({ data, type }) => {
  return (
    <NavLink
      to={{
        pathname: `importantinfo/${data?.candidate}`,
        state: data,
      }}
      style={{
        textDecoration: "none",
      }}
    >
      {type === "rightCornerNews" ? (
        <p style={{ textDecoration: "none !important", color: "white" }}>
          {data?.mechanism}
        </p>
      ) : (
        <>
          <h3> {data?.candidate}</h3>
          <p className="funding">{data?.mechanism}</p>
          <p className="details">{truncate(data?.details, 45)}</p>{" "}
        </>
      )}
    </NavLink>
  );
};

export default IndividualNews;
