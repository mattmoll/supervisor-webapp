import React from 'react'
import axios from "axios";

import { getStateServiciosFromAPI } from '../../utils/StateHelper';
import * as chartsServicios from "./ChartsServicios";

export default function Servicios() {
  const [charts, setCharts] = React.useState([]);  
  const [stateServices, setStateServices] = React.useState(getStateServiciosFromAPI());

  React.useEffect(() => {
    getStateService();
    setCharts([
      chartsServicios.createClosedServicesChart("chartClosedServices", stateServices.cerradosPorEstado),
      chartsServicios.createClosedPerColorChart("chartClosedPerColor", stateServices.cerradosPorColor),
      chartsServicios.createDelayedPerStandardChart("chartDelayedPerHour", stateServices.demoradosPorEstandar),
      chartsServicios.createResponseTimesPerColorChart("chartResponseTimesPerColor", stateServices.tiempoRtaPorColor),
    ]);
  
    return () => {
      charts.forEach(chart => {
        if(chart) chart.dispose();
      });
    };

  }, []);

  const getStateService = async () => {
    const state = await axios.get("http://192.168.222.120:7881/SuWebApi/GetStateService", {
      headers: {
        'token': '+QJTB21vM0C4RYQgNTcxow=='
      }
    });
    return state;
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
