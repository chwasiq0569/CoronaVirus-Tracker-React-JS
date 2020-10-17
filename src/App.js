import React from "react";
import "./App.css";
import Topbar from "./Topbar/Topbar";
import HomePage from "./HomePage/HomePage";
import "leaflet/dist/leaflet.css";
import WorldDataPage from "./WorldDataPage/WorldDataPage";
import { Route } from "react-router-dom";
import News from "./News/News";
import NewsDetails from "./News/NewsDetails";

function App() {
  return (
    <div className="App">
      <Topbar />
      <Route exact path="/" component={HomePage} />
      <Route exact path="/worldwide" component={WorldDataPage} />
      <Route exact path="/importantinfo" component={News} />
      <Route exact path="/importantinfo/:name" component={NewsDetails} />
    </div>
  );
}

export default App;
