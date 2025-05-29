// Calcula probabilidade simples
function probabilidadeSimples(favoraveis, possiveis) {
  return favoraveis / possiveis;
}

// Probabilidade aditiva: P(A ∪ B) = P(A) + P(B) − P(A ∩ B)
function probabilidadeAditiva(pA, pB, pIntersecao) {
  return pA + pB - pIntersecao;
}

// Probabilidade condicional: P(A|B) = P(A ∩ B) / P(B)
function probabilidadeCondicional(pIntersecao, pB) {
  return pIntersecao / pB;
}

// Regra de Bayes: P(A|B) = [P(B|A) * P(A)] / P(B)
function regraDeBayes(pBA, pA, pB) {
  return (pBA * pA) / pB;
}

// Função que captura os dados do HTML e mostra os resultados
function calcularProbabilidades() {
  const fav = parseFloat(document.getElementById("favoraveis").value);
  const poss = parseFloat(document.getElementById("possiveis").value);
  const pA = parseFloat(document.getElementById("pa").value);
  const pB = parseFloat(document.getElementById("pb").value);
  const pAB = parseFloat(document.getElementById("paeb").value);
  const pBA = parseFloat(document.getElementById("pba").value);

  let saida = "";

  // Probabilidade Simples
  if (!isNaN(fav) && !isNaN(poss) && poss !== 0) {
    const pSimples = probabilidadeSimples(fav, poss).toFixed(4);
    saida += `📌 Probabilidade Simples: P = ${pSimples}\n`;
  }

  // Probabilidade Aditiva e Condicional
  if (!isNaN(pA) && !isNaN(pB) && !isNaN(pAB) && pB !== 0) {
    const pUniao = probabilidadeAditiva(pA, pB, pAB).toFixed(4);
    const pCondicional = probabilidadeCondicional(pAB, pB).toFixed(4);
    saida += `📌 Probabilidade Aditiva: P(A ∪ B) = ${pUniao}\n`;
    saida += `📌 Probabilidade Condicional: P(A|B) = ${pCondicional}\n`;
  }

  // Regra de Bayes
  if (!isNaN(pBA) && !isNaN(pA) && !isNaN(pB) && pB !== 0) {
    const pBayes = regraDeBayes(pBA, pA, pB).toFixed(4);
    saida += `📌 Regra de Bayes: P(A|B) = ${pBayes}\n`;
  }

  // Mostra resultados ou aviso
  document.getElementById("saida").innerText = saida || "⚠️ Preencha os campos necessários.";
}
