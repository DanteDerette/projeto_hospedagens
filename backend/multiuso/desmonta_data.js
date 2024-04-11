function desmonta_data(data_recebida) {
  var dia = data_recebida.slice(8, 12)
  var mes = parseInt(data_recebida.slice(5, 7))-1
  var ano = data_recebida.slice(0, 4)

  return {
    dia:dia,
    mes:mes,
    ano:ano
  }
}
