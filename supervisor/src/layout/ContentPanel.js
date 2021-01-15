import React from 'react'
import {AppContext} from "../AppContext";

export default function ContentPanel({isVerticalPanel=false, ...props}) {
  const {isDarkThemeEnabled} = React.useContext(AppContext);
  return (
    <div className={`panel content 
                     ${isDarkThemeEnabled ? "dark-theme" : ""}
                     ${isVerticalPanel ? "vertical-content" : "" }
                     `}>
      {props.children}
    </div>
  )
}
