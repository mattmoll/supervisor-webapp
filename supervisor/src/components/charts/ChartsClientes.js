import * as chartHelper from "./ChartsHelper";

export function createGroupsChart(chartContainer, data){
  createClientChart(chartContainer, data, "Grupos Familiares");
}

export function createAreasChart(chartContainer, data){
  createClientChart(chartContainer, data, "Areas Protegidas");
}

export function createCovenantsChart(chartContainer, data){
  createClientChart(chartContainer, data, "Convenios");
}

function createClientChart(chartContainer, data, titleText){
  let series = [{code:"activos", title:"Activos"},
                {code:"demorados", title:"Demorados"},
                {code:"cerrados", title:"Cerrados"},
                {code:"cancelados", title:"Cancelados"}, ]
  chartHelper.createStandardBarChart(chartContainer, data, titleText, series)
}

