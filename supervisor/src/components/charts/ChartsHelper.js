import * as am4charts from "@amcharts/amcharts4/charts";
import * as am4core from "@amcharts/amcharts4/core";

export function createStandardBarChart(chartContainer, data, titleText, series){
  let chart = am4core.create(chartContainer, am4charts.XYChart);
  addTitle(titleText, chart);
  chart.colors.list = [
    am4core.color("#67DC75"),
    am4core.color("#DC6967"),
    am4core.color("#67DCC5"),
    am4core.color("#DC8C67"),
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
    addStandardTooltip(series);

    var bullet = series.bullets.push(new am4charts.LabelBullet());
    bullet.interactionsEnabled = false;
    bullet.dy = 30;
    bullet.label.text = "{valueY}";

    return series;
  }

  series.forEach(serie => createSeries(serie.code, serie.title));

  return chart;
}

export function createStackedBarChart(chartContainer, data, title, series){
  let chart = am4core.create(chartContainer, am4charts.XYChart);
  addTitle(title, chart);
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
    addStandardTooltip(series);
    
    // Add label
    var labelBullet = series.bullets.push(new am4charts.LabelBullet());
    labelBullet.label.text = "{valueY}";
    labelBullet.locationY = 0.5;
    labelBullet.label.hideOversized = true;
    
    return series;
  }

  series.forEach(serie => createSeries(serie.code, serie.title));

  return chart;
}

export function createLinesChartWithScrollAndZoom(chartContainer, data, titleText, series){
  let chart = am4core.create(chartContainer, am4charts.XYChart);
  addTitle(titleText, chart);
  chart.colors.list = [
    am4core.color("#67DC75"),
    am4core.color("#DC6967"),
    am4core.color("#67DCC5"),
    am4core.color("#DC8C67"),
  ]
  addLegend(chart);

  let firstDate = new Date();
  let secondDate = new Date(firstDate);
  secondDate.setDate(secondDate.getDate() + 1);
  // Add category field and pass data.
  chart.data = [
    {
      date: firstDate,
      cantidadPorHora: 7
    },
    {
      date: secondDate,
      cantidadPorHora: 10
    },
  ]; 

  var dateAxis = chart.xAxes.push(new am4charts.DateAxis());
  dateAxis.renderer.minGridDistance = 50;

  var yAxis = chart.yAxes.push(new am4charts.ValueAxis());
  yAxis.min = 0;

  // Add scrollbar
  chart.scrollbarX = new am4charts.XYChartScrollbar();
  chart.scrollbarX.series.push(series);

  /*
  // Add cursor
  chart.cursor = new am4charts.XYCursor();
  chart.cursor.xAxis = dateAxis;
  chart.cursor.snapToSeries = series;
  */

  function createSeries(value, name) {
    var series = chart.series.push(new am4charts.LineSeries());
    series.dataFields.valueY = "cantidadPorHora";
    series.dataFields.dateX = "date";
    series.strokeWidth = 2;
    series.minBulletDistance = 10;
    //addStandardTooltip(series);

    return series;
  }

  series.forEach(serie => createSeries(serie.code, serie.title));

  return chart;
}


export function addLegend(chart){
  let legend = new am4charts.Legend();
  legend.position = "top";
  legend.paddingBottom = 20;
  legend.labels.template.maxWidth = 95;
  chart.legend = legend;
}

export function addTitle(titleText, chart){
  let title = chart.titles.create();
  title.text = titleText;
  title.fontSize = 25;
  title.fontWeight = 700;
  title.marginBottom = 10;
  chart.titles.push(title);
}

export function addStandardTooltip(series){
  series.columns.template.tooltipText = "[bold]{name}[/]\n[font-size:14px]{categoryX}: {valueY}";
}