// Dados de classificação de IMC
const data = [
  {
    min: 0, // Valor mínimo do IMC
    max: 18.4, // Valor máximo do IMC
    classification: "Menor que 18,5", // Classificação do IMC
    info: "Abaixo do peso", // Informação adicional sobre a classificação
    obesity: "0", // Grau de obesidade
  },
  {
    min: 18.5,
    max: 24.9,
    classification: "Entre 18,5 e 24,9",
    info: "Normal",
    obesity: "0",
  },
  {
    min: 25,
    max: 29.9,
    classification: "Entre 25,0 e 29,9",
    info: "Sobrepeso",
    obesity: "0",
  },
  {
    min: 30,
    max: 34.9,
    classification: "Entre 30,0 e 34,9",
    info: "Obesidade I (leve)",
    obesity: "I",
  },
  {
    min: 35,
    max: 39.9,
    classification: "Entre 35,0 e 39,9",
    info: "Obesidade II (severa)",
    obesity: "II",
  },
  {
    min: 40,
    max: 99,
    classification: "Maior que 40,0",
    info: "Obesidade III (mórbida)",
    obesity: "III",
  },
];

// Seleciona elementos do DOM
const imcTable = document.querySelector("#imc-table"); // Tabela de IMC
const heightInput = document.querySelector("#height"); // Campo de entrada de altura
const weightInput = document.querySelector("#weight"); // Campo de entrada de peso
const calcBtn = document.querySelector("#calc-btn"); // Botão de calcular
const clearBtn = document.querySelector("#clear-btn"); // Botão de limpar

const calcContainer = document.querySelector("#calc-container"); // Contêiner de cálculo
const resultContainer = document.querySelector("#result-container"); // Contêiner de resultado

const imcNumber = document.querySelector("#imc-number span"); // Número do IMC
const imcInfo = document.querySelector("#imc-info span"); // Informação do IMC

const backBtn = document.querySelector("#back-btn"); // Botão de voltar

// Cria a tabela de classificações de IMC
function createTable(data) {
  data.forEach((item) => {
    const div = document.createElement("div"); // Cria um div para cada item
    div.classList.add("table-data"); // Adiciona a classe "table-data"

    const classification = document.createElement("p"); // Cria um parágrafo para a classificação
    classification.innerText = item.classification; // Define o texto da classificação

    const info = document.createElement("p"); // Cria um parágrafo para a informação
    info.innerText = item.info; // Define o texto da informação

    const obesity = document.createElement("p"); // Cria um parágrafo para a obesidade
    obesity.innerText = item.obesity; // Define o texto da obesidade

    div.appendChild(classification); // Adiciona a classificação ao div
    div.appendChild(info); // Adiciona a informação ao div
    div.appendChild(obesity); // Adiciona a obesidade ao div

    imcTable.appendChild(div); // Adiciona o div à tabela de IMC
  });
}

// Limpa os campos de entrada e classes de resultado
function cleanInputs() {
  heightInput.value = ""; // Limpa o campo de altura
  weightInput.value = ""; // Limpa o campo de peso
  imcNumber.classList = ""; // Limpa as classes do número do IMC
  imcInfo.classList = ""; // Limpa as classes da informação do IMC
}

// Valida e formata os valores de entrada
function validDigits(text) {
  return text.replace(/[^0-9,]/g, ""); // Remove caracteres não numéricos, exceto vírgula
}

// Calcula o IMC com base no peso e altura
function calcImc(weight, height) {
  const imc = (weight / (height * height)).toFixed(1); // Calcula o IMC e arredonda para uma casa decimal
  return imc; // Retorna o IMC calculado
}

// Alterna a visibilidade dos contêineres de cálculo e resultado
function showOrHideResult() {
  calcContainer.classList.toggle("hide"); // Alterna a classe "hide" no contêiner de cálculo
  resultContainer.classList.toggle("hide"); // Alterna a classe "hide" no contêiner de resultado
}

// Cria a tabela de classificações de IMC
createTable(data); // Chama a função para criar a tabela de IMC

// Adiciona eventos de input para validar e formatar os valores de altura e peso
[heightInput, weightInput].forEach((el) => {
  el.addEventListener("input", (e) => {
    const updatedValue = validDigits(e.target.value); // Valida e formata o valor de entrada
    e.target.value = updatedValue; // Atualiza o valor de entrada
  });
});

// Adiciona evento de clique para calcular o IMC ao pressionar o botão de calcular
calcBtn.addEventListener("click", (e) => {
  e.preventDefault(); // Previne o comportamento padrão do botão

  const weight = +weightInput.value.replace(",", "."); // Converte o valor de peso para número
  const height = +heightInput.value.replace(",", "."); // Converte o valor de altura para número

  if (!weight || !height) return; // Verifica se os valores são válidos

  const imc = calcImc(weight, height); // Calcula o IMC

  let info; // Variável para armazenar a informação do IMC

  data.forEach((item) => {
    if (imc >= item.min && imc <= item.max) {
      info = item.info; // Define a informação do IMC com base na classificação
    }
  });

  if (!info) return; // Verifica se a informação do IMC é válida

  imcNumber.innerText = imc; // Atualiza o texto do número do IMC
  imcInfo.innerText = info; // Atualiza o texto da informação do IMC

  switch (info) {
    case "Abaixo do peso":
      imcNumber.classList.add("low"); // Adiciona a classe "low" ao número do IMC
      imcInfo.classList.add("low"); // Adiciona a classe "low" à informação do IMC
      break;
    case "Normal":
      imcNumber.classList.add("good"); // Adiciona a classe "good" ao número do IMC
      imcInfo.classList.add("good"); // Adiciona a classe "good" à informação do IMC
      break;
    case "Sobrepeso":
      imcNumber.classList.add("low"); // Adiciona a classe "low" ao número do IMC
      imcInfo.classList.add("low"); // Adiciona a classe "low" à informação do IMC
      break;
    case "Obesidade I (leve)":
      imcNumber.classList.add("medium"); // Adiciona a classe "medium" ao número do IMC
      imcInfo.classList.add("medium"); // Adiciona a classe "medium" à informação do IMC
      break;
    case "Obesidade II (severa)":
      imcNumber.classList.add("high"); // Adiciona a classe "high" ao número do IMC
      imcInfo.classList.add("high"); // Adiciona a classe "high" à informação do IMC
      break;
    case "Obesidade III (mórbida)":
      imcNumber.classList.add("very-high"); // Adiciona a classe "very-high" ao número do IMC
      imcInfo.classList.add("very-high"); // Adiciona a classe "very-high" à informação do IMC
      break;
  }

  showOrHideResult(); // Alterna a visibilidade dos contêineres de cálculo e resultado
});

// Adiciona evento de clique para limpar os campos de entrada ao pressionar o botão de limpar
clearBtn.addEventListener("click", (e) => {
  e.preventDefault(); // Previne o comportamento padrão do botão
  cleanInputs(); // Chama a função para limpar os campos de entrada
});

// Adiciona evento de clique para voltar ao formulário de cálculo ao pressionar o botão de voltar
backBtn.addEventListener("click", () => {
  showOrHideResult(); // Alterna a visibilidade dos contêineres de cálculo e resultado
  cleanInputs(); // Chama a função para limpar os campos de entrada
});
