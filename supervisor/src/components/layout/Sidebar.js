import React, { Component } from "react";

class Sidebar extends Component {
  constructor(props) {
    super(props);
    var media = window.matchMedia("(max-width: 980px)");
    media.addEventListener("change", (e) => {
      if (e.matches) {
        /* the viewport is 980 pixels wide or less (match media above)*/
        this.compressSidebar();
      } else {
        /* the viewport is more than than 980 pixels wide */
        this.expandSidebar();
      }
    });
  }

  componentDidUpdate() {
    if (this.props.compressedSidebar) {
      this.compressSidebar();
    } else {
      this.expandSidebar();
    }
  }

  onCompressClicked = (e) => {
    e.preventDefault();
    this.compressSidebar();
  };

  onExpandClicked = (e) => {
    e.preventDefault();
    this.expandSidebar();
  };

  compressSidebar = () => {
    var navTitle = document.getElementById("nav-title");
    navTitle.classList.add("not-display");

    var navTexts = document.getElementsByClassName("nav-text");
    for (const navText of navTexts) {
      navText.classList.add("not-display");
    }

    var navButtons = document.getElementsByClassName("nav-button");
    for (const navButton of navButtons) {
      navButton.classList.add("not-display");
    }

    var expLink = document.getElementById("expand-link");
    expLink.classList.remove("not-display");

    var sidebar = document.getElementById("sidebar");
    sidebar.classList.add("small-sidebar");
  };

  expandSidebar = () => {
    var navTitle = document.getElementById("nav-title");
    navTitle.classList.remove("not-display");

    var navTexts = document.getElementsByClassName("nav-text");
    for (const navText of navTexts) {
      navText.classList.remove("not-display");
    }

    var navButtons = document.getElementsByClassName("nav-button");
    for (const navButton of navButtons) {
      navButton.classList.remove("not-display");
    }

    var expLink = document.getElementById("expand-link");
    expLink.classList.add("not-display");

    var sidebar = document.getElementById("sidebar");
    sidebar.classList.remove("small-sidebar");
  };

  render() {
    return (
      <div id="sidebar">
        <nav id="navbar">
          <header>
            <h2 id="nav-title">Navegación</h2>
          </header>

          <a href="/" className="nav-link"><i className="fas fa-home"></i>{" "}<span className="nav-text"> Home</span></a>
          <a href="/clientes" className="nav-link"><i className="fas fa-briefcase"></i>{" "}<span className="nav-text">Clientes</span></a>
          {/* Otras opciones para icono clientes, no me convencio del todo el acutal:  fas fa-user-tie      fas fa-building */}
          <a href="/servicios" className="nav-link"><i className="fas fa-notes-medical"></i>{" "}<span className="nav-text">Servicios</span></a>
          <a href="/moviles" className="nav-link"><i className="fas fa-ambulance"></i>{" "}<span className="nav-text">Móviles</span></a>
          <a href="/operadores" className="nav-link"><i className="fas fa-users"></i>{" "}<span className="nav-text">Operadores</span></a>
          <a href="!#" className="nav-link"><i className="fas fa-sign-out-alt"></i>{" "}<span className="nav-text">Log Out</span></a>
          <a
            href="!#"
            id="expand-link"
            className="nav-link not-display"
            onClick={this.onExpandClicked}
          >
            <i className="fas fa-expand"></i>
          </a>
          <div id="container-nav-buttons">
            <a
              href="!#"
              id="compress-button"
              className="nav-button"
              onClick={this.onCompressClicked}
            >
              <i className="fas fa-compress fa-2x"></i>
            </a>
          </div>
        </nav>
      </div>
    );
  }
}

export default Sidebar;
