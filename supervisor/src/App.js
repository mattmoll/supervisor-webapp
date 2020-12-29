import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import {AppContext} from "./AppContext";
import "./App.css";
import Topbar from "./layout/Topbar";
import Sidebar from "./layout/Sidebar";
import FiltersModal from "./settings/FiltersModal";
import Home from "./pages/home/Home";
import Clientes from "./pages/clients/Clientes";
import Servicios from "./pages/services/Servicios";
import Moviles from "./pages/vehicles/Moviles";
import Login from "./pages/login/Login"

export default function App() {
  const [sessionInfo, setSessionInfo] = React.useState( () => { return {
    user: window.localStorage.getItem("Supervisor-User") || "",
    token: window.localStorage.getItem("Supervisor-Token")  || ""
  }}); 
  const [isSidebarCompressed, setIsSidebarCompressed] = React.useState(() => window.localStorage.getItem("Supervisor-IsSidebarCompressed") == "true" || false)
  const [sessionExpired, setSessionExpired] = React.useState(false);
  const [themeToggle, setThemeToggle] = React.useState(false);

  React.useEffect(() =>{
      window.localStorage.setItem("Supervisor-IsSidebarCompressed", isSidebarCompressed)
      window.localStorage.setItem("Supervisor-User", sessionInfo.user)
      window.localStorage.setItem("Supervisor-Token", sessionInfo.token)
    },
    [isSidebarCompressed, sessionInfo]
  );

  const toggleSidebar = (e) => {
    e.preventDefault();
    setIsSidebarCompressed(!isSidebarCompressed);
  };

  const logOut = () => {
    setSessionInfo({
      user: "",
      token: ""
    })
  }

  const onLoginSuccesful = (user, token) => {
    setSessionInfo({ user, token });
  }

  const themeChangedNeedsHandling = () => {
    setThemeToggle(!themeToggle);
  }

  const apiUrl = "http://192.168.222.4:7881/SuWebApi";

  return (
    <AppContext.Provider value={{sessionInfo, logOut, setSessionExpired, apiUrl, themeToggle, themeChangedNeedsHandling}}>
      <Router>
        { 
          !sessionInfo.user ? 
          <Login loginSuccesful={onLoginSuccesful} sessionExpired={sessionExpired}/> : 
          <div className="App">
            <FiltersModal></FiltersModal>
            <Topbar toggleSidebar={toggleSidebar}></Topbar>
            <div id="full-container">
              <Sidebar isSidebarCompressed={isSidebarCompressed} toggleSidebar={toggleSidebar}></Sidebar>
              <main id="main">
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
