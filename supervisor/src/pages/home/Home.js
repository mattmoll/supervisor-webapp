import React from "react";

import SummaryHome from "./SummaryHome";
import * as chartsHome from "./ChartsHome";
import ServicesTable from "./ServicesTable";
import useApi from "../../utils/APIHelper";
import {AppContext} from "../../AppContext";


chartsHome.initializeChartsLibrary();

export default function Home() {
  const [charts, setCharts] = React.useState([]);  
  const [stateHome, setStateHome] = React.useState();

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
        
        <div className="panel content">
          <div id="chartServices" className="chart"></div>
        </div>

        <div className="panel content">
          <div id="chartMobiles" className="chart"></div>
        </div>

        <div className="panel content">
          <div id="chartEmployeesServices" className="chart"></div>
        </div>
        
        <div className="panel content">
          <div id="chartEmployeesServicesAverages" className="chart"></div>
        </div>

        <div className="panel content">
          <ServicesTable servicesPerStatusAndColor={stateHome.serviciosPorEstadoYColor}/>
        </div>

      </div>
    </div>
  );
  
}
