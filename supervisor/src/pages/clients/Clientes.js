import React from 'react'
import SummaryClientes from "./SummaryClientes";
import {AppContext} from '../../AppContext';
import * as chartsClientes from "./ChartsClientes";
import axios from "axios";

export default function Clientes() {
  const [charts, setCharts] = React.useState([]);  
  const [stateClients, setStateClients] = React.useState({});

  const {apiUrl, token} = React.useContext(AppContext);

  React.useEffect(() => {
    loadState();
  
    return () => {
      charts.forEach(chart => {
        if(chart) chart.dispose();
      });
    };
  }, []);

  const loadState = async () => {
    await axios.get(apiUrl + "/StateClient", {
      headers: {
        'token': token
      }
    }).then(result => {
      const stateClientsFromAPI = result.data;
      setStateClients(stateClientsFromAPI);
      loadCharts(stateClientsFromAPI);
    })
  }

  const loadCharts = async (stateForCharts) => {
    setCharts([
      chartsClientes.createGroupsChart("chartGroups", stateForCharts.gruposFamiliares),
      chartsClientes.createAreasChart("chartAreas", stateForCharts.areasProtegidas),
      chartsClientes.createCovenantsChart("chartCovenants", stateForCharts.convenios),
      chartsClientes.createServicesPerCovenantChart("chartServicesPerCovenant", stateForCharts.serviciosPorConvenio),
    ]);
  }

  if(stateClients == null){
    return <p>Loading Clients...</p>;
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
