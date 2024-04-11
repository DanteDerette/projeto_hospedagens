var banco_de_dados = SpreadsheetApp.openById("1dnNb_L3LhHN25Cxa-nTnf7hiPf1EQutEfLiHTvsSa1Y")

function salvar_prestador(obj_para_lancar) {
  if(obj_para_lancar['id'] == ''){
    incluir_prestador(obj_para_lancar)
  } else {
    alterar_prestador(obj_para_lancar)
  }
}

function incluir_prestador(obj_para_lancar){
  obj_para_lancar['id'] = acha_maior_ID('prestadores')
  var aba_prestador = banco_de_dados.getSheetByName("prestadores")
  var ultima_linha = aba_prestador.getLastRow() + 1

  var cabecalho = aba_prestador.getRange(1,1,1,aba_prestador.getLastColumn()).getValues()[0]
  var dados_organizados = organizar_acordo_cabecalho(cabecalho, obj_para_lancar)

  aba_prestador.getRange(ultima_linha,1,1,2).setValues([dados_organizados])
}

function alterar_prestador(obj_para_lancar){
  var aba_prestador = banco_de_dados.getSheetByName("prestadores")
  var ultima_linha = aba_prestador.getLastRow()
  var ultima_coluna = aba_prestador.getLastColumn()
  var todos_os_dados = aba_prestador.getRange(1,1, ultima_linha, ultima_coluna).getValues()
  

  var cabecalho = aba_prestador.getRange(1,1,1,aba_prestador.getLastColumn()).getValues()[0]
  
  var dados_organizados = organizar_acordo_cabecalho(cabecalho, obj_para_lancar)
  

  for(var i = 0; i < todos_os_dados.length;i++){
    if(todos_os_dados[i][0] == obj_para_lancar['id']){
      
      aba_prestador.getRange(i+1, 1, 1, todos_os_dados[i].length).setValues([dados_organizados])
    }
  }
}


function ler_todas_as_prestadores(){
  var aba_prestador = banco_de_dados.getSheetByName("prestadores")
  var ultima_linha = aba_prestador.getLastRow()
  var ultima_coluna = aba_prestador.getLastColumn()
  var todos_os_dados = aba_prestador.getRange(1, 1, ultima_linha, ultima_coluna).getValues()
  todos_os_dados = JSON.stringify(todos_os_dados)
  return todos_os_dados
}

function ler_prestador_especifica(id){
  var aba_prestador = banco_de_dados.getSheetByName("prestadores")
  var ultima_linha = aba_prestador.getLastRow()
  var ultima_coluna = aba_prestador.getLastColumn()
  var todos_os_dados = aba_prestador.getRange(1, 1, ultima_linha, ultima_coluna).getValues()
  
  for(var i = 0; i < todos_os_dados.length;i++){
    if(todos_os_dados[i][0] == id){
      return todos_os_dados[i]
    }
  }
}