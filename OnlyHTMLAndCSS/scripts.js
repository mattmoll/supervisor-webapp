// Events
document
  .getElementById("compress-button")
  .addEventListener("click", compressSidebar);
document.getElementById("expand-link").addEventListener("click", expandSidebar);
document.getElementById("menu-btn").addEventListener("click", toggleSidebar);

var media = window.matchMedia("(max-width: 980px)");

media.addEventListener("change", (e) => {
  if (e.matches) {
    /* the viewport is 980 pixels wide or less */
    compressSidebar();
  } else {
    /* the viewport is more than than 980 pixels wide */
    expandSidebar();
  }
});

// Functions
function compressSidebar() {
  var navTitle = document.getElementById("nav-title");
  navTitle.classList.add("not-display");

  var navTexts = document.getElementsByClassName("nav-text");
  navTexts.forEach((item) => item.classList.add("not-display"));

  var navButtons = document.getElementsByClassName("nav-button");
  navButtons.forEach((item) => item.classList.add("not-display"));

  var expLink = document.getElementById("expand-link");
  expLink.classList.remove("not-display");

  var sidebar = document.getElementsByTagName("Sidebar")[0];
  sidebar.classList.add("small-sidebar");
}

function expandSidebar() {
  var navTitle = document.getElementById("nav-title");
  navTitle.classList.remove("not-display");

  var navTexts = document.getElementsByClassName("nav-text");
  navTexts.forEach((item) => item.classList.remove("not-display"));

  var navButtons = document.getElementsByClassName("nav-button");
  navButtons.forEach((item) => item.classList.remove("not-display"));

  var expLink = document.getElementById("expand-link");
  expLink.classList.add("not-display");

  var sidebar = document.getElementsByTagName("Sidebar")[0];
  sidebar.classList.remove("small-sidebar");
}

function toggleSidebar() {
  var sidebar = document.getElementsByTagName("Sidebar")[0];
  if (sidebar.classList.contains("small-sidebar")) {
    expandSidebar();
  } else {
    compressSidebar();
  }
}

//
// -------------------------------------------------------------
// You can ignore this JS. Is only for demo of the chart usage.
// -------------------------------------------------------------
//

am4core.ready(function () {
  // Themes begin
  am4core.useTheme(am4themes_animated);
  // Themes end

  // Create chart instance
  var chartpie = am4core.create("chartpiediv", am4charts.PieChart);

  // Add and configure Series
  var pieSeries = chartpie.series.push(new am4charts.PieSeries());
  pieSeries.dataFields.value = "litres";
  pieSeries.dataFields.category = "country";

  // Let's cut a hole in our Pie chart the size of 30% the radius
  chartpie.innerRadius = am4core.percent(30);

  // Put a thick white border around each Slice
  pieSeries.slices.template.stroke = am4core.color("#fff");
  pieSeries.slices.template.strokeWidth = 2;
  pieSeries.slices.template.strokeOpacity = 1;
  // change the cursor on hover to make it apparent the object can be interacted with
  pieSeries.slices.template.cursorOverStyle = [
    {
      property: "cursor",
      value: "pointer",
    },
  ];

  pieSeries.alignLabels = false;
  pieSeries.labels.template.bent = true;
  pieSeries.labels.template.radius = 3;
  pieSeries.labels.template.padding(0, 0, 0, 0);

  pieSeries.ticks.template.disabled = true;

  // Create a base filter effect (as if it's not there) for the hover to return to
  var shadow = pieSeries.slices.template.filters.push(
    new am4core.DropShadowFilter()
  );
  shadow.opacity = 0;

  // Create hover state
  var hoverState = pieSeries.slices.template.states.getKey("hover"); // normally we have to create the hover state, in this case it already exists

  // Slightly shift the shadow and make it more prominent on hover
  var hoverShadow = hoverState.filters.push(new am4core.DropShadowFilter());
  hoverShadow.opacity = 0.7;
  hoverShadow.blur = 5;

  // Add a legend
  chartpie.legend = new am4charts.Legend();

  chartpie.data = [
    {
      country: "Lithuania",
      litres: 501.9,
    },
    {
      country: "Germany",
      litres: 165.8,
    },
    {
      country: "Australia",
      litres: 139.9,
    },
    {
      country: "Austria",
      litres: 128.3,
    },
    {
      country: "UK",
      litres: 99,
    },
    {
      country: "Belgium",
      litres: 60,
    },
  ];

  var chart = am4core.create("chartdiv", am4charts.XYChart);
  chart.colors.step = 8;

  chart.legend = new am4charts.Legend();
  chart.legend.position = "top";
  chart.legend.paddingBottom = 20;
  chart.legend.labels.template.maxWidth = 95;

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

    series.events.on("hidden", arrangeColumns);
    series.events.on("shown", arrangeColumns);

    var bullet = series.bullets.push(new am4charts.LabelBullet());
    bullet.interactionsEnabled = false;
    bullet.dy = 30;
    bullet.label.text = "{valueY}";
    bullet.label.fill = am4core.color("#ffffff");

    return series;
  }

  chart.data = [
    {
      category: "Place #1",
      first: 40,
      second: 55,
      third: 60,
    },
    {
      category: "Place #2",
      first: 30,
      second: 78,
      third: 69,
    },
    {
      category: "Place #3",
      first: 27,
      second: 40,
      third: 45,
    },
    {
      category: "Place #4",
      first: 50,
      second: 33,
      third: 22,
    },
  ];

  createSeries("first", "The Thirst");
  createSeries("second", "The Second");
  createSeries("third", "The Third");

  function arrangeColumns() {
    var series = chart.series.getIndex(0);

    var w =
      1 -
      xAxis.renderer.cellStartLocation -
      (1 - xAxis.renderer.cellEndLocation);
    if (series.dataItems.length > 1) {
      var x0 = xAxis.getX(series.dataItems.getIndex(0), "categoryX");
      var x1 = xAxis.getX(series.dataItems.getIndex(1), "categoryX");
      var delta = ((x1 - x0) / chart.series.length) * w;
      if (am4core.isNumber(delta)) {
        var middle = chart.series.length / 2;

        var newIndex = 0;
        chart.series.each(function (series) {
          if (!series.isHidden && !series.isHiding) {
            series.dummyData = newIndex;
            newIndex++;
          } else {
            series.dummyData = chart.series.indexOf(series);
          }
        });
        var visibleCount = newIndex;
        var newMiddle = visibleCount / 2;

        chart.series.each(function (series) {
          var trueIndex = chart.series.indexOf(series);
          var newIndex = series.dummyData;

          var dx = (newIndex - trueIndex + middle - newMiddle) * delta;

          series.animate(
            { property: "dx", to: dx },
            series.interpolationDuration,
            series.interpolationEasing
          );
          series.bulletsContainer.animate(
            { property: "dx", to: dx },
            series.interpolationDuration,
            series.interpolationEasing
          );
        });
      }
    }
  }
}); // end am4core.ready()
