window.onload = function () {
  listIndicator();
};

window.onbeforeunload = function () {
  window.scrollTo(0, 0);
}

document.getElementById("btnGo").addEventListener("click", chartIndicators);
document.getElementById("btnBR").addEventListener("click", chartBR);
document.getElementById("btnPER").addEventListener("click", chartPER);
document.getElementById("btnCHL").addEventListener("click", chartCHL);

let campSelect = document.getElementById("indicators")

function listIndicator() {
  campSelect.innerHTML =
    "<select id='indicator'>" +
    `${WORLDBANK["BRA"]["indicators"].map((indicator) => `
    <option value='${indicator["indicatorName"]}'> ${indicator["indicatorName"]} </option>
  `)}` + "</select>";

  let SelectBR = document.getElementById("indicatorsBR");
  SelectBR.innerHTML =
    "<select id='indicatorsBR'>" +
    `${WORLDBANK["BRA"]["indicators"].map((indicator) => `
    <option value='${indicator["indicatorName"]}'> ${indicator["indicatorName"]} </option>
  `)}` + "</select>";

  let SelectPER = document.getElementById("indicatorsPER");
  SelectPER.innerHTML =
    "<select id='indicatorsPER'>" +
    `${WORLDBANK["PER"]["indicators"].map((indicator) => `
    <option value='${indicator["indicatorName"]}'> ${indicator["indicatorName"]} </option>
  `)}` + "</select>";

  let SelectCHL = document.getElementById("indicatorsCHL");
  SelectCHL.innerHTML =
    "<select id='indicatorsCHL'>" +
    `${WORLDBANK["CHL"]["indicators"].map((indicator) => `
    <option value='${indicator["indicatorName"]}'> ${indicator["indicatorName"]} </option>
  `)}` + "</select>";

}

function chartIndicators() {
  let publicIndicator = document.getElementById("indicatorName");
  publicIndicator.textContent = campSelect.value;
  let chart = document.getElementById("chart");
  chart.innerHTML = "<div id='chart' style='height: 200px;'></div>";
  google.charts.load('current', { 'packages': ['corechart'] });
  google.charts.setOnLoadCallback(showChart);
}


function showChart() {
  let filterBr = WORLDBANK["BRA"]["indicators"].filter((index) =>
    index["indicatorName"] === campSelect.value);
  let filtroPer = WORLDBANK["PER"]["indicators"].filter((index) =>
    index["indicatorName"] === campSelect.value);
  let filtroChl = WORLDBANK["CHL"]["indicators"].filter((index) =>
    index["indicatorName"] === campSelect.value);

  let valueBR = [];
  for (let year = 2015; year <= 2017; year++) {
    valueBR.push(Number(filterBr.map((index) => index["data"][year]).join("[]")));
  }

  let valuePER = [];
  for (let year = 2015; year <= 2017; year++) {
    valuePER.push(Number(filtroPer.map((index) => index["data"][year]).join("[]")));
  }

  let valueCHL = [];
  for (let year = 2015; year <= 2017; year++) {
    valueCHL.push(Number(filtroChl.map((index) => index["data"][year]).join("[]")));
  }

  let avanege = [];
  for (index in valueBR) {
    if (valueBR[index] === 0 && valuePER[index] === 0) {
      avanege.push(valueCHL[index]);
    } else if (valueBR[index] === 0 && valueCHL[index] === 0) {
      avanege.push(valuePER[index]);
    } else if (valuePER[index] === 0 && valueCHL[index] === 0) {
      avanege.push(valueBR[index]);
    } else if (valueBR[index] === 0) {
      avanege.push((valuePER[index] + valueCHL[index]) / 2);
    } else if (valuePER[index] === 0) {
      avanege.push((valueBR[index] + valueCHL[index]) / 2);
    } else if (valueCHL[index] === 0) {
      avanege.push((valueBR[index] + valuePER[index]) / 2);
    } else {
      avanege.push((valueBR[index] + valuePER[index] + valueCHL[index]) / 3)
    }

  }

  let data = google.visualization.arrayToDataTable([
    ['País', 'Brasil', 'Perú', 'Chile', 'Média'],
    ['2015', valueBR[0], valuePER[0], valueCHL[0], avanege[0]],
    ['2016', valueBR[1], valuePER[1], valueCHL[1], avanege[1]],
    ['2017', valueBR[2], valuePER[2], valueCHL[2], avanege[2]],
  ]);


  let options = {
    title: campSelect.value,
    vAxis: { title: '% Indicador' },
    hAxis: { title: 'Ano' },
    seriesType: 'bars',
    series: { 3: { type: 'line' } }
  };

  let chart = new google.visualization.ComboChart(document.getElementById('chart'));
  chart.draw(data, options);
}

function chartBR() {
  let chartBR = document.getElementById("chartBR");
  chartBR.innerHTML = "<div id='chartBR' style='height: 200px;'></div>";
  google.charts.load('current', { 'packages': ['corechart'] });
  google.charts.setOnLoadCallback(showChartBR);
}

function showChartBR() {
  let indicator = document.getElementById("indicatorsBR")
  let filterBr = WORLDBANK["BRA"]["indicators"].filter((index) =>
    index["indicatorName"] === indicator.value);

  let valueBR = [];
  for (let year = 2015; year <= 2017; year++) {
    valueBR.push(Number(filterBr.map((index) => index["data"][year]).join("[]")));
  }

  let contador = 0;
  for (index of valueBR) {
    if (index != 0) {
      contador++;
    }
  }

  let inicial = 0;
  let avarege = (valueBR.reduce((soma, atual) => soma + atual, inicial) / contador);

  let data = google.visualization.arrayToDataTable([
    ['Ano', '2015', '2016', '2017', 'Média'],
    ['Brasil', valueBR[0], valueBR[1], valueBR[2], avarege],
  ]);


  let options = {
    title: indicator.value,
    vAxis: { title: '% Indicador' },
    hAxis: { title: 'País' },
    seriesType: 'bars',
    series: { 3: { type: 'line' } }
  };

  let chart = new google.visualization.ComboChart(document.getElementById('chartBR'));
  chart.draw(data, options);
}

function chartPER (){
  let chartPER = document.getElementById("chartPER");
  chartPER.innerHTML = "<div id='chartPER' style='height: 200px;'></div>";
  google.charts.load('current', { 'packages': ['corechart'] });
  google.charts.setOnLoadCallback(showChartPER);
}

function showChartPER (){
  let indicator = document.getElementById("indicatorsPER")
  let filterPer = WORLDBANK["PER"]["indicators"].filter((index) =>
  index["indicatorName"] === indicator.value);

  let valuePER = [];
  for (let year = 2015; year <= 2017; year++) {
    valuePER.push(Number(filterPer.map((index) => index["data"][year]).join("[]")));
  }

  let contador = 0;
  for (index of valuePER){
    if (index != 0){
      contador++;
    }
  }

  let inicial = 0;
  let avarege = (valuePER.reduce((soma, atual) => soma + atual, inicial) / contador);

  let data = google.visualization.arrayToDataTable([
    ['Ano', '2015', '2016', '2017', 'Média'],
    ['Perú', valuePER[0], valuePER[1], valuePER[2], avarege],
  ]);


  let options = {
    title: indicator.value,
    vAxis: { title: '% Indicador' },
    hAxis: { title: 'País' },
    seriesType: 'bars',
    series: { 3: { type: 'line' } }
  };

  let chart = new google.visualization.ComboChart(document.getElementById('chartPER'));
  chart.draw(data, options);
}

function chartCHL (){
  let chartCHL = document.getElementById("chartCHL");
  chartCHL.innerHTML = "<div id='chartCHL' style='height: 200px;'></div>";
  google.charts.load('current', { 'packages': ['corechart'] });
  google.charts.setOnLoadCallback(showChartCHL);
}

function showChartCHL (){
  let indicator = document.getElementById("indicatorsCHL")
  let filterChl = WORLDBANK["CHL"]["indicators"].filter((index) =>
  index["indicatorName"] === indicator.value);

  let valueCHL = [];
  for (let year = 2015; year <= 2017; year++) {
    valueCHL.push(Number(filterChl.map((index) => index["data"][year]).join("[]")));
  }

  let contador = 0;
  for (index of valueCHL){
    if (index != 0){
      contador++;
    }
  }

  let inicial = 0;
  let avarege = (valueCHL.reduce((soma, atual) => soma + atual, inicial) / contador);

  let data = google.visualization.arrayToDataTable([
    ['Ano', '2015', '2016', '2017', 'Média'],
    ['Chile', valueCHL[0], valueCHL[1], valueCHL[2], avarege],
  ]);


  let options = {
    title: indicator.value,
    vAxis: { title: '% Indicador' },
    hAxis: { title: 'País' },
    seriesType: 'bars',
    series: { 3: { type: 'line' } }
  };

  let chart = new google.visualization.ComboChart(document.getElementById('chartCHL'));
  chart.draw(data, options);
}

