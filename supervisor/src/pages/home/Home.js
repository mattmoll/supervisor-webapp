import React from "react";
import axios from "axios";

import { AppContext } from '../../AppContext';
import SummaryHome from "./SummaryHome";
import * as chartsHome from "./ChartsHome";
import {getStateFromAPI} from "../../utils/StateHelper";
import ServicesTable from "./ServicesTable";

chartsHome.initializeChartsLibrary();

export default function Home() {
  const [charts, setCharts] = React.useState([]);  
  const [stateHome, setStateHome] = React.useState({});

  const {apiUrl} = React.useContext(AppContext);

  React.useEffect(() => {
    loadCharts();

    return () => {
      charts.forEach(chart => {
        if(chart) chart.dispose();
      });
    };

  }, []);

  const loadCharts = async () => {
    const state = await getState();
    setStateHome(state);
    console.log(stateHome)
    
    setCharts([
      chartsHome.createServicesChart("chartServices", state.totalesPorEstadoServicio),
      chartsHome.createMobilesChart("chartMobiles", state.estadosPorTipoDeMovil),
      chartsHome.createEmployeesServicesChart("chartEmployeesServices", state.serviciosRecibidosDespachados),
      chartsHome.createEmployeesServicesAveragesChart("chartEmployeesServicesAverages", state.promediosServiciosRecibidosDespachados),
    ]);
    
  }

  const getState = async () => {
    console.log(apiUrl);
    const state = await axios.get(apiUrl + "/State", {
      headers: {
        'token': 'lj21Defz3US0ya7wGCI2Ig=='
      }
    });
    return state;
  }
  
  if(stateHome === null){
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
