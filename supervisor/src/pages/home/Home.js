import React, { Component } from "react";
import SummaryHome from "./SummaryHome";
import * as am4core from "@amcharts/amcharts4/core";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import * as chartsHome from "./ChartsHome";
import {getStateFromAPI} from "../../utils/StateHelper";
import ServicesTable from "./ServicesTable";

am4core.useTheme(am4themes_animated);

export default class Home extends Component {
  charts = [];  
  stateAPI = getStateFromAPI();

  componentDidMount(){
    // TODO: Here goes call to the WebAPI

    this.charts.push(chartsHome.createServicesChart("chartServices", this.stateAPI.totalesPorEstadoServicio));
    this.charts.push(chartsHome.createMobilesChart("chartMobiles", this.stateAPI.estadosPorTipoDeMovil));
    this.charts.push(chartsHome.createEmployeesServicesChart("chartEmployeesServices", this.stateAPI.serviciosRecibidosDespachados));
    this.charts.push(chartsHome.createEmployeesServicesAveragesChart("chartEmployeesServicesAverages", this.stateAPI.promediosServiciosRecibidosDespachados));
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
      <div>
        <SummaryHome summary={this.stateAPI.resumen}/>

        <div id="content-container">
          
          <div className="panel content">
            <div id="chartServices" className="chart"></div>
          </div>

          <div className="panel content">
            <div id="chartMobiles" className="chart"></div>
          </div>

          <div className="panel content">
            <div id="chartEmployeesServices" className="chart"></div>
          </div>
          
          <div className="panel content">
            <div id="chartEmployeesServicesAverages" className="chart"></div>
          </div>

          <div className="panel content">
            <ServicesTable servicesPerStatusAndColor={this.stateAPI.serviciosPorEstadoYColor}/>
          </div>

        </div>
      </div>
    );
  }
}
