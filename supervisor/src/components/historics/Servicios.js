import React, { Component } from 'react'
import { getStateServiciosFromAPI } from '../dashboards/StateHelper';
import * as chartsServicios from "../charts/ChartsServicios";

export default class Servicios extends Component {
  charts = [];
  stateAPI = getStateServiciosFromAPI();

  componentDidMount(){
    // TODO: Here goes call to the WebAPI

    this.charts.push(chartsServicios.createClosedServicesChart("chartClosedServices", this.stateAPI.serviciosCerrados));
    this.charts.push(chartsServicios.createClosedPerColorChart("chartClosedPerColor", this.stateAPI.cerradosPorColor));
    this.charts.push(chartsServicios.createDelayedPerHourChart("chartDelayedPerHour", this.stateAPI.demoradosPorHora));
    this.charts.push(chartsServicios.createResponseTimesPerColorChart("chartResponseTimesPerColor", this.stateAPI.tiempoRtaPorColor));
  }

  componentWillUnmount() {
    this.charts.forEach(chart => {
      if(chart){
        chart.dispose();
      }
    });
  }

  render() {
    return (
      <div id="content-container">
                  
        <div className="panel content">
          <div id="chartClosedServices" className="chart"></div>
        </div>

        <div className="panel content">
          <div id="chartClosedPerColor" className="chart"></div>
        </div>

        <div className="panel content">
          <div id="chartDelayedPerHour" className="chart"></div>
        </div>

        <div className="panel content">
          <div id="chartResponseTimesPerColor" className="chart"></div>
        </div>
      
    </div>
    )
  }
}
