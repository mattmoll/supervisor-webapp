import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Topbar from "./components/layout/Topbar";
import Sidebar from "./components/layout/Sidebar";
import Home from "./components/dashboards/Home";
import Clientes from "./components/dashboards/Clientes";
import Zonas from "./components/dashboards/Zonas";
import Servicios from "./components/historics/Servicios";
import Moviles from "./components/historics/Moviles";
import Operadores from "./components/historics/Operadores";


export default class App extends Component {
  state = {
    compressedSidebar: false,
  };
  toggleSidebar = (e) => {
    e.preventDefault();
    this.setState({ compressedSidebar: !this.state.compressedSidebar });
  };
  render() {
    return (
      <Router>
        <div className="App">
          <Topbar onToggleSidebarClicked={this.toggleSidebar}></Topbar>
          <div id="full-container">
            <Sidebar compressedSidebar={this.state.compressedSidebar}></Sidebar>
            <main>
              <Switch>
                <Route exact path="/" component={Home}></Route>
                <Route exact path="/clientes" component={Clientes}></Route>
                <Route exact path="/zonas" component={Zonas}></Route>

                <Route exact path="/servicios" component={Servicios}></Route>
                <Route exact path="/moviles" component={Moviles}></Route>
                <Route exact path="/operadores" component={Operadores}></Route>
              </Switch>
            </main>
          </div>
        </div>
      </Router>
    );
  }
}
