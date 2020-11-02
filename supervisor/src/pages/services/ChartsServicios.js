import * as chartHelper from "../../utils/ChartsHelper";

export function createClosedServicesChart(chartContainer, data){
  chartHelper.createLinesChart(chartContainer, data, "Cerrados Por Estado");
}

export function createClosedPerColorChart(chartContainer, data){
  chartHelper.createLinesChart(chartContainer, data, "Cerrados Por Color");
}

export function createDelayedPerStandardChart(chartContainer, data){
  chartHelper.createLinesChart(chartContainer, data, "Demorados Por Estandar");
}

export function createResponseTimesPerColorChart(chartContainer, data){
  chartHelper.createLinesChart(chartContainer, data, "TRTA Por Color");
}
