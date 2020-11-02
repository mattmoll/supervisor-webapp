import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Topbar from "./layout/Topbar";
import Sidebar from "./layout/Sidebar";
import FiltersModal from "./settings/FiltersModal";
import ChangePassModal from "./settings/ChangePassModal";
import Home from "./pages/home/Home";
import Clientes from "./pages/clients/Clientes";
import Servicios from "./pages/services/Servicios";
import Moviles from "./pages/mobiles/Moviles";


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
          <FiltersModal></FiltersModal>
          <ChangePassModal></ChangePassModal>
          <Topbar onToggleSidebarClicked={this.toggleSidebar}></Topbar>
          <div id="full-container">
            <Sidebar compressedSidebar={this.state.compressedSidebar}></Sidebar>
            <main>
              <Switch>
                <Route exact path="/" component={Home}></Route>
                <Route exact path="/clientes" component={Clientes}></Route>
                <Route exact path="/servicios" component={Servicios}></Route>
                <Route exact path="/moviles" component={Moviles}></Route>
              </Switch>
            </main>
          </div>
        </div>
      </Router>
    );
  }
}
