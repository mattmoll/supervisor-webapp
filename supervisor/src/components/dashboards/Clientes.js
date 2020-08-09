import React, { Component } from 'react'
import SummaryClientes from "./SummaryClientes";
import {getStateClientesFromAPI} from "./StateHelper";
import * as chartsClientes from "../charts/ChartsClientes";

export default class Clientes extends Component {

  charts = [];
  stateAPI = getStateClientesFromAPI();

  componentDidMount(){
    // TODO: Here goes call to the WebAPI

    let chartGroups = chartsClientes.createGroupsChart("chartGroups", this.stateAPI.gruposFamiliares);
    this.charts.push(chartGroups);

    let chartAreas = chartsClientes.createAreasChart("chartAreas", this.stateAPI.areasProtegidas);
    this.charts.push(chartAreas);

    let chartCovenants = chartsClientes.createCovenantsChart("chartCovenants", this.stateAPI.convenios);
    this.charts.push(chartCovenants);
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
        <div>
          <SummaryClientes summary={this.stateAPI.resumen}/>
        </div>
  
        
        <div id="content-container">
                  
          <div className="panel content">
            <div id="chartGroups" className="chart"></div>
          </div>
  
          <div className="panel content">
            <div id="chartAreas" className="chart"></div>
          </div>
  
          <div className="panel content">
            <div id="chartCovenants" className="chart"></div>
          </div>
  
          <div className="panel content">
            <div id="someChart" className="chart"></div>
          </div>
          
        </div>
      </div>
    )
  }
}
