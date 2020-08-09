import React, { Component } from "react";
import FiltersModal from "./FiltersModal"

export default class UserPanel extends Component {
  state = {
    username: "Matias Moll",
  };

  toggleTheme = (e) => {
    console.log("TODO: Toggled Theme");
  };

  render() {
    return (
      <div id="user-panel">
        <h4 className="mt-2 ml-3 mb-0">Configuración</h4>
        <hr />
        <div>
          <div className="settings-item">
            <i className="fas fa-user mr-2"></i> Usuario:
            <div className="setting-value ml-2">{this.state.username}</div>
          </div>
          <div className="settings-item">
            <i className="fas fa-key mr-2"></i> Contraseña:
            <div className="setting-value ml-2">
              <button type="button" className="btn btn-outline-dark btn-sm" data-toggle="modal" data-target="#changePassModal">
                Cambiar
              </button>
            </div>
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
            <div className="setting-value ml-2" onClick={this.toggleTheme}>
              <label className="switch">
                <input type="checkbox" />
                <span className="slider round"></span>
              </label>
            </div>
          </div>
          <div className="settings-item">
            <i className="fas fa-sign-out-alt mr-2"></i> LogOut:
            <div className="setting-value ml-2">
              <button type="button" className="btn btn-outline-dark btn-sm">
                Exit
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
