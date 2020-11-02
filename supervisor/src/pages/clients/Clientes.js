import React, { Component } from 'react'
import SummaryClientes from "./SummaryClientes";
import {getStateClientesFromAPI} from "../../utils/StateHelper";
import * as chartsClientes from "./ChartsClientes";
import axios from "axios";

export default class Clientes extends Component {

  charts = [];
  stateAPI = getStateClientesFromAPI();

  componentDidMount(){
    // TODO: Here goes call to the WebAPI
    this.getStateClient();
    this.charts.push(chartsClientes.createGroupsChart("chartGroups", this.stateAPI.gruposFamiliares));
    this.charts.push(chartsClientes.createAreasChart("chartAreas", this.stateAPI.areasProtegidas));
    this.charts.push(chartsClientes.createCovenantsChart("chartCovenants", this.stateAPI.convenios));
    this.charts.push(chartsClientes.createServicesPerCovenantChart("chartServicesPerCovenant", this.stateAPI.serviciosPorConvenio));
  }

  componentWillUnmount() {
    this.charts.forEach(chart => {
      if(chart){
        chart.dispose();
      }
    });
  }

  getStateClient = async () => {
    const state = await axios.get("http://192.168.222.120:7881/SuWebApi/StateClient", {
      headers: {
        'token': '+QJTB21vM0C4RYQgNTcxow=='
      }
    });
    console.log(state);
    return state;
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
            <div id="chartServicesPerCovenant" className="chart"></div>
          </div>
          
        </div>
      </div>
    )
  }
}
