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
        type: "UTIM",
        activos: 20,
        inactivos: 5,
      }, {
        type: "Auto",
        activos: 11,
        inactivos: 2,
      }, {
        type: "interface",
        activos: 2,
        inactivos: 15,
      }
    ],
    serviciosPorEstadoYColor:[
      {
        descripcion:"Activos",
        serviciosPorColor: [
          {color: "Rojos", cantidad: 25},
          {color: "Amarillos", cantidad: 45},
          {color: "Verdes", cantidad: 80},
          {color: "Traslados", cantidad: 12},
          {color: "Eventos", cantidad: 25},
          {color: "Otros", cantidad: 45},
        ]
      },
      {
        descripcion:"Demorados",
        serviciosPorColor: [
          {color: "Rojos", cantidad: 10},
          {color: "Amarillos", cantidad: 5},
          {color: "Verdes", cantidad: 120},
          {color: "Traslados", cantidad: 0},
          {color: "Eventos", cantidad: 2},
          {color: "Otros", cantidad: 10},
        ]
      },
      {
        descripcion:"Apoyos",
        serviciosPorColor: [
          {color: "Rojos", cantidad: 2},
          {color: "Amarillos", cantidad: 15},
          {color: "Verdes", cantidad: 0},
          {color: "Traslados", cantidad: 0},
          {color: "Eventos", cantidad: 12},
          {color: "Otros", cantidad: 4},
        ]
      },
      {
        descripcion:"At. Multiples",
        serviciosPorColor: [
          {color: "Rojos", cantidad: 100},
          {color: "Amarillos", cantidad: 5},
          {color: "Verdes", cantidad: 10},
          {color: "Traslados", cantidad: 40},
          {color: "Eventos", cantidad: 2},
          {color: "Otros", cantidad: 10},
        ]
      },
      {
        descripcion:"Totales",
        serviciosPorColor: [
          {color: "Rojos", cantidad: 300},
          {color: "Amarillos", cantidad: 150},
          {color: "Verdes", cantidad: 100},
          {color: "Traslados", cantidad: 140},
          {color: "Eventos", cantidad: 80},
          {color: "Otros", cantidad: 90},
        ]
      },
    ],
    serviciosRecibidosDespachados: [
      {
        type: "Receptor",
        tomados: 20,
        cancelados: 5,
        enCurso: 0,
        cerrados: 0
      }, {
        type: "Despachador",
        tomados: 0,
        cancelados: 0,
        enCurso: 11,
        cerrados: 2
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
        type: "Pami",
        activos: 20,
        demorados: 5,
      }, {
        type: "Swiss",
        activos: 7,
        demorados: 2,
      }, {
        type: "Omint",
        activos: 2,
        demorados: 5,
      }
    ]
  };
}


export function getStateServiciosFromAPI(){
  return {
    cerradosPorEstado: [
      {color: "En Tiempo", cantidadPorHora: [14,  32,   56,   43,     0,    12,   9,    26,   70, 23,  34,   12,   56,   24,    5,   65,   20,    10, 65,   20,    10] },
      {color: "Demorados", cantidadPorHora: [23,  34,   12,   56,     24,    5,   65,   20,    10, 14,  32,   56,   43,     0,    12,   9,    26,   70, 32,   56,   43,]},
      {color: "Cancelados", cantidadPorHora: [7,  8,    9,    10,    11,   12,   3,    41,    12, 7,  8,    9,    10,    11,   12,   3,    41,    12, 65,   20,    10]},
    ],
    cerradosPorColor: [
      {color: "Rojos", cantidadPorHora: [     14, 32, 56, 43, 0, 12, ] },
      {color: "Amarillos", cantidadPorHora: [ 23, 34, 12, 56, 24, 32]},
      {color: "Celestes", cantidadPorHora: [  7,  8,  9,  10, 11, 12,]},
      {color: "Verdes", cantidadPorHora: [    17, 28, 9,  1,  4,  8]},
      {color: "Traslados", cantidadPorHora: [ 23, 34, 12, 56, 34, 8]},
      {color: "Eventos", cantidadPorHora: [   7,  8,  9,  10, 11, 12,]},
      {color: "Laboral", cantidadPorHora: [   14, 5,  12, 3,  31, 42,]},
      {color: "Enfermeria", cantidadPorHora: [8, 10,  22, 5,  4,  11]},
    ],
    demoradosPorEstandar: [
      {color: "Asignacion", cantidadPorHora: [  14, 32, 56, 43, 0, 12, 9,] },
      {color: "Viaje", cantidadPorHora: [       23, 34, 12, 56, 24, 5, 12]},
      {color: "TRTA", cantidadPorHora: [        7,  18,  5, 12, 11, 15, 8]},
    ],
    tiempoRtaPorColor: [
      {color: "Rojos", cantidadPorHora: [     14, 32, 56, 43, 0, 12,  9,] },
      {color: "Amarillos", cantidadPorHora: [ 23, 34, 12, 56, 23, 41, 12]},
      {color: "Celestes", cantidadPorHora: [  7,  8,  9,  10, 11, 12, 4]},
      {color: "Verdes", cantidadPorHora: [    17, 28, 9,  1,  4,  8,  2]},
      {color: "Traslados", cantidadPorHora: [ 4,  24, 10, 5, 34,  14, 7]},
      {color: "Eventos", cantidadPorHora: [   6,  12, 17, 15, 1,  2,  4]},
      {color: "Laboral", cantidadPorHora: [   3,  9,  9,  12, 20, 0,  5]},
      {color: "Enfermeria", cantidadPorHora: [44, 14, 10, 6,  4,  9,  14]},
    ],
  }
}