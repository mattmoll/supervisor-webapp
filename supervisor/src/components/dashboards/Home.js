import React, { Component } from "react";

export default class Home extends Component {
  render() {
    return (
      <div>
        <div id="summary-container">
          <div class="panel summary">
            <div class="summary-panel-title">
              <h4>Servicios</h4>
              <i class="fas fa-user-md fa-3x"></i>
            </div>
            <div class="info-panel">
              <div class="info-item">
                <span>
                  Cerrados: <strong class="info-value"> 20</strong>{" "}
                </span>
              </div>
              <div class="info-item">
                <span>
                  En Curso: <strong class="info-value"> 35</strong>{" "}
                </span>
              </div>
            </div>
          </div>
          <div class="panel summary">
            <div class="summary-panel-title">
              <h4>Móviles</h4>
              <i class="fas fa-ambulance fa-3x"></i>
            </div>
            <div class="info-panel">
              <div class="info-item">
                <span>
                  Activos: <strong class="info-value"> 20</strong>{" "}
                </span>
              </div>
              <div class="info-item">
                <span>
                  Sin Serv.: <strong class="info-value"> 35</strong>{" "}
                </span>
              </div>
            </div>
          </div>
          <div class="panel summary">
            <div class="summary-panel-title">
              <h4>Operadores</h4>
              <i class="fas fa-users fa-3x"></i>
            </div>
            <div class="info-panel">
              <div class="info-item">
                <span>
                  Receptores: <strong class="info-value"> 20</strong>{" "}
                </span>
              </div>
              <div class="info-item">
                <span>
                  Despachadores: <strong class="info-value"> 35</strong>{" "}
                </span>
              </div>
            </div>
          </div>
          <div class="panel summary">
            <div class="summary-panel-title">
              <h4>Estado General</h4>
              <i class="fas fa-info-circle fa-3x"></i>
            </div>
            <div class="info-panel">
              <div class="info-item">
                <span class="text-danger">
                  GPS: <strong class="info-value"> X</strong>{" "}
                </span>
              </div>
              <div class="info-item">
                <span class="text-success">
                  Interfaces: <strong class="info-value"> OK</strong>{" "}
                </span>
              </div>
              <div class="info-item">
                <span class="text-success">
                  Grabadora: <strong class="info-value"> OK</strong>{" "}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div id="content-container">
          <div class="panel content">
            <div id="chartdiv" class="chart"></div>
          </div>
          <div class="panel content">
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
          <div class="panel content">
            <div id="chartpiediv" class="chart"></div>
          </div>
          <div class="panel content"></div>
          <div class="panel content"></div>
          <div class="panel content"></div>
          <div class="panel content"></div>
          <div class="panel content"></div>
        </div>
      </div>
    );
  }
}
