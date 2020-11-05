import React from "react";

export default function Sidebar({compressedSidebar}) {
  const [selectedMenu, setSelectedMenu] = React.useState("");

  let media = window.matchMedia("(max-width: 980px)");
  media.addEventListener("change", (e) => {
    /* the viewport is 980px wide or less (match media above), else it is more than 980px wide*/
    if (e.matches) compressSidebar();
    else expandSidebar();
  });
  
  React.useEffect(() => {
    if (compressedSidebar) compressSidebar();
    else expandSidebar();
  }, [compressedSidebar]);

  const onCompressClicked = (e) => {
    e.preventDefault();
    compressSidebar();
  };

  const onExpandClicked = (e) => {
    e.preventDefault();
    expandSidebar();
  };

  const compressSidebar = () => {
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

  const expandSidebar = () => {
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

  const activeIfSelected = (menuName) =>{
    return (selectedMenu === menuName) ? "active" : ""; 
  }

  return (
    <div id="sidebar">
      <nav id="navbar">
        <header>
          <h2 id="nav-title">Navegación</h2>
        </header>

        <a href="/" className={"nav-link " + activeIfSelected("Inicio")} >
          <i className="fas fa-home"></i>{" "}<span className="nav-text"> Inicio</span>
        </a>
        <a href="/clientes" className={"nav-link " + activeIfSelected("Clientes")} >
          <i className="fas fa-briefcase"></i>{" "}<span className="nav-text">Clientes</span>
        </a>
        <a href="/servicios" className={"nav-link " + activeIfSelected("Servicios")} >
          <i className="fas fa-laptop-medical"></i>{" "}<span className="nav-text">Servicios</span>
        </a>
        <a href="/moviles" className={"nav-link " + activeIfSelected("Moviles")} >
          <i className="fas fa-ambulance"></i>{" "}<span className="nav-text">Operativos</span>
        </a>
        <a href="!#" className="nav-link"><i className="fas fa-sign-out-alt"></i>{" "}<span className="nav-text">Cerrar Sesión</span></a>
        <a
          href="!#"
          id="expand-link"
          className="nav-link not-display"
          onClick={onExpandClicked}
        >
          <i className="fas fa-expand"></i>
        </a>
        <div id="container-nav-buttons">
          <a
            href="!#"
            id="compress-button"
            className="nav-button"
            onClick={onCompressClicked}
          >
            <i className="fas fa-compress fa-2x"></i>
          </a>
        </div>
      </nav>
    </div>
  );

}
