function organizar_acordo_cabecalho(cabecalho, paraLancar){
  var lista_para_lancar = []
  cabecalho.forEach(() =>{
    lista_para_lancar.push('')
  })
  for (const [key, value] of Object.entries(paraLancar)) {
    lista_para_lancar[cabecalho.indexOf(key)] = value
  }
  return lista_para_lancar
} 