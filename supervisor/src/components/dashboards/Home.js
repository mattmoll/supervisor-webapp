import React, { Component } from "react";
import SummaryHome from "./SummaryHome";
import * as am4core from "@amcharts/amcharts4/core";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import {createServicesChart}  from "./ChartsHelper";

am4core.useTheme(am4themes_animated);

export default class Home extends Component {
  chartStatusServices = null;
  state = {
    resumen: {
      servicios: {
        enCurso: 35,
        cerrados: 20,
        cancelados: 12,
      },
      moviles: {
        activos: 20,
        fueraServicio: 35,
      },
      operadores: {
        receptores: 24,
        despachadores: 7,
      },
      estadoGeneral: {
        gps: false,
        interfaces: true,
        grabadora: true,
      },
    },
    totalesPorEstadoServicio: {
      activos: 35,
      demorados: 22,
      apoyos: 15,
      atencionesMultiples: 32,
    }
  };

  
  componentDidMount(){
    // TODO: Here goes call to the WebAPI

    this.chartStatusServices = createServicesChart(this.state.totalesPorEstadoServicio);
  }

  componentWillUnmount() {
    if (this.chart) {
      this.chart.dispose();
    }
  }

  render() {
    return (
      <div>
        <SummaryHome summary={this.state.resumen}/>

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
