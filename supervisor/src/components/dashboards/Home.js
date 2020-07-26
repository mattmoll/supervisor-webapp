import React, { Component } from "react";
import SummaryHome from "./SummaryHome";
import * as am4core from "@amcharts/amcharts4/core";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import {createServicesChart, createMobilesChart}  from "./ChartsHelper";

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
    },
    estadosPorTipoDeMovil: [
      {
        type: "UTIM",
        activos: 20,
        inactivos: 5,
      }, {
        type: "Auto",
        activos: 11,
        inactivos: 2,
      }, {
        type: "interface",
        activos: 2,
        inactivos: 15,
      }
    ],
    serviciosPorEstadoYColor:[
      {
        descripcion:"Activos",
        serviciosPorColor: [
          {color: "Rojos", cantidad: 25},
          {color: "Amarillos", cantidad: 45},
          {color: "Verdes", cantidad: 80},
          {color: "Traslados", cantidad: 12},
          {color: "Cremita", cantidad: 25},
          {color: "Gris", cantidad: 45},
        ]
      },
      {
        descripcion:"Demorados",
        serviciosPorColor: [
          {color: "Rojo", cantidad: 10},
          {color: "Amarillos", cantidad: 5},
          {color: "Verdes", cantidad: 120},
          {color: "Traslados", cantidad: 0},
          {color: "Cremita", cantidad: 2},
          {color: "Gris", cantidad: 10},
        ]
      },
      {
        descripcion:"Apoyos",
        serviciosPorColor: [
          {color: "Rojos", cantidad: 2},
          {color: "Amarillos", cantidad: 15},
          {color: "Verdes", cantidad: 0},
          {color: "Traslados", cantidad: 0},
          {color: "Cremita", cantidad: 12},
          {color: "Gris", cantidad: 4},
        ]
      },
      {
        descripcion:"At. Multiples",
        serviciosPorColor: [
          {color: "Rojo", cantidad: 100},
          {color: "Amarillos", cantidad: 5},
          {color: "Verdes", cantidad: 10},
          {color: "Traslados", cantidad: 40},
          {color: "Cremita", cantidad: 2},
          {color: "Gris", cantidad: 10},
        ]
      },
      {
        descripcion:"Totales",
        serviciosPorColor: [
          {color: "Rojo", cantidad: 300},
          {color: "Amarillos", cantidad: 150},
          {color: "Verdes", cantidad: 100},
          {color: "Traslados", cantidad: 140},
          {color: "Cremita", cantidad: 80},
          {color: "Gris", cantidad: 90},
        ]
      },
    ]
  };

  
  componentDidMount(){
    // TODO: Here goes call to the WebAPI

    let chartServices = createServicesChart("chartServices", this.state.totalesPorEstadoServicio);
    this.charts.push(chartServices);

    let chartMobiles = createMobilesChart("chartMobiles", this.state.estadosPorTipoDeMovil);
    this.charts.push(chartMobiles);
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
        <SummaryHome summary={this.state.resumen}/>

        <div id="content-container">
          
          <div className="panel content">
            <div id="chartServices" className="chart"></div>
          </div>

          <div className="panel content">
            <div id="chartMobiles" className="chart"></div>
          </div>

          <div className="panel content">
            <div className="container-services-table">
              <table className="table table-sm table-bordered">
                <thead>
                  <tr>
                    <th scope="col" style={{backgroundColor:"#9abcd6"}}>Estado</th>
                    {this.state.serviciosPorEstadoYColor[0].serviciosPorColor.map((srvXColor, index) => 
                    (<th key={index} scope="col" style={{backgroundColor:this.colors[srvXColor.color]}}>{srvXColor.color}</th>) )}
                  </tr>
                </thead>
                <tbody>
                  {this.state.serviciosPorEstadoYColor.map((srvXStateColor, index) => (
                    <tr  key={index}>
                      <th scope="row">{srvXStateColor.descripcion}</th>
                      {srvXStateColor.serviciosPorColor.map((srvXColor, index) => (<th key={index}>{srvXColor.cantidad}</th>) )}
                  </tr>
                  ))
                  }
                </tbody>
              </table>
            </div>
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
