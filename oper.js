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

  const media = mediaAritmetica(valores).toFixed(2);
  const med = mediana(valores).toFixed(2);
  const modaResult = moda(valores).join(", ") || "Nenhuma (todos os valores têm mesma frequência)";
  const geo = mediaGeometrica(valores).toFixed(2);
  const harm = mediaHarmonica(valores).toFixed(2);
  const aparada = mediaAparada(valores, porcentagem).toFixed(2);

  document.getElementById("resultado").innerHTML = `
  <strong>Resultados:</strong><br><br>

  \\[ \\text{Média Aritmética: } \\bar{x} = \\frac{\\sum x_i}{n} = ${media} \\]

  \\[ \\text{Mediana: valor central dos dados ordenados} = ${med} \\]

  \\[ \\text{Moda: valor(es) mais frequente(s)} = ${modaResult} \\]

  \\[ \\text{Média Geométrica: } G = \\sqrt[${valores.length}]{${valores.join(' \\cdot ')}} = ${geo} \\]

  \\[ \\text{Média Harmônica: } H = \\frac{${valores.length}}{${valores.map(v => `(1/${v})`).join(' + ')}} = ${harm} \\]

  \\[ \\text{Média Aparada (${porcentagem}\\%): } \\bar{x}_t = ${aparada} \\]
`;

if (window.MathJax) {
  MathJax.typesetPromise();
}

// Força o MathJax a processar o novo conteúdo
if (window.MathJax) {
  MathJax.typesetPromise();
}

}
