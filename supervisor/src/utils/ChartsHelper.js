import * as am4charts from "@amcharts/amcharts4/charts";
import * as am4core from "@amcharts/amcharts4/core";


export function createStandardBarChart(chartContainer, data, titleText, series){
  if(data == null) return;
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
  if(data == null) return;
  let chart = am4core.create(chartContainer, am4charts.XYChart);
  addTitle(title, chart);
  chart.colors.list = [
    am4core.color("#67DC75"),
    am4core.color("#DC6967"),
    am4core.color("#67DCC5"),
    am4core.color("#DC8C67"),
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


export function createLinesChart(chartContainer, data, titleText){
  if(data == null) return;

  let chart = am4core.create(chartContainer, am4charts.XYChart);
  
  addTitle(titleText, chart);
  chart.colors.list = [
    am4core.color("#67DC75"),
    am4core.color("#DC6967"),
    am4core.color("#67DCC5"),
    am4core.color("#DC8C67"),
  ]
  addLegend(chart);

  // Create axes
  var dateAxis = chart.xAxes.push(new am4charts.CategoryAxis());
  dateAxis.dataFields.category = "date";
  dateAxis.renderer.minGridDistance = 50;
  dateAxis.renderer.grid.template.location = 0.5;
  dateAxis.startLocation = 0.5;
  dateAxis.endLocation = 0.5;

  const quantity = data[0].cantidadPorHora.length;
  let dates = [];
  
  for(let i = 0 ; i < quantity; i++){
    let dateToAdd = new Date();
    dateToAdd.setHours(dateToAdd.getHours() - i);
    dates.push(dateToAdd.getHours());
    
    dateAxis.data.unshift({
      date: dates[i]
    })
    
  }

  // Create value axis
  chart.yAxes.push(new am4charts.ValueAxis());

  let showTooltip = data.length < 5;


  function createSeries(name, dates, cantidadPorHora, dateAxis) {
    var series = chart.series.push(new am4charts.LineSeries());
    series.dataFields.valueY = "value";
    series.dataFields.categoryX = "date";
    series.name = name;
    if(showTooltip){
      series.tooltipText = "{valueY}";
      series.tooltip.pointerOrientation = "vertical";
      series.tooltip.background.cornerRadius = 10;
      series.tooltip.background.fillOpacity = 0.5;
      series.tooltip.label.padding(5,5,5,5)
    }

    series.strokeWidth = 2;
    series.tensionX = 0.8;
    let data = [];
    for(let i = 0; i <= cantidadPorHora.length; i++){
      data.push({
        "date": dates[i],
        "value": cantidadPorHora[i]
      })
    }

    // Add scrollbar
    chart.scrollbarX = new am4charts.XYChartScrollbar();
    chart.scrollbarX.series.push(series);

    // Add cursor
    chart.cursor = new am4charts.XYCursor();
    chart.cursor.xAxis = dateAxis;

    series.data = data;
  }

  data.forEach(serviciosPorEstado => createSeries(serviciosPorEstado.color, dates, serviciosPorEstado.cantidadPorHora, dateAxis));
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

  const quantity = data.serviciosPorEstado.length;
  let dates = [];
  for(let i = 0 ; i <= quantity; i++){
    let dateToAdd = new Date();
    dateToAdd.setHours(dateToAdd.getHours() - i);
    dates.push(dateToAdd);
  }
  var dateAxis = chart.xAxes.push(new am4charts.DateAxis());
  dateAxis.renderer.minGridDistance = 50;

  var yAxis = chart.yAxes.push(new am4charts.ValueAxis());
  yAxis.min = 0;

  // Add scrollbar
  chart.scrollbarX = new am4charts.XYChartScrollbar();
  chart.scrollbarX.series.push(series);

  function createSeries(dates, cantidadPorHora) {
    var series = chart.series.push(new am4charts.LineSeries());
    series.dataFields.valueY = "cantidadPorHora";
    series.dataFields.dateX = "date";
    series.strokeWidth = 2;
    series.minBulletDistance = 10;

    for(let i = 0 ; i < quantity; i++){
      series.data.push({
        date: dates[i],
        "cantidadPorHora": cantidadPorHora[i]
      })
    }

    return series;
  }

  data.serviciosPorEstado.forEach(serviciosPorEstado => createSeries(dates, serviciosPorEstado.cantidadPorHora));

  return chart;
}


export function createGanttChart(chartContainer, data, titleText, series){
  var chart = am4core.create(chartContainer, am4charts.XYChart);
  addTitle(titleText, chart);
  chart.hiddenState.properties.opacity = 0; // this creates initial fade-in

  chart.paddingRight = 30;
  chart.dateFormatter.inputDateFormat = "yyyy-MM-dd HH:mm";

  var colorSet = new am4core.ColorSet();
  colorSet.saturation = 0.4;

  chart.data = [
    {
      movil: "UTIM 1",
      fromDate: "2021-01-01 08:00",
      toDate: "2021-01-01 10:00",
      color: "#FFC"
    },
    {
      movil: "UTIM 1",
      fromDate: "2021-01-01 10:00",
      toDate: "2021-01-01 12:00",
      color: "#FFD"
    },
    {
      movil: "UTIM 1",
      fromDate: "2021-01-01 18:00",
      toDate: "2021-01-01 20:00",
      color: "#DDD"
    },
    {
      movil: "Movil 4",
      fromDate: "2021-01-01 12:00",
      toDate: "2021-01-01 15:00",
      color: colorSet.getIndex(0).brighten(0.4)
    },
    {
      movil: "Movil 2",
      fromDate: "2021-01-01 15:30",
      toDate: "2021-01-01 21:30",
      color: colorSet.getIndex(0).brighten(0.8)
    },

    {
      movil: "UTIM 3",
      fromDate: "2021-01-01 09:00",
      toDate: "2021-01-01 12:00",
      color: colorSet.getIndex(2).brighten(0)
    },
    {
      movil: "UTIM Sprint",
      fromDate: "2021-01-01 13:00",
      toDate: "2021-01-01 17:00",
      color: colorSet.getIndex(2).brighten(0.4)
    },

    {
      movil: "Movil VW",
      fromDate: "2021-01-01 11:00",
      toDate: "2021-01-01 16:00",
      color: colorSet.getIndex(4).brighten(0)
    },
    {
      movil: "Ambulancia",
      fromDate: "2021-01-01 16:00",
      toDate: "2021-01-01 19:00",
      color: colorSet.getIndex(4).brighten(0.4)
    },

    {
      movil: "Ambulancia 4",
      fromDate: "2021-01-01 16:00",
      toDate: "2021-01-01 20:00",
      color: colorSet.getIndex(6).brighten(0)
    },
    {
      movil: "UTIM 10",
      fromDate: "2021-01-01 20:30",
      toDate: "2021-01-01 24:00",
      color: colorSet.getIndex(6).brighten(0.4)
    },

    {
      movil: "UTIM 8",
      fromDate: "2021-01-01 13:00",
      toDate: "2021-01-01 24:00",
      color: colorSet.getIndex(8).brighten(0)
    },
    {
      movil: "Ambulancia 7",
      fromDate: "2021-01-01 16:00",
      toDate: "2021-01-01 20:00",
      color: colorSet.getIndex(6).brighten(0)
    },
    {
      movil: "UTIM 12",
      fromDate: "2021-01-01 20:30",
      toDate: "2021-01-01 24:00",
      color: colorSet.getIndex(6).brighten(0.4)
    },

    {
      movil: "UTIM 22",
      fromDate: "2021-01-01 13:00",
      toDate: "2021-01-01 24:00",
      color: colorSet.getIndex(8).brighten(0)
    }
  ];

  var categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
  categoryAxis.dataFields.category = "movil";
  categoryAxis.renderer.grid.template.location = 0;
  categoryAxis.renderer.inversed = true;

  var dateAxis = chart.xAxes.push(new am4charts.DateAxis());
  dateAxis.dateFormatter.dateFormat = "yyyy-MM-dd HH:mm";
  dateAxis.renderer.minGridDistance = 70;
  dateAxis.baseInterval = { count: 30, timeUnit: "minute" };
  dateAxis.max = new Date(2021, 0, 1, 24, 0, 0, 0).getTime();
  dateAxis.strictMinMax = true;
  dateAxis.renderer.tooltipLocation = 0;

  var series1 = chart.series.push(new am4charts.ColumnSeries());
  series1.columns.template.width = am4core.percent(80);
  series1.columns.template.tooltipText = "{movil}: {openDateX} - {dateX}";

  series1.dataFields.openDateX = "fromDate";
  series1.dataFields.dateX = "toDate";
  series1.dataFields.categoryY = "movil";
  series1.columns.template.propertyFields.fill = "color"; // get color from data
  series1.columns.template.propertyFields.stroke = "color";
  series1.columns.template.strokeOpacity = 1;

  chart.scrollbarX = new am4core.Scrollbar();
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

