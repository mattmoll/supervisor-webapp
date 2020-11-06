import React from "react";

export default function Sidebar({isSidebarCompressed, toggleSidebar}) {
  const [selectedMenu, setSelectedMenu] = React.useState(() => window.localStorage.getItem('Supervisor-SelectedMenu') || "")

  React.useEffect(() =>{
      window.localStorage.setItem('Supervisor-SelectedMenu', selectedMenu)
    },
    [selectedMenu]
  );

  let media = window.matchMedia("(max-width: 980px)");
  media.addEventListener("change", (e) => {
    /* The viewport is 980px wide or less (match media above)*/
    toggleSidebar(e);
  });
  
  const selectMenu = (menu) => {
    setSelectedMenu(menu);
  }

  const smallSidebarIfCompressed = () =>{
    return (isSidebarCompressed) ? "small-sidebar" : ""; 
  }

  const activeIfSelected = (menuName) =>{
    return (selectedMenu === menuName) ? "active" : ""; 
  }

  const showTitleIfNotCompressed = (navTitle) => {
    return(
      !isSidebarCompressed && <span className="nav-text"> {navTitle}</span> 
    );
  }

  return (
    <div id="sidebar" className={smallSidebarIfCompressed()}>
      <nav id="navbar">
        <header>
          {!isSidebarCompressed && <h2 id="nav-title">Navegación</h2>}
        </header>

        <a href="/" className={"nav-link " + activeIfSelected("Inicio")} onClick={() => selectMenu("Inicio")}>
          <i className="fas fa-home"></i>{" "}
          {showTitleIfNotCompressed("Inicio")}
        </a>
        <a href="/clientes" className={"nav-link " + activeIfSelected("Clientes")} onClick={() => selectMenu("Clientes")}>
          <i className="fas fa-briefcase"></i>{" "} 
          {showTitleIfNotCompressed("Clientes")}
        </a>
        <a href="/servicios" className={"nav-link " + activeIfSelected("Servicios")} onClick={() => selectMenu("Servicios")}>
          <i className="fas fa-laptop-medical"></i>{" "} 
          {showTitleIfNotCompressed("Servicios")}
        </a>
        <a href="/moviles" className={"nav-link " + activeIfSelected("Moviles")} onClick={() => selectMenu("Moviles")}>
          <i className="fas fa-ambulance"></i>{" "} 
          {showTitleIfNotCompressed("Operativos")}
        </a>
        <a href="!#" className="nav-link">
          <i className="fas fa-sign-out-alt"></i>{" "} 
          {showTitleIfNotCompressed("Cerrar Sesión")}
        </a>
        { isSidebarCompressed ? (
          <a
            href="!#"
            id="expand-link"
            className="nav-link"
            onClick={toggleSidebar}
          >
            <i className="fas fa-expand"></i>
          </a>
        ) : (
          <div id="container-nav-buttons">
            <a
              href="!#"
              id="compress-button"
              className="nav-button"
              onClick={toggleSidebar}
            >
              <i className="fas fa-compress fa-2x"></i>
            </a>
          </div>
        )
        }
      </nav>
    </div>
  );
}
