import React from "react";
import * as am4core from "@amcharts/amcharts4/core";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import axios from "axios";

import SummaryHome from "./SummaryHome";
import * as chartsHome from "./ChartsHome";
import {getStateFromAPI} from "../../utils/StateHelper";
import ServicesTable from "./ServicesTable";

am4core.useTheme(am4themes_animated);

export default function Home() {
  const [charts, setCharts] = React.useState([]);  

  const stateHome = getStateFromAPI();  

  React.useEffect(() => {
    setCharts([
      chartsHome.createServicesChart("chartServices", stateHome.totalesPorEstadoServicio),
      chartsHome.createMobilesChart("chartMobiles", stateHome.estadosPorTipoDeMovil),
      chartsHome.createEmployeesServicesChart("chartEmployeesServices", stateHome.serviciosRecibidosDespachados),
      chartsHome.createEmployeesServicesAveragesChart("chartEmployeesServicesAverages", stateHome.promediosServiciosRecibidosDespachados),
    ]);
  
    return () => {
      charts.forEach(chart => {
        if(chart) chart.dispose();
      });
    };

  }, []);

  // const getState = async () => {
  //   const state = await axios.get("http://192.168.222.4:7881/SuWebApi/State", {
  //     headers: {
  //       'token': 'ImpPBLph3UCyYR9zONDDUQ=='
  //     }
  //   });
  //   console.log(state);
  //   return state;
  // }
 
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
