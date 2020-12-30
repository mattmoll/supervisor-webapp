import React from 'react'

import * as chartsServicios from "./ChartsServicios";
import useApi from "../../utils/APIHelper";
import {AppContext} from "../../AppContext";

export default function Servicios() {
  const [charts, setCharts] = React.useState([]);  
  const [stateServices, setStateServices] = React.useState();

  const servicesAPI = useApi("/StateService")

  const {themeToggle} = React.useContext(AppContext);


  React.useEffect(() => {
    if(stateServices == undefined){
      servicesAPI.makeRequest(onStateRetrieved);
    }
    else{
      recreateCharts(stateServices);
    }
  
    return () => {
      destroyCharts();
    };
  }, [themeToggle]);

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

  const destroyCharts = () =>{
    charts.forEach(chart => {
      if(chart) chart.dispose();
    });
  }

  const recreateCharts = (state) => {
    destroyCharts();
    loadCharts(state);
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
