function parseNumeros() {
  const input = document.getElementById("numeros").value;
  return input
    .split(",")
    .map(v => parseFloat(v.trim()))
    .filter(v => !isNaN(v));
}

function mediaAritmetica(valores) {
  const soma = valores.reduce((acc, val) => acc + val, 0);
  return soma / valores.length;
}

function mediana(valores) {
  const ordenados = [...valores].sort((a, b) => a - b);
  const meio = Math.floor(ordenados.length / 2);
  if (ordenados.length % 2 === 0) {
    return (ordenados[meio - 1] + ordenados[meio]) / 2;
  }
  return ordenados[meio];
}

function moda(valores) {
  const freq = {};
  valores.forEach(v => freq[v] = (freq[v] || 0) + 1);
  const maxFreq = Math.max(...Object.values(freq));
  const modas = Object.keys(freq)
    .filter(k => freq[k] === maxFreq)
    .map(Number);

  return modas.length === valores.length ? [] : modas;
}

function mediaGeometrica(valores) {
  const produto = valores.reduce((acc, val) => acc * val, 1);
  return Math.pow(produto, 1 / valores.length);
}

function mediaHarmonica(valores) {
  const inversos = valores.map(v => 1 / v);
  const somaInversos = inversos.reduce((acc, val) => acc + val, 0);
  return valores.length / somaInversos;
}

function mediaAparada(valores, porcentagem = 10) {
  const p = Math.max(0, Math.min(50, porcentagem)) / 100;
  const ordenados = [...valores].sort((a, b) => a - b);
  const n = valores.length;
  const cortar = Math.floor(n * p);

  if (n < 4 || cortar * 2 >= n) {
    return mediaAritmetica(valores); // Evita erro com listas muito pequenas
  }

  const cortados = ordenados.slice(cortar, n - cortar);
  return mediaAritmetica(cortados);
}

function mostrarResultados() {
  const valores = parseNumeros();
  if (valores.length === 0) {
    document.getElementById("resultado").innerText = "Insira números válidos.";
    return;
  }

  const porcentagemInput = parseFloat(document.getElementById("porcentagem").value);
  const porcentagem = (!isNaN(porcentagemInput) && porcentagemInput >= 0 && porcentagemInput <= 50)
    ? porcentagemInput
    : 10;

  const media = mediaAritmetica(valores);
  const med = mediana(valores);
  const modaResult = moda(valores);
  const geo = mediaGeometrica(valores);
  const harm = mediaHarmonica(valores);
  const aparada = mediaAparada(valores, porcentagem);

  const erroMedio = valores.reduce((acc, x) => acc + Math.abs(x - media), 0) / valores.length;
  const varianciaPop = valores.reduce((acc, x) => acc + Math.pow(x - media, 2), 0) / valores.length;
  const varianciaAmostra = valores.reduce((acc, x) => acc + Math.pow(x - media, 2), 0) / (valores.length - 1);
  const desvioPadraoPop = Math.sqrt(varianciaPop);
  const desvioPadraoAmostra = Math.sqrt(varianciaAmostra);

  // Frequência relativa
  const total = valores.length;
  const freqMap = {};
  valores.forEach(v => {
    freqMap[v] = (freqMap[v] || 0) + 1;
  });

  let tabelaFreq = "<table border='1' style='margin-top:20px'><tr><th>Valor</th><th>Frequência Absoluta</th><th>Frequência Relativa (%)</th></tr>";
  Object.entries(freqMap).forEach(([valor, freq]) => {
    const rel = ((freq / total) * 100).toFixed(2);
    tabelaFreq += `<tr><td>${valor}</td><td>${freq}</td><td>${rel}%</td></tr>`;
  });
  tabelaFreq += "</table>";

  document.getElementById("resultado").innerHTML = `
    <strong>Resultados:</strong><br><br>

    \\[ \\text{Média Aritmética: } \\bar{x} = \\frac{\\sum x_i}{n} = ${media.toFixed(2)} \\]
    \\[ \\text{Mediana: valor central dos dados ordenados} = ${med.toFixed(2)} \\]
    \\[ \\text{Moda: valor(es) mais frequente(s)} = ${modaResult.length ? modaResult.join(", ") : "Nenhuma"} \\]
    \\[ \\text{Média Geométrica: } G = \\sqrt[${valores.length}]{${valores.join(" \\cdot ")}} = ${geo.toFixed(2)} \\]
    \\[ \\text{Média Harmônica: } H = \\frac{${valores.length}}{${valores.map(v => `(1/${v})`).join(" + ")}} = ${harm.toFixed(2)} \\]
    \\[ \\text{Média Aparada (${porcentagem}\\%): } \\bar{x}_t = ${aparada.toFixed(2)} \\]
    \\[ \\text{Erro Médio Absoluto: } EMA = \\frac{1}{n} \\sum |x_i - \\bar{x}| = ${erroMedio.toFixed(2)} \\]
    \\[ \\text{Variância Populacional: } \\sigma^2 = ${varianciaPop.toFixed(2)} \\]
    \\[ \\text{Variância Amostral: } s^2 = ${varianciaAmostra.toFixed(2)} \\]
    \\[ \\text{Desvio Padrão Populacional: } \\sigma = ${desvioPadraoPop.toFixed(2)} \\]
    \\[ \\text{Desvio Padrão Amostral: } s = ${desvioPadraoAmostra.toFixed(2)} \\]

    <br><strong>Frequência Relativa:</strong><br>
    ${tabelaFreq}
  `;

  if (window.MathJax) {
    MathJax.typesetPromise();
  }
}
