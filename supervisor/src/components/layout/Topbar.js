import React, { Component } from "react";
import icon from "../../img/icon.png";
import UserPanel from "./UserPanel";

export default class Topbar extends Component {
  state = {
    panelVisible: false,
  };

  onShowUserPanelClicked = () => {
    this.setState({ panelVisible: !this.state.panelVisible });
  };
  render() {
    return (
      <header id="topbar">
        <a href="!#" id="menu-btn" onClick={this.props.onToggleSidebarClicked}>
          <i className="fa fa-bars" aria-hidden="true"></i>
        </a>
        <div id="trademark">
          <img id="app-icon" src={icon} alt="Supervisor Icon" />
          <span id="trademark-title">Supervisor</span>
        </div>
        <div id="action-bar">

          <div id="user-button" onClick={this.onShowUserPanelClicked}>
            <span>MM</span>
          </div>
        </div>
        {this.state.panelVisible ? <UserPanel></UserPanel> : null}
      </header>
    );
  }
}
