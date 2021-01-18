import React from "react";

import ContentPanel from "../../layout/ContentPanel";
import * as chartsMobiles from "./ChartsMobiles";
import useApi from "../../utils/APIHelper";
import {AppContext} from "../../AppContext";
import {initializeTheme} from "../../utils/ThemeHelper";

initializeTheme();

export default function Mobiles() {
  const [charts, setCharts] = React.useState([]);  
  const [stateMobiles, setStateMobiles] = React.useState();

  const mobilesAPI = useApi("/StateMobiles")

  const {themeToggle} = React.useContext(AppContext);

  React.useEffect(() => {
    if(stateMobiles == undefined){
      loadCharts(null);
      //servicesAPI.makeRequest(onStateRetrieved);
    }
    else{
      recreateCharts(stateMobiles);
    }
  
    return () => {
      destroyCharts();
    };
  }, [themeToggle]);

  const onStateRetrieved = (stateMobilesFromAPI) => {
    setStateMobiles(stateMobilesFromAPI);
    loadCharts(stateMobilesFromAPI);
  }

  const loadCharts = async (stateForCharts) => {
    setCharts([

      chartsMobiles.createServicesPerMobile("chartServicesPerMobile", null),
            /*
      chartsServicios.createClosedPerColorChart("chartClosedPerColor", stateForCharts.cerradosPorColor),
      */
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

  // if(stateMobiles == null){
  //   return <p>Loading Móviles...</p>;
  // }

  return (
    <div id="content-container">    
      <ContentPanel isVerticalPanel={true}>
        <div id="chartServicesPerMobile" className="chart pr-3"></div>
      </ContentPanel>

      <ContentPanel isVerticalPanel={true}>
        <div id="chartServicesPerVendor" className="chart pr-3"></div>
      </ContentPanel>
    </div>
  );
}
