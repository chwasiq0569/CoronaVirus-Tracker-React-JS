import React, { useEffect, useState } from "react";
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
  const [fetchFailedStatus, setFetchFailedStatus] = useState(false);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="App">
      <Topbar fetchFailedStatus={fetchFailedStatus} />
      <Sidebar />
      <Route
        exact
        path="/"
        component={() => (
          <HomePage
            setFetchFailedStatus={setFetchFailedStatus}
            fetchFailedStatus={fetchFailedStatus}
          />
        )}
      />
      <Route exact path="/worldwide" component={WorldDataPage} />
      <Route exact path="/importantinfo" component={News} />
      <Route exact path="/importantinfo/:name" component={NewsDetails} />
    </div>
  );
}

export default App;
