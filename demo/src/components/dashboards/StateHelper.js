export function getStateFromAPI(){
  return {
    resumen: {
      servicios: {
        enCurso: 3,
        cerrados: 20,
        cancelados: 12,
      },
      moviles: {
        activos: 20,
        fueraServicio: 35,
      },
      operadores: {
        receptores: 24,
        despachadores: 7,
      },
      estadoGeneral: {
        gps: false,
        interfaces: true,
        grabadora: true,
      },
    },
    totalesPorEstadoServicio: {
      activos: 35,
      demorados: 22,
      apoyos: 15,
      atencionesMultiples: 32,
    },
    estadosPorTipoDeMovil: [
      {
        type: "Ambulance",
        activos: 20,
        inactivos: 5,
      }, {
        type: "Car",
        activos: 11,
        inactivos: 2,
      }, {
        type: "Externals",
        activos: 2,
        inactivos: 15,
      }
    ],
    serviciosPorEstadoYColor:[
      {
        descripcion:"Actives",
        serviciosPorColor: [
          {color: "Red", cantidad: 25},
          {color: "Yellow", cantidad: 45},
          {color: "Green", cantidad: 80},
          {color: "Transfers", cantidad: 12},
          {color: "Events", cantidad: 25},
          {color: "Others", cantidad: 45},
        ]
      },
      {
        descripcion:"Delayed",
        serviciosPorColor: [
          {color: "Red", cantidad: 10},
          {color: "Yellow", cantidad: 5},
          {color: "Green", cantidad: 120},
          {color: "Transfers", cantidad: 0},
          {color: "Events", cantidad: 2},
          {color: "Others", cantidad: 10},
        ]
      },
      {
        descripcion:"Backing",
        serviciosPorColor: [
          {color: "Red", cantidad: 2},
          {color: "Yellow", cantidad: 15},
          {color: "Green", cantidad: 0},
          {color: "Transfers", cantidad: 0},
          {color: "Events", cantidad: 12},
          {color: "Others", cantidad: 4},
        ]
      },
      {
        descripcion:"Multiple Att.",
        serviciosPorColor: [
          {color: "Red", cantidad: 100},
          {color: "Yellow", cantidad: 5},
          {color: "Green", cantidad: 10},
          {color: "Transfers", cantidad: 40},
          {color: "Events", cantidad: 2},
          {color: "Others", cantidad: 10},
        ]
      },
      {
        descripcion:"Totals",
        serviciosPorColor: [
          {color: "Red", cantidad: 300},
          {color: "Yellow", cantidad: 150},
          {color: "Green", cantidad: 100},
          {color: "Transfers", cantidad: 140},
          {color: "Events", cantidad: 80},
          {color: "Others", cantidad: 90},
        ]
      },
    ],
    serviciosRecibidosDespachados: [
      {
        type: "Receivers",
        tomados: 20,
        cancelados: 5,
      }, {
        type: "Dispatchers",
        tomados: 11,
        cancelados: 2,
      },
    ],
    promediosServiciosRecibidosDespachados: {
      recepPromedioColoring: 35,
      recepPromedioAsignacion: 22,
      despRedespachos: 15,
      despPromedioAsignacion: 32,
    },
  };
}

export function getStateClientesFromAPI(){
  return {
    resumen: {
      grupos: {
        enTiempo: 20,
        fueraTiempo: 12,
      },
      areas: {
        enTiempo: 10,
        fueraTiempo: 5,
      },
      convenios: {
        enTiempo: 8,
        fueraTiempo: 0,
      },
      estadoGeneral: {
        gps: false,
        interfaces: true,
        grabadora: true,
      },
    },
    gruposFamiliares: {
      activos: 35,
      demorados: 22,
      cerrados: 15,
      cancelados: 32,
    },
    areasProtegidas: {
      activos: 5,
      demorados: 12,
      cerrados: 23,
      cancelados: 3,
    },
    convenios: {
      activos: 40,
      demorados: 4,
      cerrados: 120,
      cancelados: 30,
    },
    serviciosPorConvenio : [
      {
        type: "Assist America",
        activos: 20,
        demorados: 5,
      }, {
        type: "Careflite",
        activos: 7,
        demorados: 2,
      }, {
        type: "Reva",
        activos: 2,
        demorados: 5,
      }
    ]
  };
}


export function getStateServiciosFromAPI(){
  return {
    cerradosPorEstado: [
      {color: "On Time", cantidadPorHora: [14,  32,   56,   43,     0,    12,   9,    26,   70, 23,  34,   12,   56,   24,    5,   65,   20,    10, 65,   20,    10] },
      {color: "Delayed", cantidadPorHora: [23,  34,   12,   56,     24,    5,   65,   20,    10, 14,  32,   56,   43,     0,    12,   9,    26,   70, 32,   56,   43,]},
      {color: "Canceled", cantidadPorHora: [7,  8,    9,    10,    11,   12,   3,    41,    12, 7,  8,    9,    10,    11,   12,   3,    41,    12, 65,   20,    10]},
    ],
    cerradosPorColor: [
      {color: "Red", cantidadPorHora: [     14, 32, 56, 43, 0, 12, ] },
      {color: "Yellow", cantidadPorHora: [ 23, 34, 12, 56, 24, 32]},
      {color: "LightBlue", cantidadPorHora: [  7,  8,  9,  10, 11, 12,]},
      {color: "Green", cantidadPorHora: [    17, 28, 9,  1,  4,  8]},
      {color: "Transfers", cantidadPorHora: [ 23, 34, 12, 56, 34, 8]},
      {color: "Events", cantidadPorHora: [   7,  8,  9,  10, 11, 12,]},
      {color: "On Site", cantidadPorHora: [   14, 5,  12, 3,  31, 42,]},
      {color: "Nursing", cantidadPorHora: [8, 10,  22, 5,  4,  11]},
    ],
    demoradosPorEstandar: [
      {color: "Assignation", cantidadPorHora: [  14, 32, 56, 43, 0, 12, 9,] },
      {color: "Travel", cantidadPorHora: [       23, 34, 12, 56, 24, 5, 12]},
      {color: "Response T.", cantidadPorHora: [        7,  18,  5, 12, 11, 15, 8]},
    ],
    tiempoRtaPorColor: [
      {color: "Standard", cantidadPorHora: [     14, 32, 56, 43, 0, 12,  9,] },
      {color: "Urgency", cantidadPorHora: [ 23, 34, 12, 56, 23, 41, 12]},
      {color: "External", cantidadPorHora: [  7,  8,  9,  10, 11, 12, 4]},
      {color: "Programmed", cantidadPorHora: [    17, 28, 9,  1,  4,  8,  2]},
      {color: "Transfers", cantidadPorHora: [ 4,  24, 10, 5, 34,  14, 7]},
      {color: "Events", cantidadPorHora: [   6,  12, 17, 15, 1,  2,  4]},
      {color: "On Site", cantidadPorHora: [   3,  9,  9,  12, 20, 0,  5]},
      {color: "Nursing", cantidadPorHora: [44, 14, 10, 6,  4,  9,  14]},
    ],
  }
}