import React from "react";

export default function Sidebar() {
  return (
    <sidebar>
      <nav id="navbar">
        <header>
          <h2 id="nav-title">Navegación</h2>
        </header>

        <a href="/" class="nav-link">
          <i class="fas fa-home"></i> <span class="nav-text"> Home</span>
        </a>
        <a href="/moviles" class="nav-link">
          <i class="fas fa-ambulance"></i> <span class="nav-text">Móviles</span>
        </a>
        <a href="!#" class="nav-link">
          <i class="fas fa-archive"></i> <span class="nav-text">Historico</span>
        </a>
        <a href="!#" class="nav-link">
          <i class="fas fa-users"></i> <span class="nav-text">Operadores</span>
        </a>
        <a href="!#" class="nav-link">
          <i class="fas fa-sign-out-alt"></i>{" "}
          <span class="nav-text">Log Out</span>
        </a>
        <a href="!#" id="expand-link" class="nav-link not-display">
          <i class="fas fa-expand"></i>
        </a>
        <div id="container-nav-buttons">
          <a href="!#" id="compress-button" class="nav-button">
            <i class="fas fa-compress fa-2x"></i>{" "}
          </a>
        </div>
      </nav>
    </sidebar>
  );
}
