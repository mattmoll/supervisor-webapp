import React, { Component } from 'react'
import SummaryPanel from "../layout/SummaryPanel";

export default class SummaryHome extends Component {
  render() {
    const {
      servicios,
      moviles,
      operadores,
      estadoGeneral,
    } = this.props.summary;
    return (
      <div id="summary-container">
          <SummaryPanel
            category={{ title: "Services", icon: "fas fa-user-md fa-3x" }}
            items={[
              { key: "In Progress", value: servicios.enCurso },
              { key: "Closed", value: servicios.cerrados },
              { key: "Cancelled", value: servicios.cancelados },
            ]}
          />
          <SummaryPanel
            category={{ title: "Mobiles", icon: "fas fa-ambulance fa-3x" }}
            items={[
              { key: "Actives", value: moviles.activos },
              { key: "Out of Service", value: moviles.fueraServicio },
            ]}
          />
          <SummaryPanel
            category={{ title: "Operators", icon: "fas fa-users fa-3x" }}
            items={[
              { key: "Receivers", value: operadores.receptores },
              { key: "Dispatchers", value: operadores.despachadores },
            ]}
          />
          <SummaryPanel
            category={{ title: "Status", icon: "fas fa-info-circle fa-3x" }}
            items={[
              { key: "GPS", value: estadoGeneral.gps },
              { key: "Interfaces", value: estadoGeneral.interfaces },
              { key: "Recordings", value: estadoGeneral.grabadora },
            ]}
          />
      </div>
    )
  }
}
