export interface ChemicalElement {
  id: number;
  displayName: string;
  unit: string;
  info: string;
  riskLevel: {
    low: number;
    moderate: number;
    high: number;
    riskDescription: string;
  };
}

export const chemicalElements: ChemicalElement[] = [
  {
    id: 1,
    displayName: "PM10",
    unit: "µg/m³",
    info: "Partículas suspendidas en el aire menores a 10 micrómetros, que pueden afectar las vías respiratorias.",
    riskLevel: { low: 0, moderate: 50, high: 150, riskDescription: "Exposición prolongada puede irritar los pulmones y agravar enfermedades respiratorias." }
  },
  {
    id: 2,
    displayName: "PM2.5",
    unit: "µg/m³",
    info: "Partículas finas menores a 2.5 micrómetros, que pueden penetrar profundamente en los pulmones.",
    riskLevel: { low: 0, moderate: 25, high: 75, riskDescription: "Puede causar problemas respiratorios y cardiovasculares si la exposición es alta." }
  },
  {
    id: 3,
    displayName: "O₃ mass",
    unit: "µg/m³",
    info: "Ozono en la atmósfera que puede irritar los ojos y pulmones.",
    riskLevel: { low: 0, moderate: 100, high: 180, riskDescription: "La exposición prolongada puede causar tos, irritación ocular y problemas respiratorios." }
  },
  {
    id: 4,
    displayName: "CO mass",
    unit: "µg/m³",
    info: "Monóxido de carbono, gas tóxico que reduce la capacidad de transporte de oxígeno en la sangre.",
    riskLevel: { low: 0, moderate: 5000, high: 10000, riskDescription: "Puede causar mareos, dolor de cabeza y, en altos niveles, riesgo de intoxicación grave." }
  },
  {
    id: 5,
    displayName: "NO₂ mass",
    unit: "µg/m³",
    info: "Dióxido de nitrógeno, que puede irritar vías respiratorias y empeorar enfermedades pulmonares.",
    riskLevel: { low: 0, moderate: 100, high: 200, riskDescription: "La exposición prolongada puede provocar bronquitis y reducción de la función pulmonar." }
  },
  {
    id: 6,
    displayName: "SO₂ mass",
    unit: "µg/m³",
    info: "Dióxido de azufre, gas irritante de ojos, nariz y garganta.",
    riskLevel: { low: 0, moderate: 125, high: 350, riskDescription: "Exposición alta puede causar problemas respiratorios y agravar enfermedades pulmonares." }
  },
  {
    id: 7,
    displayName: "NO₂",
    unit: "ppm",
    info: "Dióxido de nitrógeno, en concentración que puede afectar respiración y causar irritación.",
    riskLevel: { low: 0, moderate: 0.1, high: 0.3, riskDescription: "Puede causar dificultad respiratoria y aumentar riesgos para personas con asma." }
  },
  {
    id: 8,
    displayName: "CO",
    unit: "ppm",
    info: "Monóxido de carbono, gas que impide transporte eficiente de oxígeno en la sangre.",
    riskLevel: { low: 0, moderate: 9, high: 35, riskDescription: "Altos niveles pueden provocar fatiga, mareos y riesgo grave para la salud." }
  },
  {
    id: 9,
    displayName: "SO₂",
    unit: "ppm",
    info: "Dióxido de azufre en aire, irritante para vías respiratorias y ojos.",
    riskLevel: { low: 0, moderate: 0.2, high: 0.5, riskDescription: "Puede empeorar problemas respiratorios y causar tos y dificultad respiratoria." }
  },
  {
    id: 10,
    displayName: "O₃",
    unit: "ppm",
    info: "Ozono, gas que en concentraciones altas irrita pulmones y vías respiratorias.",
    riskLevel: { low: 0, moderate: 0.07, high: 0.15, riskDescription: "Puede causar tos, irritación de garganta y empeorar enfermedades respiratorias." }
  },
  {
    id: 11,
    displayName: "BC",
    unit: "µg/m³",
    info: "Carbono negro, partículas finas que afectan pulmones y sistema cardiovascular.",
    riskLevel: { low: 0, moderate: 5, high: 20, riskDescription: "Puede agravar problemas cardíacos y respiratorios con exposición prolongada." }
  },
  {
    id: 15,
    displayName: "NO₂",
    unit: "ppb",
    info: "Dióxido de nitrógeno, gas irritante para ojos y vías respiratorias.",
    riskLevel: { low: 0, moderate: 50, high: 100, riskDescription: "Puede causar dificultad respiratoria y mayor riesgo de asma en niños." }
  },
  {
    id: 19,
    displayName: "PM1",
    unit: "µg/m³",
    info: "Partículas ultrafinas menores a 1 micrómetro que pueden penetrar profundamente en pulmones.",
    riskLevel: { low: 0, moderate: 10, high: 25, riskDescription: "Exposición alta puede causar irritación pulmonar y afectar el sistema cardiovascular." }
  },
  {
    id: 21,
    displayName: "CO₂",
    unit: "ppm",
    info: "Dióxido de carbono, gas presente en aire que en exceso puede afectar concentración y respiración.",
    riskLevel: { low: 0, moderate: 1000, high: 5000, riskDescription: "Niveles altos pueden provocar somnolencia, mareos y dificultad respiratoria." }
  },
  {
    id: 22,
    displayName: "Wind direction",
    unit: "deg",
    info: "Dirección de donde proviene el viento.",
    riskLevel: { low: 0, moderate: 0, high: 0, riskDescription: "No aplica riesgo directo; útil para dispersión de contaminantes." }
  },
  {
    id: 23,
    displayName: "NOX",
    unit: "ppb",
    info: "Óxidos de nitrógeno, que irritan vías respiratorias y afectan la calidad del aire.",
    riskLevel: { low: 0, moderate: 100, high: 200, riskDescription: "Exposición prolongada puede agravar asma y otros problemas respiratorios." }
  },
  {
    id: 24,
    displayName: "NO",
    unit: "ppb",
    info: "Monóxido de nitrógeno, gas irritante de vías respiratorias.",
    riskLevel: { low: 0, moderate: 50, high: 100, riskDescription: "Puede causar tos y dificultad respiratoria en personas sensibles." }
  },
  {
    id: 27,
    displayName: "NOx mass",
    unit: "µg/m³",
    info: "Concentración de óxidos de nitrógeno que pueden afectar pulmones y corazón.",
    riskLevel: { low: 0, moderate: 100, high: 200, riskDescription: "Exposición alta puede provocar irritación respiratoria y aumentar riesgo de enfermedades crónicas." }
  },
  {
    id: 28,
    displayName: "CH₄",
    unit: "ppm",
    info: "Metano, gas incoloro, inflamable, con bajo riesgo directo en concentraciones ambientales.",
    riskLevel: { low: 0, moderate: 5, high: 20, riskDescription: "En ambientes cerrados y concentraciones altas puede causar mareos o asfixia." }
  },
  {
    id: 32,
    displayName: "O₃",
    unit: "ppb",
    info: "Ozono en el aire, irritante respiratorio.",
    riskLevel: { low: 0, moderate: 70, high: 180, riskDescription: "Puede causar tos y dificultad respiratoria en personas sensibles." }
  },
  {
    id: 33,
    displayName: "UFP count",
    unit: "particles/cm³",
    info: "Conteo de partículas ultrafinas, muy pequeñas para afectar pulmones.",
    riskLevel: { low: 0, moderate: 50000, high: 150000, riskDescription: "Exposición prolongada puede irritar pulmones y afectar corazón." }
  },
  {
    id: 34,
    displayName: "Wind speed",
    unit: "m/s",
    info: "Velocidad del viento.",
    riskLevel: { low: 0, moderate: 0, high: 0, riskDescription: "No representa riesgo directo; afecta dispersión de contaminantes." }
  },
  {
    id: 35,
    displayName: "NO",
    unit: "ppm",
    info: "Monóxido de nitrógeno, irritante para las vías respiratorias.",
    riskLevel: { low: 0, moderate: 0.05, high: 0.1, riskDescription: "Puede causar tos y agravar problemas respiratorios." }
  },
  {
    id: 95,
    displayName: "Atmospheric pressure",
    unit: "hpa",
    info: "Presión atmosférica local.",
    riskLevel: { low: 0, moderate: 0, high: 0, riskDescription: "No representa riesgo directo; útil para predicciones meteorológicas." }
  },
  {
    id: 97,
    displayName: "PM2.5-old",
    unit: "ug/m3",
    info: "Partículas finas, versión antigua de medición.",
    riskLevel: { low: 0, moderate: 25, high: 75, riskDescription: "Puede causar problemas respiratorios similares al PM2.5 actual." }
  },
  {
    id: 98,
    displayName: "RH",
    unit: "%",
    info: "Humedad relativa del aire.",
    riskLevel: { low: 0, moderate: 60, high: 80, riskDescription: "No representa riesgo químico, pero puede afectar confort y respiración." }
  },
  {
    id: 100,
    displayName: "Temperature (C)",
    unit: "c",
    info: "Temperatura del aire en grados Celsius.",
    riskLevel: { low: -10, moderate: 35, high: 45, riskDescription: "Temperaturas extremas pueden afectar salud y aumentar riesgos de golpes de calor o hipotermia." }
  },
  {
    id: 101,
    displayName: "SO₂",
    unit: "ppb",
    info: "Dióxido de azufre en aire, irritante de vías respiratorias.",
    riskLevel: { low: 0, moderate: 50, high: 200, riskDescription: "Puede causar tos, dificultad respiratoria y agravar enfermedades pulmonares." }
  },
  {
    id: 102,
    displayName: "CO",
    unit: "ppb",
    info: "Monóxido de carbono en aire.",
    riskLevel: { low: 0, moderate: 100, high: 200, riskDescription: "Altos niveles pueden provocar mareos y riesgo de intoxicación." }
  },
  {
    id: 125,
    displayName: "PM0.3 count",
    unit: "particles/cm³",
    info: "Conteo de partículas ultrafinas muy pequeñas.",
    riskLevel: { low: 0, moderate: 10000, high: 50000, riskDescription: "Exposición prolongada puede irritar pulmones." }
  },
  {
    id: 126,
    displayName: "PM1 count",
    unit: "particles/cm³",
    info: "Conteo de partículas menores a 1 micrómetro.",
    riskLevel: { low: 0, moderate: 20000, high: 100000, riskDescription: "Puede causar irritación respiratoria con exposición alta." }
  },
  {
    id: 128,
    displayName: "Temperature (F)",
    unit: "f",
    info: "Temperatura en grados Fahrenheit.",
    riskLevel: { low: 14, moderate: 95, high: 113, riskDescription: "Temperaturas extremas afectan salud y confort." }
  },
  {
    id: 130,
    displayName: "PM2.5 count",
    unit: "particles/cm³",
    info: "Conteo de partículas finas menores a 2.5 micrómetros.",
    riskLevel: { low: 0, moderate: 5000, high: 15000, riskDescription: "Exposición alta puede afectar pulmones y corazón." }
  },
  {
    id: 132,
    displayName: "Pressure",
    unit: "mb",
    info: "Presión atmosférica en milibares.",
    riskLevel: { low: 0, moderate: 0, high: 0, riskDescription: "No implica riesgo químico, útil para meteorología." }
  },
  {
    id: 134,
    displayName: "H",
    unit: "%",
    info: "Humedad relativa del aire.",
    riskLevel: { low: 0, moderate: 60, high: 80, riskDescription: "Exceso de humedad puede afectar confort y respiración." }
  },
  {
    id: 135,
    displayName: "PM10 count",
    unit: "particles/cm³",
    info: "Conteo de partículas menores a 10 micrómetros.",
    riskLevel: { low: 0, moderate: 5000, high: 15000, riskDescription: "Exposición alta puede irritar vías respiratorias y pulmones." }
  },
  {
    id: 19840,
    displayName: "NOx",
    unit: "ppm",
    info: "Óxidos de nitrógeno, irritantes para vías respiratorias.",
    riskLevel: { low: 0, moderate: 0.05, high: 0.2, riskDescription: "Exposición alta puede agravar asma y problemas respiratorios." }
  },
  {
    id: 19843,
    displayName: "NO mass",
    unit: "µg/m³",
    info: "Monóxido de nitrógeno, gas que irrita vías respiratorias.",
    riskLevel: { low: 0, moderate: 50, high: 100, riskDescription: "Puede causar dificultad respiratoria y tos." }
  },
  {
    id: 19844,
    displayName: "PM4.0",
    unit: "µg/m³",
    info: "Partículas menores a 4 micrómetros que pueden afectar pulmones.",
    riskLevel: { low: 0, moderate: 20, high: 50, riskDescription: "Exposición alta puede irritar pulmones y afectar respiración." }
  },
  {
    id: 19860,
    displayName: "PM2.5",
    unit: "ppm",
    info: "Partículas finas que afectan pulmones y sistema cardiovascular.",
    riskLevel: { low: 0, moderate: 0.03, high: 0.1, riskDescription: "Puede causar problemas respiratorios y cardiovasculares con exposición alta." }
  }
];
