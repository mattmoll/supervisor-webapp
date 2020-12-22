import React from 'react'

import * as chartsServicios from "./ChartsServicios";
import useApi from "../../utils/APIHelper";

export default function Servicios() {
  const [charts, setCharts] = React.useState([]);  
  const [stateServices, setStateServices] = React.useState({});

  const servicesAPI = useApi("/StateService")

  React.useEffect(() => {
    servicesAPI.makeRequest(onStateRetrieved);

    return () => {
      charts.forEach(chart => {
        if(chart) chart.dispose();
      });
    };
  }, []);

  const onStateRetrieved = (stateServicesFromAPI) => {
    setStateServices(stateServicesFromAPI);
    loadCharts(stateServicesFromAPI);
  }

  const loadCharts = async (stateForCharts) => {
    setCharts([
      chartsServicios.createClosedServicesChart("chartClosedServices", stateForCharts.cerradosPorEstado),
      chartsServicios.createClosedPerColorChart("chartClosedPerColor", stateForCharts.cerradosPorColor),
      chartsServicios.createDelayedPerStandardChart("chartDelayedPerHour", stateForCharts.demoradosPorEstandar),
      chartsServicios.createResponseTimesPerColorChart("chartResponseTimesPerColor", stateForCharts.tiempoRtaPorColor),
    ]);
  }

  if(stateServices == null){
    return <p>Loading Clients...</p>;
  }

  return (
    <div id="content-container">
                
      <div className="panel content">
        <div id="chartClosedServices" className="chart pr-3"></div>
      </div>

      <div className="panel content">
        <div id="chartClosedPerColor" className="chart pr-3"></div>
      </div>

      <div className="panel content">
        <div id="chartDelayedPerHour" className="chart pr-3"></div>
      </div>

      <div className="panel content">
        <div id="chartResponseTimesPerColor" className="chart pr-3"></div>
      </div>
    
  </div>
  )
  
}
