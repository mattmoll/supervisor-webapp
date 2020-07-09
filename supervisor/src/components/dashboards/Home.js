import React, { Component } from "react";

export default class Home extends Component {
  render() {
    return (
      <div>
        <div id="summary-container">
          <div className="panel summary">
            <div className="summary-panel-title">
              <h4>Servicios</h4>
              <i className="fas fa-user-md fa-3x"></i>
            </div>
            <div className="info-panel">
              <div className="info-item">
                <span>
                  Cerrados: <strong className="info-value"> 20</strong>{" "}
                </span>
              </div>
              <div className="info-item">
                <span>
                  En Curso: <strong className="info-value"> 35</strong>{" "}
                </span>
              </div>
            </div>
          </div>
          <div className="panel summary">
            <div className="summary-panel-title">
              <h4>Móviles</h4>
              <i className="fas fa-ambulance fa-3x"></i>
            </div>
            <div className="info-panel">
              <div className="info-item">
                <span>
                  Activos: <strong className="info-value"> 20</strong>{" "}
                </span>
              </div>
              <div className="info-item">
                <span>
                  Sin Serv.: <strong className="info-value"> 35</strong>{" "}
                </span>
              </div>
            </div>
          </div>
          <div className="panel summary">
            <div className="summary-panel-title">
              <h4>Operadores</h4>
              <i className="fas fa-users fa-3x"></i>
            </div>
            <div className="info-panel">
              <div className="info-item">
                <span>
                  Receptores: <strong className="info-value"> 20</strong>{" "}
                </span>
              </div>
              <div className="info-item">
                <span>
                  Despachadores: <strong className="info-value"> 35</strong>{" "}
                </span>
              </div>
            </div>
          </div>
          <div className="panel summary">
            <div className="summary-panel-title">
              <h4>Estado General</h4>
              <i className="fas fa-info-circle fa-3x"></i>
            </div>
            <div className="info-panel">
              <div className="info-item">
                <span className="text-danger">
                  GPS: <strong className="info-value"> X</strong>{" "}
                </span>
              </div>
              <div className="info-item">
                <span className="text-success">
                  Interfaces: <strong className="info-value"> OK</strong>{" "}
                </span>
              </div>
              <div className="info-item">
                <span className="text-success">
                  Grabadora: <strong className="info-value"> OK</strong>{" "}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div id="content-container">
          <div className="panel content">
            <div id="chartdiv" className="chart"></div>
          </div>
          <div className="panel content">
            <h4> Some Relevant Info</h4>
            <p>
              {" "}
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.
            </p>
          </div>
          <div className="panel content">
            <div id="chartpiediv" className="chart"></div>
          </div>
          <div className="panel content"></div>
          <div className="panel content"></div>
          <div className="panel content"></div>
          <div className="panel content"></div>
          <div className="panel content"></div>
        </div>
      </div>
    );
  }
}
