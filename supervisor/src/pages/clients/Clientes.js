import React from 'react'
import SummaryClientes from "./SummaryClientes";
import * as chartsClientes from "./ChartsClientes";
import useApi from "../../utils/APIHelper";

export default function Clientes() {
  const [charts, setCharts] = React.useState([]);  
  const [stateClients, setStateClients] = React.useState({});

  const clientAPI = useApi("/StateClient")

  React.useEffect(() => {
    clientAPI.makeRequest(onStateRetrieved);
  
    return () => {
      charts.forEach(chart => {
        if(chart) chart.dispose();
      });
    };
  }, []);

  const onStateRetrieved = (stateClientsFromAPI) => {
    setStateClients(stateClientsFromAPI);
    loadCharts(stateClientsFromAPI);
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
