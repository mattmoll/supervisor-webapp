import React from 'react'
import {AppContext} from "../AppContext";

export default function ContentPanel({...props}) {
  const {isDarkThemeEnabled} = React.useContext(AppContext);
  return (
    <div className={`panel content ${isDarkThemeEnabled ? "dark-theme" : ""}`}>
      {props.children}
    </div>
  )
}
