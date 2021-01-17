import React from 'react'

import ContentPanel from "../../layout/ContentPanel";
import * as chartsServicios from "./ChartsServices";
import useApi from "../../utils/APIHelper";
import {AppContext} from "../../AppContext";
import {initializeTheme} from "../../utils/ThemeHelper";

initializeTheme();

export default function Services() {
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
      console.log("test");
    });
  }

  const recreateCharts = (state) => {
    destroyCharts();
    loadCharts(state);
  }

  if(stateServices == null){
    return <p>Loading Servicios...</p>;
  }

  return (
    <div id="content-container">
                
      <ContentPanel>
        <div id="chartClosedServices" className="chart pr-3"></div>
      </ContentPanel>

      <ContentPanel>
        <div id="chartClosedPerColor" className="chart pr-3"></div>
      </ContentPanel>

      <ContentPanel>
        <div id="chartDelayedPerHour" className="chart pr-3"></div>
      </ContentPanel>

      <ContentPanel>
        <div id="chartResponseTimesPerColor" className="chart pr-3"></div>
      </ContentPanel>
    
  </div>
  )
  
}
