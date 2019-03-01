window.onload = function () {
  listIndicator();
};

document.getElementById("btnGo").addEventListener("click", chartIndicators)

function listIndicator() {

  let campSelect = document.getElementById("indicators");
  campSelect.innerHTML=
    "<select id='indicator'>" +
    `${WORLDBANK["BRA"]["indicators"].map((indicator) => `
    <option value="${indicator["indicatorName"]}"> "${indicator["indicatorName"]}" </option>
  `)}` + "</select>";

  let selectBr = document.getElementById("indicatorsBR");
  selectBr.innerHTML =
    "<select id='indicatorsBR'>" +
    `${WORLDBANK["BRA"]["indicators"].map((indicator) => `
    <option value="${indicator["indicatorName"]}"> "${indicator["indicatorName"]}" </option>
  `)}` + "</select>";

  let SelectPER = document.getElementById("indicatorsPER");
  SelectPER.innerHTML =
    "<select id='indicatorsPER'>" +
    `${WORLDBANK["PER"]["indicators"].map((indicator) => `
    <option value="${indicator["indicatorName"]}"> "${indicator["indicatorName"]}" </option>
  `)}` + "</select>";

}

function chartIndicators() {
  
  let campSelect = document.getElementById("indicators");
  let publicIndicator = document.getElementById("indicatorName");
  publicIndicator.textContent = campSelect.value;
  
  let chartBr = document.getElementById("chartBR");
  chartBr.innerHTML = "<div id='showChartBR' style='height: 200px;'></div>";
  let chartPer = document.getElementById("chartPER");
  chartPer.innerHTML = "<div id='showChartPER' style='height: 200px;'></div>";

  google.charts.load('current', { 'packages': ['corechart'] });
  google.charts.setOnLoadCallback(chartIndicatorBR);
  google.charts.setOnLoadCallback(chartIndicatorPER);
}


function chartIndicatorBR() {
  let campSelect = document.getElementById("indicators");
  let filterBR = WORLDBANK["BRA"]["indicators"].filter((index) =>
    index["indicatorName"] === campSelect.value);

  let valueBR = [];
  for (let i = 2015; i <= 2017; i++) {
    let valor = parseFloat(filterBR.map((index) => index["data"][i]).join("[]"));

    if (valor != 0) {
      valueBR.push(valor)
    } else {
      valueBR.push(0)
    }
  }

  let data = google.visualization.arrayToDataTable([
    ['Brasil', '2015', '2016', '2017'],
    ['Ano', valueBR[0], valueBR[1], valueBR[2]]
  ]);

  let options = {
    title: 'BRASIL',
    vAxis: { title: 'Indicadores' },
    hAxis: { title: '' },
    seriesType: 'bars',
    series: { 3: { type: 'line' } }
  };

  let chart = new google.visualization.ComboChart(document.getElementById('chartBR'));
  chart.draw(data, options);
}


function chartIndicatorPER() {
  let campSelect = document.getElementById("indicators");

  let filterPER = WORLDBANK["PER"]["indicators"].filter((index) =>
    index["indicatorName"] === campSelect.value);

  var valuePER = [];
  for (let i = 2015; i <= 2017; i++) {
    let valor = parseFloat(filterPER.map((index) => index["data"][i]).join("[]"));

    if (valor != 0) {
      valuePER.push(valor)
    } else {
      valuePER.push(0)
    }
  }

  let data = google.visualization.arrayToDataTable([
    ['Perú', '2015', '2016', '2017'],
    ['Ano', valuePER[0], valuePER[1], valuePER[2]]
  ]);

  let options = {
    title: 'PERU',
    vAxis: { title: 'Indicadores' },
    hAxis: { title: '' },
    seriesType: 'bars',
    series: { 3: { type: 'line' } }
  };

  let chart = new google.visualization.ComboChart(document.getElementById('chartPER'));
  chart.draw(data, options);
}


