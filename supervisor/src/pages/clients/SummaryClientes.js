import React, { Component } from 'react'
import SummaryPanel from "../../layout/SummaryPanel";

export default class SummaryHome extends Component {
  render() {
    const { grupos, areas, convenios, estadoGeneral } = this.props.summary;
    return (
      <div id="summary-container">
          <SummaryPanel
            category={{ title: "Grupos", icon: "fas fa-house-user fa-3x" }}
            items={[
              { key: "Cerrados", value: grupos.enTiempo + grupos.fueraTiempo },
              { key: "En Tiempo", value: grupos.enTiempo},
              { key: "Fuera Tiempo", value: grupos.fueraTiempo },
            ]}
          />
          <SummaryPanel
            category={{ title: "Areas", icon: "fas fa-map-marked-alt fa-3x" }}
            items={[
              { key: "Cerrados", value: areas.enTiempo + areas.fueraTiempo },
              { key: "En Tiempo", value: areas.enTiempo},
              { key: "Fuera Tiempo", value: areas.fueraTiempo },
            ]}
          />
          <SummaryPanel
            category={{ title: "Convenios", icon: "fas fa-building fa-3x" }}
            items={[
              { key: "Cerrados", value: convenios.enTiempo + convenios.fueraTiempo },
              { key: "En Tiempo", value: convenios.enTiempo },
              { key: "Fuera Tiempo", value: convenios.fueraTiempo },
            ]}
          />
          <SummaryPanel
            category={{ title: "Estado Gral.", icon: "fas fa-info-circle fa-3x" }}
            items={[
              { key: "GPS", value: estadoGeneral.gps },
              { key: "Interfaces", value: estadoGeneral.interfaces },
              { key: "Grabadora", value: estadoGeneral.grabadora },
            ]}
          />
      </div>
    )
  }
}
