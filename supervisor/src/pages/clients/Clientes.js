import React from 'react'
import SummaryClientes from "./SummaryClientes";
import {getStateClientesFromAPI} from "../../utils/StateHelper";
import * as chartsClientes from "./ChartsClientes";
import axios from "axios";

export default function Clientes() {
  const [charts, setCharts] = React.useState([]);  
  const [stateClients, setStateClients] = React.useState(getStateClientesFromAPI());

  
  React.useEffect(() => {
    getStateClient();
    setCharts([
      chartsClientes.createGroupsChart("chartGroups", stateClients.gruposFamiliares),
      chartsClientes.createAreasChart("chartAreas", stateClients.areasProtegidas),
      chartsClientes.createCovenantsChart("chartCovenants", stateClients.convenios),
      chartsClientes.createServicesPerCovenantChart("chartServicesPerCovenant", stateClients.serviciosPorConvenio),
    ]);
  
    return () => {
      charts.forEach(chart => {
        if(chart) chart.dispose();
      });
    };

  }, []);

  const getStateClient = async () => {
    const state = await axios.get("http://192.168.222.120:7881/SuWebApi/StateClient", {
      headers: {
        'token': '+QJTB21vM0C4RYQgNTcxow=='
      }
    });
    console.log(state);
    return state;
  }

  return (
    <div>
      <div>
        <SummaryClientes summary={stateClients.resumen}/>
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
