import React, { Component } from "react";

export default class UserPanel extends Component {
  state = {
    username: "Matias",
  };
  render() {
    return (
      <div id="user-panel">
        <h4>Settings</h4>
        <hr />
        <div>
          <div>Username: {this.state.username}</div>
          <div>Theme: Light/Dark</div>
          <div>LogOut</div>
        </div>
      </div>
    );
  }
}
