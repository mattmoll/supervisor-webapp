import React from "react";
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

export default function App() {
  const [user, setUser] = React.useState();
  const [isSidebarCompressed, setIsSidebarCompressed] = React.useState(() => window.localStorage.getItem('Supervisor-IsSidebarCompressed') || false)

  React.useEffect(() =>{
      window.localStorage.setItem('Supervisor-IsSidebarCompressed', isSidebarCompressed)
    },
    [isSidebarCompressed]
  );

  const toggleSidebar = (e) => {
    e.preventDefault();
    setIsSidebarCompressed(!isSidebarCompressed);
  };

  return (
    <Router>

      <div className="App">
        <FiltersModal></FiltersModal>
        <ChangePassModal></ChangePassModal>
        <Topbar toggleSidebar={toggleSidebar}></Topbar>
        <div id="full-container">
          <Sidebar isSidebarCompressed={isSidebarCompressed} toggleSidebar={toggleSidebar} ></Sidebar>
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
