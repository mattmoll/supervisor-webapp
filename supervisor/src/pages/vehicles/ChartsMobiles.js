import * as chartHelper from "../../utils/ChartsHelper";

export function createServicesPerMobile(chartContainer, data){
  chartHelper.createLinesChart(chartContainer, data, "Servicios por Móvil");
}

export function createServicesPerVendor(chartContainer, data){
  chartHelper.createLinesChart(chartContainer, data, "Servicios por Móvil");
}

