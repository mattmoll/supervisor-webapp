import * as chartHelper from "./ChartsHelper";

export function createClosedServicesChart(chartContainer, data){
  let series = [{code:"activos", title:"Activos"},
                {code:"demorados", title:"Demorados"},
                {code:"cerrados", title:"Cerrados"},
                {code:"cancelados", title:"Cancelados"}, ];
  chartHelper.createLinesChartWithScrollAndZoom(chartContainer, data, "Servicios Cerrados", series);
}

export function createClosedPerColorChart(chartContainer, data){
  //createClientChart(chartContainer, data, "Cerrados por Color");
}

export function createDelayedPerHourChart(chartContainer, data){
  //createClientChart(chartContainer, data, "Demorados");
}

export function createResponseTimesPerColorChart(chartContainer, data){
  //createClientChart(chartContainer, data, "RTA por Color");
}

function createClientChart(chartContainer, data, titleText){
  let series = [{code:"activos", title:"Activos"},
                {code:"demorados", title:"Demorados"},
                {code:"cerrados", title:"Cerrados"},
                {code:"cancelados", title:"Cancelados"}, ]
  chartHelper.createStandardBarChart(chartContainer, data, titleText, series)
}

