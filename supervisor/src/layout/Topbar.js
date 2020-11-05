import React from "react";
import icon from "../img/icon.png";
import UserPanel from "../settings/UserPanel";

export default function Topbar({onToggleSidebarClicked}) {
  const [panelVisible, setPanelVisible] = React.useState(false);

  const onToggleUserPanelClicked = () => {
    setPanelVisible(!panelVisible);
  };

  return (
    <header id="topbar">
      <a href="!#" id="menu-btn" onClick={onToggleSidebarClicked}>
        <i className="fa fa-bars" aria-hidden="true"></i>
      </a>
      <div id="trademark">
        <img id="app-icon" src={icon} alt="Supervisor Icon" />
        <span id="trademark-title">Supervisor</span>
      </div>
      <div id="action-bar">

        <div id="user-button" onClick={onToggleUserPanelClicked}>
          <span>MM</span>
        </div>
      </div>
      {panelVisible ? <UserPanel toggleVisibility={onToggleUserPanelClicked}></UserPanel> : null}
    </header>
  );
}
