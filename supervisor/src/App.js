import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import {AppContext} from "./AppContext";
import "./App.css";
import Topbar from "./layout/Topbar";
import Sidebar from "./layout/Sidebar";
import FiltersModal from "./settings/FiltersModal";
import ChangePassModal from "./settings/ChangePassModal";
import Home from "./pages/home/Home";
import Clientes from "./pages/clients/Clientes";
import Servicios from "./pages/services/Servicios";
import Moviles from "./pages/vehicles/Moviles";
import Login from "./pages/login/Login"

export default function App() {
  const [user, setUser] = React.useState(() => window.localStorage.getItem("Supervisor-User") || "");
  const [isSidebarCompressed, setIsSidebarCompressed] = React.useState(() => window.localStorage.getItem("Supervisor-IsSidebarCompressed") == "true" || false)
  const [token, setToken] = React.useState(() => window.localStorage.getItem("Supervisor-Token") || "");

  React.useEffect(() =>{
      window.localStorage.setItem("Supervisor-IsSidebarCompressed", isSidebarCompressed)
      window.localStorage.setItem("Supervisor-User", user)
      window.localStorage.setItem("Supervisor-Token", token)
    },
    [isSidebarCompressed, user, token]
  );

  const toggleSidebar = (e) => {
    e.preventDefault();
    setIsSidebarCompressed(!isSidebarCompressed);
  };

  const logOut = () => {
    setToken("");
    setUser("");
  }

  const onLoginSuccesful = (user, token) => {
    setToken(token);
    setUser(user);
  }

  const apiUrl = "http://192.168.222.4:7881/SuWebApi";

  return (
    <AppContext.Provider value={{user, token, setUser, apiUrl}}>
      <Router>
        { 
          !user ? 
          <Login loginSuccesful={onLoginSuccesful}/> : 
          <div className="App">
            <FiltersModal></FiltersModal>
            <ChangePassModal></ChangePassModal>
            <Topbar toggleSidebar={toggleSidebar} logOut={logOut}></Topbar>
            <div id="full-container">
              <Sidebar isSidebarCompressed={isSidebarCompressed} toggleSidebar={toggleSidebar} logOut={logOut}></Sidebar>
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
        }
      </Router>
    </AppContext.Provider>
  );
  
}
