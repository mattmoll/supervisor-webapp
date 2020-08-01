import React, { Component, Fragment } from "react";
import SummaryHome from "./SummaryHome";
import * as am4core from "@amcharts/amcharts4/core";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import {createServicesChart, createMobilesChart, createEmployeesServicesChart, 
        createEmployeesServicesAveragesChart}  from "./ChartsHelper";
import {getStateFromAPI} from "./StateHelper";

am4core.useTheme(am4themes_animated);

export default class Home extends Component {
  charts = [];
  colors = {
    "Rojos": "#DC6967",
    "Amarillos": "#DCD267",
    "Verdes" : "#67DC75",
    "Traslados": "#4472C4",
    "Cremita": "#FFE699",
    "Gris": "#D9D9D9"
  }
  state = {
    colorsVisibility : {
      "Rojos": true,
      "Amarillos": true,
      "Verdes" : true,
      "Traslados": true,
      "Cremita": true,
      "Gris": true
    }
  }
  
  stateAPI = getStateFromAPI();

  
  componentDidMount(){
    // TODO: Here goes call to the WebAPI

    let chartServices = createServicesChart("chartServices", this.stateAPI.totalesPorEstadoServicio);
    this.charts.push(chartServices);

    let chartMobiles = createMobilesChart("chartMobiles", this.stateAPI.estadosPorTipoDeMovil);
    this.charts.push(chartMobiles);

    let chartEmployeesServices = createEmployeesServicesChart("chartEmployeesServices", this.stateAPI.serviciosRecibidosDespachados);
    this.charts.push(chartEmployeesServices);

    let chartEmployeesServicesAverages = createEmployeesServicesAveragesChart("chartEmployeesServicesAverages", this.stateAPI.PromediosServiciosRecibidosDespachados);
    this.charts.push(chartEmployeesServicesAverages);
  }

  componentWillUnmount() {
    this.charts.forEach(chart => {
      if(chart){
        chart.dispose();
      }
    });
  }

  toggleColumn = (color, event) =>{
    event.preventDefault();
    let colorsVisibilityUpdt = this.state.colorsVisibility;
    colorsVisibilityUpdt[color] = !colorsVisibilityUpdt[color];
    this.setState({ colorsVisibilityUpdt })

  }

  isVisible = (color) =>{
    return this.state.colorsVisibility[color];

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
            <div className="container-services-table">
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th scope="col" style={{backgroundColor:"#9abcd6"}}>Estado</th>
                    {
                      this.stateAPI.serviciosPorEstadoYColor[0].serviciosPorColor.map((srvXColor, index) => 
                        this.isVisible(srvXColor.color) &&
                        (
                          <th key={index}  scope="col" 
                              style={{backgroundColor:this.colors[srvXColor.color], cursor:"pointer"}}>
                              {srvXColor.color} 
                          </th>
                        ) )
                    }
                  </tr>
                </thead>
                <tbody>
                  {this.stateAPI.serviciosPorEstadoYColor.map((srvXStateColor, index) => 
                  (
                    <tr  key={index}>
                      <th scope="row">{srvXStateColor.descripcion}</th>
                      {srvXStateColor.serviciosPorColor.map((srvXColor, index) => this.isVisible(srvXColor.color) &&
                      (<th key={index}>{srvXColor.cantidad}</th>)
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="togglers-container">
              {
                this.stateAPI.serviciosPorEstadoYColor[0].serviciosPorColor.map((srvXColor, index) => 
                (
                  <a className={"btn m-1 " + (this.isVisible(srvXColor.color) ? "btn-info" : "btn-secondary")}
                  key={index} href="!#" onClick={this.toggleColumn.bind(this, srvXColor.color)}>{srvXColor.color}</a>
                )
                )
              }
              </div>
            </div>
          </div>

          
          <div className="panel content row-container">
            <div className="half-width">
            <div id="chartEmployeesServices" className="chart"></div>
            </div>
            <div className="half-width">
            <div id="chartEmployeesServicesAverages" className="chart"></div>
            </div>
          </div>
          <div className="panel content"></div>
          <div className="panel content"></div>
          <div className="panel content"></div>
          <div className="panel content"></div>
        </div>
      </div>
    );
  }
}
