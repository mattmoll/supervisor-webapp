import React from 'react'
import axios from "axios";

import {AppContext} from '../../AppContext';
import { getStateServiciosFromAPI } from '../../utils/StateHelper';
import * as chartsServicios from "./ChartsServicios";

export default function Servicios() {
  const [charts, setCharts] = React.useState([]);  
  const [stateServices, setStateServices] = React.useState(getStateServiciosFromAPI());
  const {apiUrl} = React.useContext(AppContext);

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
    const state = await axios.get(apiUrl + "/GetStateService", {
      headers: {
        'token': 'f0b6W6plGE6kYvyyV/180g=='
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
