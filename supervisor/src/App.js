import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Topbar from "./components/layout/Topbar";
import Sidebar from "./components/layout/Sidebar";
import Home from "./components/dashboards/Home";
import Moviles from "./components/dashboards/Moviles";

function App() {
  return (
    <Router>
      <div className="App">
        <Topbar></Topbar>
        <div id="full-container">
          <Sidebar></Sidebar>
          <main>
            <Switch>
              <Route exact path="/" component={Home}></Route>
              <Route exact path="/moviles" component={Moviles}></Route>
            </Switch>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;
