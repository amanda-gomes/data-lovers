window.onload = function () {
  listarIndices();
};

document.getElementById("btnIr").addEventListener("click", graficosPorIndicadorBR)

function listarIndices() {

  let campoSelect = document.getElementById("indicadores");
  campoSelect.innerHTML =
    "<select id='indicadores'>" +
    `${WORLDBANK["BRA"]["indicators"].map((indicator) => `
    <option value="${indicator["indicatorName"]}"> "${indicator["indicatorName"]}" </option>
  `)}` + "</select>";

  let campoSelectBR = document.getElementById("indicadoresBR");
  campoSelectBR.innerHTML =
    "<select id='indicadoresBR'>" +
    `${WORLDBANK["BRA"]["indicators"].map((indicator) => `
    <option value="${indicator["indicatorName"]}"> "${indicator["indicatorName"]}" </option>
  `)}` + "</select>";

  let campoSelectPER = document.getElementById("indicadoresPER");
  campoSelectPER.innerHTML =
    "<select id='indicadoresPER'>" +
    `${WORLDBANK["PER"]["indicators"].map((indicator) => `
    <option value="${indicator["indicatorName"]}"> "${indicator["indicatorName"]}" </option>
  `)}` + "</select>";

}

function graficosPorIndicadorBR() {
  let campoSelect = document.getElementById("indicadores");
  let campoPublicarIndicador = document.getElementById("indicadorName");
  campoPublicarIndicador.textContent = campoSelect.value;

  let graficoBr = document.getElementById("graficoBR");
  graficoBr.innerHTML = "<div id='graficoBR' style='height: 200px;'></div>";
  let graficoPer = document.getElementById("graficoPER");
  graficoPer.innerHTML = "<div id='graficoPER' style='height: 200px;'></div>";

  google.charts.load('current', { 'packages': ['corechart'] });
  google.charts.setOnLoadCallback(graficoIndicadorBR);
  google.charts.setOnLoadCallback(graficoIndicadorPER);
}


function graficoIndicadorBR() {
  let campoSelect = document.getElementById("indicadores");
  let filtroBr = WORLDBANK["BRA"]["indicators"].filter((index) =>
    index["indicatorName"] === campoSelect.value);

  let valoresBr = [];
  for (let i = 2015; i <= 2017; i++) {
    let valor = parseFloat(filtroBr.map((index) => index["data"][i]).join("[]"));

    if (valor != 0) {
      valoresBr.push(valor)
    } else {
      valoresBr.push(0)
    }
  }

  // Some raw data (not necessarily accurate)
  let data = google.visualization.arrayToDataTable([
    ['Brasil', '2015', '2016', '2017'],
    ['Ano', valoresBr[0], valoresBr[1], valoresBr[2]]
  ]);

  let options = {
    title: 'BRASIL',
    vAxis: { title: 'Cups' },
    hAxis: { title: 'Month' },
    seriesType: 'bars',
    series: { 5: { type: 'line' } }
  };

  let chart = new google.visualization.ComboChart(document.getElementById('graficoBR'));
  chart.draw(data, options);
}


function graficoIndicadorPER() {
  let campoSelect = document.getElementById("indicadores");
  
  let filtroPer = WORLDBANK["PER"]["indicators"].filter((index) =>
    index["indicatorName"] === campoSelect.value);

  var valoresPer = [];
  for (let i = 2015; i <= 2017; i++) {
    let valor = parseFloat(filtroPer.map((index) => index["data"][i]).join("[]"));

    if (valor != 0) {
      valoresPer.push(valor)
    } else {
      valoresPer.push(0)
    }
  }

  // Some raw data (not necessarily accurate)
  let data = google.visualization.arrayToDataTable([
    ['Perú', '2015', '2016', '2017'],
    ['Ano', valoresPer[0], valoresPer[1], valoresPer[2]]
  ]);

  let options = {
    title: 'PERÚ',
    vAxis: { title: 'Cups' },
    hAxis: { title: 'Month' },
    seriesType: 'bars',
    series: { 5: { type: 'line' } }
  };

  let chart = new google.visualization.ComboChart(document.getElementById('graficoPER'));
  chart.draw(data, options);
}
