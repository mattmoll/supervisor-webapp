import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import * as chartHelper from "./ChartsHelper";

export function createServicesChart(chartContainer, data){
  let series = [{code:"activos", title:"Actives"},
                {code:"demorados", title:"Delayed"},
                {code:"apoyos", title:"Backing"},
                {code:"atencionesMultiples", title:"Multiples"}, ]
  chartHelper.createStandardBarChart(chartContainer, data, "Services", series)
}


export function createMobilesChart(chartContainer, data){
  let series = [{code:"activos", title:"Actives"},
                {code:"inactivos", title:"Inactives"},]
  chartHelper.createStackedBarChart(chartContainer, data, "Resources", series)
}


export function createEmployeesServicesChart(chartContainer, data){
  let chart = am4core.create(chartContainer, am4charts.XYChart);
  chartHelper.addTitle("Services per Operators", chart);
  chart.colors.list = [
    am4core.color("#67DC75"),
    am4core.color("#DC6967"),
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

  createSeries("tomados", "Accepted");
  createSeries("cancelados", "Cancelled");

  return chart;
}


export function createEmployeesServicesAveragesChart(chartContainer, data){
  let chart = am4core.create(chartContainer, am4charts.XYChart);
  chartHelper.addTitle("Service Lenghts", chart);
  chartHelper.addLegend(chart);
  chart.colors.list = [
    am4core.color("#67B7DC"),
    am4core.color("#67B7DC"),
    am4core.color("#DCD267"),
    am4core.color("#DCD267"),
  ]

  // Add category field and pass data.
  data["category"] = "Time Lenghts per Operators";
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
  createSeries("recepPromedioColoring", "Avg. Coloring");
  createSeries("recepPromedioAsignacion", "Avg. Receivers");
  createSeries("despRedespachos", "ReDispatches");
  createSeries("despPromedioAsignacion", "Avg. Asign");

  return chart;
}

