import React from 'react'
import SummaryClientes from "./SummaryClientes";
import ContentPanel from "../../layout/ContentPanel";
import * as chartsClientes from "./ChartsClients";
import useApi from "../../utils/APIHelper";
import {AppContext} from "../../AppContext";
import {initializeTheme} from "../../utils/ThemeHelper";

initializeTheme();

export default function Clientes() {
  const [charts, setCharts] = React.useState([]);  
  const [stateClients, setStateClients] = React.useState();

  const clientAPI = useApi("/StateClient")

  const {themeToggle} = React.useContext(AppContext);

  React.useEffect(() => {
    if(stateClients == undefined){
      clientAPI.makeRequest(onStateRetrieved);
    }
    else{
      recreateCharts(stateClients);
    }
  
    return () => {
      destroyCharts();
    };
  }, [themeToggle]);

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

  const destroyCharts = () =>{
    charts.forEach(chart => {
      if(chart) chart.dispose();
    });
  }

  const recreateCharts = (state) => {
    destroyCharts();
    loadCharts(state);
  }

  if(stateClients == null){
    return <p>Loading Clientes...</p>;
  }

  return (
    <div>
      <SummaryClientes summary={stateClients.resumen}/>

      <div id="content-container">   

        <ContentPanel>
          <div id="chartGroups" className="chart"></div>
        </ContentPanel>

        <ContentPanel>
        <div id="chartAreas" className="chart"></div>
        </ContentPanel>

        <ContentPanel>
        <div id="chartCovenants" className="chart"></div>
        </ContentPanel>

        <ContentPanel>
        <div id="chartServicesPerCovenant" className="chart"></div>
        </ContentPanel>

      </div>
    </div>
  )
  
}
