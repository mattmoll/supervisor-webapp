import React from "react";
import axios from "axios";

import { AppContext } from '../../AppContext';
import SummaryHome from "./SummaryHome";
import * as chartsHome from "./ChartsHome";
import ServicesTable from "./ServicesTable";

chartsHome.initializeChartsLibrary();

export default function Home() {
  const [charts, setCharts] = React.useState([]);  
  const [stateHome, setStateHome] = React.useState();

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
    await axios.get(apiUrl + "/State", {
      headers: {
        'token': token
      }
    }).then(result => {
      const stateHomeFromAPI = result.data;
      setStateHome(stateHomeFromAPI);
      loadCharts(stateHomeFromAPI);
    })
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
