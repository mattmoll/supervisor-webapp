import * as chartHelper from "./ChartsHelper";

export function createGroupsChart(chartContainer, data){
  createClientChart(chartContainer, data, "Family Groups");
}

export function createAreasChart(chartContainer, data){
  createClientChart(chartContainer, data, "Protected Areas");
}

export function createCovenantsChart(chartContainer, data){
  createClientChart(chartContainer, data, "Contracts");
}

function createClientChart(chartContainer, data, titleText){
  let series = [{code:"activos", title:"Actives"},
                {code:"demorados", title:"Delayed"},
                {code:"cerrados", title:"Closed"},
                {code:"cancelados", title:"Canceled"}, ]
  chartHelper.createStandardBarChart(chartContainer, data, titleText, series)
}

export function createServicesPerCovenantChart(chartContainer, data){
  let series = [{code:"activos", title:"Activos"},
                {code:"demorados", title:"Demorados"},]
  chartHelper.createStackedBarChart(chartContainer, data, "Per Client", series)
}

