import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import am4themes_dark from "@amcharts/amcharts4/themes/dark";
import * as am4core from "@amcharts/amcharts4/core";

export function darkMode(){
  am4core.useTheme(am4themes_dark);
}

export function lightMode(){
  am4core.unuseTheme(am4themes_dark);
}

export function initializeTheme(){
  am4core.useTheme(am4themes_animated);
  let isDarkThemeEnabled = window.localStorage.getItem("Supervisor-IsDarkThemeEnabled");
  if(isDarkThemeEnabled){
    darkMode();
  }else{
    lightMode();
  }
}

export function updateVisualTheme(isDarkThemeEnabled){
  if(isDarkThemeEnabled){
    darkMode();
  } else {
    lightMode();
  }
}