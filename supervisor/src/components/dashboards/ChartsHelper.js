import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import { addSyntheticLeadingComment } from "typescript";

export function createServicesChart(chartContainer, data){
  let chart = am4core.create(chartContainer, am4charts.XYChart);
  addTitle("Servicios", chart);
  chart.colors.list = [
    am4core.color("#67DC75"),
    am4core.color("#DC6967"),
    am4core.color("#DC8C67"),
    am4core.color("#DCD267"),
  ]
  addLegend(chart);

  // Add category field and pass data.
  data["category"] = "Servicios";
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

    var bullet = series.bullets.push(new am4charts.LabelBullet());
    bullet.interactionsEnabled = false;
    bullet.dy = 30;
    bullet.label.text = "{valueY}";

    return series;
  }
  createSeries("activos", "Activos");
  createSeries("demorados", "Demorados");
  createSeries("apoyos", "Apoyos");
  createSeries("atencionesMultiples", "At. Multiples");

  return chart;
}


export function createMobilesChart(chartContainer, data){
  let chart = am4core.create(chartContainer, am4charts.XYChart);
  addTitle("Recursos", chart);
  chart.colors.list = [
    am4core.color("#67DC75"),
    am4core.color("#DC6967"),
  ]
  addLegend(chart);
  chart.data = data;

  // Create axes
  var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
  categoryAxis.dataFields.category = "type";
  categoryAxis.renderer.grid.template.location = 0;

  var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
  valueAxis.min = 0;

  // Create series
  function createSeries(field, name) {
    // Set up series
    var series = chart.series.push(new am4charts.ColumnSeries());
    series.name = name;
    series.dataFields.valueY = field;
    series.dataFields.categoryX = "type";
    series.sequencedInterpolation = true;
    
    // Make it stacked
    series.stacked = true;
    
    // Configure columns
    series.columns.template.width = am4core.percent(60);
    series.columns.template.tooltipText = "[bold]{name}[/]\n[font-size:14px]{categoryX}: {valueY}";
    
    // Add label
    var labelBullet = series.bullets.push(new am4charts.LabelBullet());
    labelBullet.label.text = "{valueY}";
    labelBullet.locationY = 0.5;
    labelBullet.label.hideOversized = true;
    
    return series;
  }

  createSeries("activos", "Activos");
  createSeries("inactivos", "Inactivos");

  return chart;
}



export function createEmployeesServicesChart(chartContainer, data){
  let chart = am4core.create(chartContainer, am4charts.XYChart);
  addTitle("Servicios Operadores", chart);
  chart.colors.list = [
    am4core.color("#67DC75"),
    am4core.color("#DC6967"),
  ]
  addLegend(chart);
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
    series.columns.template.tooltipText = "[bold]{name}[/]\n[font-size:14px]{categoryY}: {valueX}";
    
    // Add label
    var labelBullet = series.bullets.push(new am4charts.LabelBullet());
    labelBullet.label.text = "{valueY}";
    labelBullet.locationY = 0.5;
    labelBullet.label.hideOversized = true;
    
    return series;
  }

  createSeries("tomados", "Tomados");
  createSeries("cancelados", "Cancelados");

  return chart;
}


export function createEmployeesServicesAveragesChart(chartContainer, data){
  let chart = am4core.create(chartContainer, am4charts.XYChart);
  addTitle("Tiempos Operadores", chart);
  addLegend(chart);
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

    var bullet = series.bullets.push(new am4charts.LabelBullet());
    bullet.interactionsEnabled = false;
    bullet.dy = 30;
    bullet.label.text = "{valueY}";

    return series;
  }
  createSeries("recepPromedioColoring", "Prom Coloring");
  createSeries("recepPromedioAsignacion", "Prom Recep");
  createSeries("despRedespachos", "Redespachos");
  createSeries("despPromedioAsignacion", "Prom Asign");

  return chart;
}



// Internal support methods

function addLegend(chart){
  let legend = new am4charts.Legend();
  legend.position = "top";
  legend.paddingBottom = 20;
  legend.labels.template.maxWidth = 95;
  chart.legend = legend;
}

function addTitle(titleText, chart){
  let title = chart.titles.create();
  title.text = titleText;
  title.fontSize = 25;
  title.fontWeight = 700;
  title.marginBottom = 10;
  chart.titles.push(title);
}