import React, { Component } from 'react'
import SummaryPanel from "../layout/SummaryPanel";

export default class SummaryHome extends Component {
  render() {
    const { grupos, areas, convenios, estadoGeneral } = this.props.summary;
    return (
      <div id="summary-container">
          <SummaryPanel
            category={{ title: "Groups", icon: "fas fa-house-user fa-3x" }}
            items={[
              { key: "Closed", value: grupos.enTiempo + grupos.fueraTiempo },
              { key: "On Time", value: grupos.enTiempo},
              { key: "Delayed", value: grupos.fueraTiempo },
            ]}
          />
          <SummaryPanel
            category={{ title: "Areas", icon: "fas fa-map-marked-alt fa-3x" }}
            items={[
              { key: "Closed", value: areas.enTiempo + areas.fueraTiempo },
              { key: "On Time", value: areas.enTiempo},
              { key: "Delayed", value: areas.fueraTiempo },
            ]}
          />
          <SummaryPanel
            category={{ title: "Contracts", icon: "fas fa-building fa-3x" }}
            items={[
              { key: "Closed", value: convenios.enTiempo + convenios.fueraTiempo },
              { key: "On Time", value: convenios.enTiempo },
              { key: "Delayed", value: convenios.fueraTiempo },
            ]}
          />
          <SummaryPanel
            category={{ title: "General Status", icon: "fas fa-info-circle fa-3x" }}
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
