import React, { useEffect } from "react";
import "./App.css";
import Topbar from "./Topbar/Topbar";
import HomePage from "./HomePage/HomePage";
import "leaflet/dist/leaflet.css";
import WorldDataPage from "./WorldDataPage/WorldDataPage";
import { Route } from "react-router-dom";
import News from "./News/News";
import NewsDetails from "./News/NewsDetails";
import Sidebar from "./Sidebar/Sidebar";
function App() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="App">
      <Topbar />
      <Sidebar />
      <Route exact path="/" component={HomePage} />
      <Route exact path="/worldwide" component={WorldDataPage} />
      <Route exact path="/importantinfo" component={News} />
      <Route exact path="/importantinfo/:name" component={NewsDetails} />
    </div>
  );
}

export default App;
