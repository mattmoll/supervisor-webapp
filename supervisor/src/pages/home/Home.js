import React from "react";

import SummaryHome from "./SummaryHome";
import * as chartsHome from "./ChartsHome";
import ServicesTable from "./ServicesTable";
import useApi from "../../utils/APIHelper";


chartsHome.initializeChartsLibrary();

export default function Home() {
  const [charts, setCharts] = React.useState([]);  
  const [stateHome, setStateHome] = React.useState();

  const stateAPI = useApi("/State")

  React.useEffect(() => {
    stateAPI.makeRequest(onStateRetrieved);

    return () => {
      charts.forEach(chart => {
        if(chart) chart.dispose();
      });
    };
  }, []);

  const onStateRetrieved = (stateFromAPI) => {
    setStateHome(stateFromAPI);
    loadCharts(stateFromAPI);
  }

  const loadCharts = (stateForCharts) => {
    setCharts([
      chartsHome.createServicesChart("chartServices", stateForCharts.totalesPorEstadoServicio),
      chartsHome.createMobilesChart("chartMobiles", stateForCharts.estadosPorTipoDeMovil),
      chartsHome.createEmployeesServicesChart("chartEmployeesServices", stateForCharts.serviciosRecibidosDespachados),
      chartsHome.createEmployeesServicesAveragesChart("chartEmployeesServicesAverages", stateForCharts.promediosServiciosRecibidosDespachados),
    ]);
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
