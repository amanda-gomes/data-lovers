window.onload = function () {
  listIndicator();
}

window.onbeforeunload = function () {
  window.scrollTo(0, 0);
}

document.getElementById("btnGo").addEventListener("click", chartIndicators);
document.getElementById("btnBR").addEventListener("click", chartBR);
document.getElementById("btnPER").addEventListener("click", chartPER);
document.getElementById("btnCHL").addEventListener("click", chartCHL);
document.getElementById("backInd").addEventListener("click", clean);
document.getElementById("backBR").addEventListener("click", clean);
document.getElementById("backPER").addEventListener("click", clean);
document.getElementById("backCHL").addEventListener("click", clean);
document.getElementById("btnIndicator").addEventListener("click", pageIndicator);
document.getElementById("BR").addEventListener("click", pageBrasil);
document.getElementById("PER").addEventListener("click", pagePeru);
document.getElementById("CHL").addEventListener("click", pageChile);

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

  let average = [];
  for (index in valueBR) {
    if (valueBR[index] === 0 && valuePER[index] === 0) {
      average.push(valueCHL[index]);
    } else if (valueBR[index] === 0 && valueCHL[index] === 0) {
      average.push(valuePER[index]);
    } else if (valuePER[index] === 0 && valueCHL[index] === 0) {
      average.push(valueBR[index]);
    } else if (valueBR[index] === 0) {
      average.push((valuePER[index] + valueCHL[index]) / 2);
    } else if (valuePER[index] === 0) {
      average.push((valueBR[index] + valueCHL[index]) / 2);
    } else if (valueCHL[index] === 0) {
      average.push((valueBR[index] + valuePER[index]) / 2);
    } else {
      average.push((valueBR[index] + valuePER[index] + valueCHL[index]) / 3)
    }
  }

  let data = google.visualization.arrayToDataTable([
    ['Ano', 'Brasil', 'Perú', 'Chile', 'Média'],
    ['2015', valueBR[0], valuePER[0], valueCHL[0], average[0]],
    ['2016', valueBR[1], valuePER[1], valueCHL[1], average[1]],
    ['2017', valueBR[2], valuePER[2], valueCHL[2], average[2]],
  ]);


  let options = {
    title: campSelect.value,
    vAxis: { title: '% Indicador' },
    seriesType: 'bars',
    series: { 3: { type: 'line' } }
  };

  let chart = new google.visualization.ComboChart(document.getElementById('chart'));
  chart.draw(data, options);
}

function chartBR() {
  let chartBR = document.getElementById("chartBR");
  chartBR.innerHTML = "<div id='chartBR' style='height: 200px;'></div>";
  google.charts.load('current', { packages: ['corechart', 'bar'] });
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
  let average = (valueBR.reduce((soma, atual) => soma + atual, inicial) / contador);

  let data = google.visualization.arrayToDataTable([
    ['Ano', 'Brasil'],
    ['2015', valueBR[0]],
    ['2016', valueBR[1]],
    ['2017', valueBR[2]],
    ['Média', average],
  ]);

  let options = {
    title: indicator.value,
    chartArea: { width: '50%' },
    isStacked: true,
    hAxis: {
      title: 'Brasil',
      minValue: 0,
    },
    vAxis: {
      title: 'Ano'
    }
  };

  let chart = new google.visualization.BarChart(document.getElementById('chartBR'));
  chart.draw(data, options);
}


function chartPER() {
  let chartPER = document.getElementById("chartPER");
  chartPER.innerHTML = "<div id='chartPER' style='height: 200px;'></div>";
  google.charts.load('current', { packages: ['corechart', 'bar'] });
  google.charts.setOnLoadCallback(showChartPER);
}

function showChartPER() {
  let indicator = document.getElementById("indicatorsPER")
  let filterPer = WORLDBANK["PER"]["indicators"].filter((index) =>
    index["indicatorName"] === indicator.value);

  let valuePER = [];
  for (let year = 2015; year <= 2017; year++) {
    valuePER.push(Number(filterPer.map((index) => index["data"][year]).join("[]")));
  }

  let contador = 0;
  for (index of valuePER) {
    if (index != 0) {
      contador++;
    }
  }

  let inicial = 0;
  let average = (valuePER.reduce((soma, atual) => soma + atual, inicial) / contador);

  let data = google.visualization.arrayToDataTable([
    ['Ano', 'Peru'],
    ['2015', valuePER[0]],
    ['2016', valuePER[1]],
    ['2017', valuePER[2]],
    ['Média', average],
  ]);

  let options = {
    title: indicator.value,
    chartArea: { width: '50%' },
    isStacked: true,
    hAxis: {
      title: 'Peru',
      minValue: 0,
    },
    vAxis: {
      title: 'Ano'
    }
  };
  let chart = new google.visualization.BarChart(document.getElementById('chartPER'));
  chart.draw(data, options);
}

function chartCHL() {
  let chartCHL = document.getElementById("chartCHL");
  chartCHL.innerHTML = "<div id='chartCHL' style='height: 200px;'></div>";
  google.charts.load('current', { packages: ['corechart', 'bar'] });
  google.charts.setOnLoadCallback(showChartCHL);
}

function showChartCHL() {
  let indicator = document.getElementById("indicatorsCHL")
  let filterChl = WORLDBANK["CHL"]["indicators"].filter((index) =>
    index["indicatorName"] === indicator.value);

  let valueCHL = [];
  for (let year = 2015; year <= 2017; year++) {
    valueCHL.push(Number(filterChl.map((index) => index["data"][year]).join("[]")));
  }

  let contador = 0;
  for (index of valueCHL) {
    if (index != 0) {
      contador++;
    }
  }

  let inicial = 0;
  let average = (valueCHL.reduce((soma, atual) => soma + atual, inicial) / contador);

  let data = google.visualization.arrayToDataTable([
    ['Ano', 'Chile'],
    ['2015', valueCHL[0]],
    ['2016', valueCHL[1]],
    ['2017', valueCHL[2]],
    ['Média', average],
  ]);

  let options = {
    title: indicator.value,
    chartArea: { width: '50%' },
    isStacked: true,
    hAxis: {
      title: 'Chile',
      minValue: 0,
    },
    vAxis: {
      title: 'Ano'
    }
  };
  let chart = new google.visualization.BarChart(document.getElementById('chartCHL'));
  chart.draw(data, options);
}

function clean() {
  document.getElementById("pageIndicator").style.visibility = 'hidden';
  document.getElementById("pageBrasil").style.visibility = 'hidden';
  document.getElementById("pagePeru").style.visibility = 'hidden';
  document.getElementById("pageChile").style.visibility = 'hidden';
  let indicatorName = document.getElementById("indicatorName");
  let chart = document.getElementById("chart");
  let chartBR = document.getElementById("chartBR");
  let chartPER = document.getElementById("chartPER");
  let chartCHL = document.getElementById("chartCHL");
  indicatorName.textContent = "";
  chart.textContent = "";
  chartBR.textContent = "";
  chartPER.textContent = "";
  chartCHL.textContent = "";
}

function pageIndicator() {
  document.getElementById("pageIndicator").style.visibility = 'visible';
}

function pageBrasil() {
  document.getElementById("pageBrasil").style.visibility = 'visible';
}

function pagePeru() {
  document.getElementById("pagePeru").style.visibility = 'visible';
}

function pageChile() {
  document.getElementById("pageChile").style.visibility = 'visible';
}