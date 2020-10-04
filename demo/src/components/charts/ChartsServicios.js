import * as chartHelper from "./ChartsHelper";

export function createClosedServicesChart(chartContainer, data){
  chartHelper.createLinesChart(chartContainer, data, "Closed Per Status");
}

export function createClosedPerColorChart(chartContainer, data){
  chartHelper.createLinesChart(chartContainer, data, "Closed Per Color");
}

export function createDelayedPerStandardChart(chartContainer, data){
  chartHelper.createLinesChart(chartContainer, data, "Delayed Per Standard");
}

export function createResponseTimesPerColorChart(chartContainer, data){
  chartHelper.createLinesChart(chartContainer, data, "Response Time Per Color");
}
