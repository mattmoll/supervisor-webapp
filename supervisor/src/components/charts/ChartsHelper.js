import * as am4charts from "@amcharts/amcharts4/charts";
import * as am4core from "@amcharts/amcharts4/core";

export function createStandardBarChart(chartContainer, data, titleText, series){
  let chart = am4core.create(chartContainer, am4charts.XYChart);
  addTitle(titleText, chart);
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