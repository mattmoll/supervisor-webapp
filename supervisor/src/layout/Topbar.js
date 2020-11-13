import React from "react";

import icon from "../assets/icon.png";
import UserPanel from "../settings/UserPanel";
import useVisible from "../hooks/useVisible";

export default function Topbar({toggleSidebar}) {
  const { ref, isVisible, setIsVisible } = useVisible(false);

  const onToggleUserPanelClicked = () => {
    // Clicking on the button with the popup opened doesn't close it
    // because the ref from the hook executes first, changes it to false
    // then this changes it back to true x_x.
    setIsVisible(!isVisible);
  };

  return (
    <header id="topbar">
      <a href="!#" id="menu-btn" onClick={toggleSidebar}>
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
      {isVisible && <div ref={ref}> <UserPanel></UserPanel> </div>}
    </header>
  );
}
