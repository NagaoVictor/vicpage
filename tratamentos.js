function converterEspacos() {
  const entrada = document.getElementById("entradaEspacos").value.trim();
  const convertido = entrada.split(/\s+/).join(", ");
  document.getElementById("saidaVirgulas").value = convertido;
}