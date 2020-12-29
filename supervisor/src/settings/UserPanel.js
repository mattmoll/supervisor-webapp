import React, { useContext } from "react";
import {AppContext} from "../AppContext";

import * as chartsHome from "../pages/home/ChartsHome";

export default function UserPanel() {

  const [isDarkTheme,setIsDarkTheme] = React.useState(false);

  const {sessionInfo, logOut, themeChangedNeedsHandling} = useContext(AppContext);

  const toggleTheme = (e) => {

    if(!isDarkTheme){
      document.getElementById("main").classList.add("dark-theme");
      let panels = [...document.getElementsByClassName("panel")];

      panels.forEach(panel => panel.classList.add("dark-theme"));
  
      chartsHome.darkMode();
    } else {
      document.getElementById("main").classList.remove("dark-theme");

      let panels = [...document.getElementsByClassName("panel")];
      panels.forEach(panel => panel.classList.remove("dark-theme"));

      chartsHome.lightMode();
    }

    themeChangedNeedsHandling();
    setIsDarkTheme(!isDarkTheme);
  };

  return (
    <div id="user-panel">
      <h4 className="mt-2 ml-3 mb-0">Configuración</h4>
      <hr />
      <div>
        <div className="settings-item">
          <i className="fas fa-user mr-2"></i> Usuario:
          <div className="setting-value ml-2">{sessionInfo.user}</div>
        </div>
        <div className="settings-item">
          <i className="fas fa-filter mr-2"></i> Filtros:
          <div className="setting-value ml-2">
            <button type="button" className="btn btn-outline-dark btn-sm" data-toggle="modal" data-target="#filtersModal">
              Elegir
            </button>
            <button type="button" className="btn btn-outline-dark btn-sm ml-2">
              Quitar
            </button>
          </div>
        </div>
        <div className="settings-item">
          <i className="fas fa-adjust mr-2"></i> Tema Oscuro:
          <div className="setting-value ml-2">
            <label className="switch">
              <input type="checkbox" onClick={toggleTheme}/>
              <span className="slider round"></span>
            </label>
          </div>
        </div>
        <div className="settings-item">
          <i className="fas fa-sign-out-alt mr-2"></i> Cerrar Sesión:
          <div className="setting-value ml-2">
            <button type="button" className="btn btn-outline-dark btn-sm" onClick={logOut}>
              Salir
            </button>
          </div>
        </div>
      </div>
    </div>
  );
  
}
