import React from 'react'
import axios from "axios";

import {AppContext} from '../../AppContext';
import * as chartsServicios from "./ChartsServicios";

export default function Servicios() {
  const [charts, setCharts] = React.useState([]);  
  const [stateServices, setStateServices] = React.useState({});
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
    await axios.get(apiUrl + "/GetStateService", {
      headers: {
        'token': token
      }
    }).then(result => {
      const stateServicesFromAPI = result.data;
      console.log("Test");
      console.log(stateServicesFromAPI);
      if(stateServicesFromAPI != null){
        setStateServices(stateServicesFromAPI);
        loadCharts(stateServicesFromAPI);
      }
    })
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
