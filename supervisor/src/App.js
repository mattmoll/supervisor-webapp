import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import {AppContext} from "./AppContext";
import "./App.css";
import Topbar from "./layout/Topbar";
import Sidebar from "./layout/Sidebar";
import FiltersModal from "./settings/FiltersModal";
import Home from "./pages/home/Home";
import Clientes from "./pages/clients/Clients";
import Services from "./pages/services/Services";
import Mobiles from "./pages/vehicles/Mobiles";
import Login from "./pages/login/Login"
import * as ThemeHelper from "./utils/ThemeHelper";

export default function App() {
  const [sessionInfo, setSessionInfo] = React.useState( () => { return {
    user: window.localStorage.getItem("Supervisor-User") || "",
    token: window.localStorage.getItem("Supervisor-Token")  || ""
  }}); 
  const [isDarkThemeEnabled, setIsDarkThemeEnabled] = React.useState(() => window.localStorage.getItem("Supervisor-IsDarkThemeEnabled") == "true" || false);
  const [isSidebarCompressed, setIsSidebarCompressed] = React.useState(() => window.localStorage.getItem("Supervisor-IsSidebarCompressed") == "true" || false)
  const [sessionExpired, setSessionExpired] = React.useState(false);
  const [themeToggle, setThemeToggle] = React.useState(false);

  React.useEffect(() =>{
      window.localStorage.setItem("Supervisor-User", sessionInfo.user)
      window.localStorage.setItem("Supervisor-Token", sessionInfo.token)
      window.localStorage.setItem("Supervisor-IsSidebarCompressed", isSidebarCompressed)
    },
    [sessionInfo, isSidebarCompressed]
  );

  React.useEffect(() =>{
    window.localStorage.setItem("Supervisor-IsDarkThemeEnabled", isDarkThemeEnabled)
    ThemeHelper.updateVisualTheme(isDarkThemeEnabled);
    notifyComponentsThemeToggled();
  },
  [isDarkThemeEnabled]
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
    setIsDarkThemeEnabled(!isDarkThemeEnabled);
  }

  const notifyComponentsThemeToggled = () => {
    setThemeToggle(!themeToggle);
  }

  const apiUrl = "http://192.168.222.4:7881/SuWebApi";

  return (
    <AppContext.Provider value={{sessionInfo, logOut, setSessionExpired, apiUrl, themeToggle, isDarkThemeEnabled, themeChangedNeedsHandling}}>
      <Router>
        { 
          !sessionInfo.user ? 
          <Login loginSuccesful={onLoginSuccesful} sessionExpired={sessionExpired}/> : 
          <div className="App">
            <FiltersModal></FiltersModal>
            <Topbar toggleSidebar={toggleSidebar}></Topbar>
            <div id="full-container">
              <Sidebar isSidebarCompressed={isSidebarCompressed} toggleSidebar={toggleSidebar}></Sidebar>
              <main id="main" className={`${isDarkThemeEnabled ? "dark-theme" : ""}`}>
                <Switch>
                  <Route exact path="/" component={Home}></Route>
                  <Route exact path="/clientes" component={Clientes}></Route>
                  <Route exact path="/servicios" component={Services}></Route>
                  <Route exact path="/moviles" component={Mobiles}></Route>
                </Switch>
              </main>
            </div>
          </div>
        }
      </Router>
    </AppContext.Provider>
  );
  
}
