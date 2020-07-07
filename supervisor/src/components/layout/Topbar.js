import React from "react";
import icon from "../../img/icon.png";

export default function Topbar() {
  return (
    <header id="topbar">
      <a href="!#" id="menu-btn">
        <i class="fa fa-bars" aria-hidden="true"></i>
      </a>
      <div id="trademark">
        <img id="app-icon" src={icon} alt="Supervisor Icon" />
        <span id="trademark-title">Supervisor</span>
      </div>
      <div id="action-bar">
        <input id="search-input" type="text" placeholder="Search..."></input>

        <div id="user-button">
          <span>MM</span>
        </div>
      </div>
    </header>
  );
}
