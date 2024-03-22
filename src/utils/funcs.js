export function getCurrentDate() {
  const date = new Date();
  const formatted = `${date.getDate()}/${date.getMonth() + 1
    }/${date.getFullYear()}`;

  return formatted;
}

export function estaEntreLasFechas(FI, FF) {
  const fechaInicio = new Date(FI);
  const fechaFin = new Date(FF);
  const fechaActual = new Date();

  return fechaActual >= fechaInicio && fechaActual <= fechaFin;
}

export function formatDateToCustomString(timestamp) {
  const seconds = timestamp.seconds;
  const date = new Date(seconds * 1000); // Multiplicamos por 1000 para convertir los segundos a milisegundos
  const options = { day: "2-digit", month: "short", year: "numeric" };
  return date.toLocaleDateString(undefined, options);
}

export function ConvertMonth(mes) {
  let MesEspa;

  if (mes == "weekly") {
    MesEspa = "Semanal";
  } else if (mes == "monthly") {
    MesEspa = "Mensual";
  } else if (mes == "yearly") {
    MesEspa = "Anual";
  } else {
    MesEspa = "Todo";
  }

  return MesEspa;
}

export function calcularSumasSemanas(data) {
  const semanas = {};

  // Mapea nombres de meses
  const meses = [
    "enero",
    "febrero",
    "marzo",
    "abril",
    "mayo",
    "junio",
    "julio",
    "agosto",
    "septiembre",
    "octubre",
    "noviembre",
    "diciembre",
  ];

  const mesesSemana = [
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    "10",
    "11",
    "12",
  ];

  // Itera sobre los datos
  data.forEach((item) => {
    const fecha = new Date(item.fecha);
    const semana = `${fecha.getFullYear()}-${fecha.getWeek()}`;
    const diaSemana = fecha.getDay(); // Día de la semana (0 = Domingo, 1 = Lunes, ..., 6 = Sábado)
    const mes = meses[fecha.getMonth()];

    const inicioSemana = new Date(fecha);
    inicioSemana.setDate(fecha.getDate() - diaSemana);
    const finSemana = new Date(fecha);
    finSemana.setDate(fecha.getDate() + (6 - diaSemana));

    let rangoSemana;
    if (inicioSemana.getMonth() === finSemana.getMonth()) {
      rangoSemana = `${mesesSemana[inicioSemana.getMonth()]}/${inicioSemana.getDate()} - ${mesesSemana[inicioSemana.getMonth()]}/${finSemana.getDate()}`;
    } else {
      // Si el rango cruza dos meses, ajusta el mes en el rango
      if (inicioSemana.getDate() > finSemana.getDate()) {
        rangoSemana = `${mesesSemana[inicioSemana.getMonth()]
          }/${inicioSemana.getDate()} - ${mesesSemana[finSemana.getMonth()]
          }/${finSemana.getDate()}`;
      } else {
        rangoSemana = `${mesesSemana[inicioSemana.getMonth()]
          } ${inicioSemana.getDate()} - ${mesesSemana[inicioSemana.getMonth()]
          } ${finSemana.getDate()}`;
      }
    }

    if (!semanas[rangoSemana]) {
      semanas[rangoSemana] = {
        mes: mes,
        anio: fecha.getFullYear(),
        rangoSemana: rangoSemana,
        ventas: 0,
        gastos: 0,
      };
    }

    semanas[rangoSemana].ventas += item.ventas;
    semanas[rangoSemana].gastos += item.gastos;
  });

  const resultado = Object.values(semanas);

  // Ordena por año y fecha del rangoSemana
  resultado.sort((a, b) => {
    if (a.anio !== b.anio) {
      return a.anio - b.anio;
    }
    const fechaA = new Date(a.rangoSemana.split(" ")[3]);
    const fechaB = new Date(b.rangoSemana.split(" ")[3]);
    return fechaA - fechaB;
  });

  return resultado;
}

// Agregar un método para obtener el número de semana del año
Date.prototype.getWeek = function () {
  var d = new Date(
    Date.UTC(this.getFullYear(), this.getMonth(), this.getDate())
  );
  var dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  var yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return Math.ceil(((d - yearStart) / 86400000 + 1) / 7);
};

export function calcularSumasMensuales(data, Year) {
  const meses = {};

  // Nombres de los meses
  const nombresMeses = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];

  // Crear un objeto con todos los meses del año con ventas y gastos en 0
  nombresMeses.forEach((nombreMes) => {
    const claveMes = `${Year}-${nombreMes}`;
    meses[claveMes] = {
      mes: nombreMes,
      year: Year,
      ventas: 0,
      gastos: 0,
    };
  });

  // Iterar sobre los datos y sumarlos a los meses correspondientes
  data.forEach((item) => {
    const fecha = new Date(item.fecha);
    const año = fecha.getFullYear();

    const mes = nombresMeses[fecha.getMonth()]; // Obtén el nombre del mes
    const claveMes = `${año}-${mes}`;

    if (meses[claveMes]) {
      meses[claveMes].ventas += item.ventas;
      meses[claveMes].gastos += item.gastos;
    }
  });

  const resultado = Object.values(meses);

  // Ordena por año y mes
  resultado.sort((a, b) => {
    if (a.year !== b.year) {
      return a.year - b.year;
    }
    const mesA = nombresMeses.indexOf(a.mes);
    const mesB = nombresMeses.indexOf(b.mes);
    return mesA - mesB;
  });

  return resultado;
}


export function obtenerGastosVentasPorFecha(data, fechaStr) {
  // Convierte la cadena de fecha en una fecha válida
  const partesFecha = fechaStr.split(' ');
  if (partesFecha.length !== 2) {
    throw new Error("El formato de fecha no es válido. Debe ser 'Mes Año' (por ejemplo, 'Febrero 2024').");
  }
  const nombreMes = partesFecha[0];
  const year = parseInt(partesFecha[1]);

  if (isNaN(year)) {
    throw new Error("El año en la fecha no es válido.");
  }

  const SumasPorMes = calcularSumasMensuales(data,year);

  // Busca el mes y año en los datos y suma los gastos y ventas correspondientes
  const mesEncontrado = SumasPorMes.filter((item) => {
    return item.mes == nombreMes && item.year == year;
  });

  if (mesEncontrado) {
    return {
      mes: nombreMes,
      año: year,
      ventas: mesEncontrado[0].ventas,
      gastos: mesEncontrado[0].gastos,
    };
  } else {
    return {
      mes: nombreMes,
      año: year,
      ventas: 0,
      gastos: 0,
    };
  }
}

export function calcularSumasAnuales(data) {
  const años = {};

  // Itera sobre los datos
  data.forEach((item) => {
    const fecha = new Date(item.fecha);
    const año = fecha.getFullYear();

    if (!años[año]) {
      años[año] = {
        year: año,
        ventas: 0,
        gastos: 0,
      };
    }

    años[año].ventas += item.ventas;
    años[año].gastos += item.gastos;
  });

  const resultado = Object.values(años);

  // Ordena por año
  resultado.sort((a, b) => {
    return a.year - b.year;
  });

  return resultado;
}
