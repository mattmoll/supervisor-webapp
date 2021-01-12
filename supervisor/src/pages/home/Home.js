import React from "react";

import ContentPanel from "../../layout/ContentPanel";
import SummaryHome from "./SummaryHome";
import * as chartsHome from "./ChartsHome";
import ServicesTable from "./ServicesTable";
import useApi from "../../utils/APIHelper";
import {AppContext} from "../../AppContext";
import {getStateFromAPI} from "../../utils/StateHelper"; 
import {initializeTheme} from "../../utils/ThemeHelper";

initializeTheme();

export default function Home() {
  const [charts, setCharts] = React.useState([]);  
  const [stateHome, setStateHome] = React.useState(getStateFromAPI());

  const stateAPI = useApi("/State")

  const {themeToggle} = React.useContext(AppContext);

  React.useEffect(() => {
    if(stateHome == undefined){
      stateAPI.makeRequest(onStateRetrieved);
    }
    else{
      recreateCharts(stateHome);
    }

    return () => {
      destroyCharts();
    };
  }, [themeToggle]);

  const destroyCharts = () =>{
    charts.forEach(chart => {
      if(chart) chart.dispose();
    });
  }

  const onStateRetrieved = (stateFromAPI) => {
    setStateHome(stateFromAPI);
    loadCharts(stateFromAPI);
  }

  const loadCharts = (stateFromAPI) => {
    setCharts([
      chartsHome.createServicesChart("chartServices", stateFromAPI.totalesPorEstadoServicio),
      chartsHome.createMobilesChart("chartMobiles", stateFromAPI.estadosPorTipoDeMovil),
      chartsHome.createEmployeesServicesChart("chartEmployeesServices", stateFromAPI.serviciosRecibidosDespachados),
      chartsHome.createEmployeesServicesAveragesChart("chartEmployeesServicesAverages", stateFromAPI.promediosServiciosRecibidosDespachados),
    ]);
  }

  const recreateCharts = (state) => {
    destroyCharts();
    loadCharts(state);
  }
  
  if(stateHome == null){
    return <p>Loading Home...</p>;
  }

  return (
    <div>
      <SummaryHome summary={stateHome.resumen}/>

      <div id="content-container">
        
        <ContentPanel>
          <div id="chartServices" className="chart"></div>
        </ContentPanel>

        <ContentPanel>
          <div id="chartMobiles" className="chart"></div>
        </ContentPanel>

        <ContentPanel>
          <div id="chartEmployeesServices" className="chart"></div>
        </ContentPanel>
        
        <ContentPanel>
          <div id="chartEmployeesServicesAverages" className="chart"></div>
        </ContentPanel>

        <ContentPanel>
          <ServicesTable servicesPerStatusAndColor={stateHome.serviciosPorEstadoYColor}/>
        </ContentPanel>

      </div>
    </div>
  );
  
}
