import React from 'react'
import SummaryClientes from "./SummaryClientes";
import {AppContext} from '../../AppContext';
import {getStateClientesFromAPI} from "../../utils/StateHelper";
import * as chartsClientes from "./ChartsClientes";
import axios from "axios";

export default function Clientes() {
  const [charts, setCharts] = React.useState([]);  
  const [stateClients, setStateClients] = React.useState({});

  const {apiUrl} = React.useContext(AppContext);

  React.useEffect(() => {
    loadCharts();
  
    return () => {
      charts.forEach(chart => {
        if(chart) chart.dispose();
      });
    };

  }, []);

  const loadCharts = async () => {
    setStateClients(await getStateClient());
    if (stateClients){
      setCharts([
        chartsClientes.createGroupsChart("chartGroups", stateClients.gruposFamiliares),
        chartsClientes.createAreasChart("chartAreas", stateClients.areasProtegidas),
        chartsClientes.createCovenantsChart("chartCovenants", stateClients.convenios),
        chartsClientes.createServicesPerCovenantChart("chartServicesPerCovenant", stateClients.serviciosPorConvenio),
      ]);
    }
  }

  const getStateClient = async () => {
    const state = await axios.get(apiUrl + "/StateClient", {
      headers: {
        'token': 'bf0b6W6plGE6kYvyyV/180g=='
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
