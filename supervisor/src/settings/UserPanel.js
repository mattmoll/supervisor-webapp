import React, { useContext } from "react";
import {AppContext} from "../AppContext";

export default function UserPanel() {

  const {sessionInfo, logOut, isDarkThemeEnabled, themeChangedNeedsHandling} = useContext(AppContext);

  const toggleTheme = (e) => {
    themeChangedNeedsHandling();
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
              <input type="checkbox" onChange={toggleTheme} checked={isDarkThemeEnabled}/>
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
