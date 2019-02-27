window.onload = function() {
  listarIndices();
};

document.getElementById("btnIr").addEventListener("click",graficosPorIndicador)

function listarIndices(){

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

function graficosPorIndicador(){
  let campoSelect = document.getElementById("indicadores");
  let campoPublicarIndicador = document.getElementById("indicadorName");
  campoPublicarIndicador.textContent = campoSelect.value;
  let publicarGraficos = document.getElementById("publicarGraficosIndicador");
  let filtro =   `${WORLDBANK["BRA"]["indicators"].filter((indicator) => 
  ` ${indicator["indicatorName"] === campoSelect.value}" `)}`;
  publicarGraficos.textContent = filtro;  

}

