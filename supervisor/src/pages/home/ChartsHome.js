import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import * as chartHelper from "../../utils/ChartsHelper";
import * as themeHelper from "../../utils/ThemeHelper";

export function initializeChartsLibrary(){
  themeHelper.initializeTheme();
}

export function createServicesChart(chartContainer, data){
  let series = [{code:"activos", title:"Activos"},
                {code:"demorados", title:"Demorados"},
                {code:"apoyos", title:"Apoyos"},
                {code:"atencionesMultiples", title:"At. Multiples"}, ]
  chartHelper.createStandardBarChart(chartContainer, data, "Servicios", series)
}


export function createMobilesChart(chartContainer, data){
  let series = [{code:"activos", title:"Activos"},
                {code:"inactivos", title:"Inactivos"},]
  chartHelper.createStackedBarChart(chartContainer, data, "Recursos", series)
}


export function createEmployeesServicesChart(chartContainer, data){
  if(data == null) return;
  let chart = am4core.create(chartContainer, am4charts.XYChart);
  chartHelper.addTitle("Servicios Operadores", chart);
  chart.colors.list = [
    am4core.color("#67DC75"),
    am4core.color("#DC6967"),
    am4core.color("#67DCC5"),
    am4core.color("#DC8C67"),
  ]
  chartHelper.addLegend(chart);
  chart.data = data;

  // Create axes
  var categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
  categoryAxis.dataFields.category = "type";
  categoryAxis.renderer.grid.template.location = 0;

  var valueAxis = chart.xAxes.push(new am4charts.ValueAxis());
  valueAxis.min = 0;
  
  // Create series
  function createSeries(field, name) {
    // Set up series
    var series = chart.series.push(new am4charts.ColumnSeries());
    series.name = name;
    series.dataFields.valueX = field;
    series.dataFields.categoryY = "type";
    series.sequencedInterpolation = true;
    
    // Make it stacked
    series.stacked = true;
    
    // Configure columns
    series.columns.template.width = am4core.percent(60);
    chartHelper.addStandardTooltip(series);
    
    // Add label
    var labelBullet = series.bullets.push(new am4charts.LabelBullet());
    labelBullet.label.text = "{valueY}";
    labelBullet.locationY = 0.5;
    labelBullet.label.hideOversized = true;
    
    return series;
  }

  createSeries("tomados", "Tomados");
  createSeries("cancelados", "Cancelados");
  createSeries("enCurso", "En Curso");
  createSeries("cerrados", "Cerrados");

  return chart;
}


export function createEmployeesServicesAveragesChart(chartContainer, data){
  if(data == null) return;
  let chart = am4core.create(chartContainer, am4charts.XYChart);
  chartHelper.addTitle("Tiempos Operadores", chart);
  chartHelper.addLegend(chart);
  chart.colors.list = [
    am4core.color("#67B7DC"),
    am4core.color("#67B7DC"),
    am4core.color("#DCD267"),
    am4core.color("#DCD267"),
  ]

  // Add category field and pass data.
  data["category"] = "Tiempos Servicios";
  chart.data = [data]; 

  var xAxis = chart.xAxes.push(new am4charts.CategoryAxis());
  xAxis.dataFields.category = "category";
  xAxis.renderer.cellStartLocation = 0.1;
  xAxis.renderer.cellEndLocation = 0.9;
  xAxis.renderer.grid.template.location = 0;

  var yAxis = chart.yAxes.push(new am4charts.ValueAxis());
  yAxis.min = 0;

  function createSeries(value, name) {
    var series = chart.series.push(new am4charts.ColumnSeries());
    series.dataFields.valueY = value;
    series.dataFields.categoryX = "category";
    series.name = name;
    chartHelper.addStandardTooltip(series);

    var bullet = series.bullets.push(new am4charts.LabelBullet());
    bullet.interactionsEnabled = false;
    bullet.dy = 30;
    bullet.label.text = "{valueY}";

    return series;
  }
  createSeries("recepPromedioColoring", "Prom Coloring");
  createSeries("recepPromedioAsignacion", "Prom Recep");
  createSeries("despRedespachos", "Redespachos");
  createSeries("despPromedioAsignacion", "Prom Asign %");

  return chart;
}

