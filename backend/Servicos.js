var banco_de_dados = SpreadsheetApp.openById("1dnNb_L3LhHN25Cxa-nTnf7hiPf1EQutEfLiHTvsSa1Y")

function salvar_servico(obj_para_lancar) {
  if(obj_para_lancar['id'] == ''){
    incluir_servico(obj_para_lancar)
  } else {
    alterar_servico(obj_para_lancar)
  }
}

function incluir_servico(obj_para_lancar){
  obj_para_lancar['id'] = acha_maior_ID('servicos')
  var aba_servico = banco_de_dados.getSheetByName("servicos")
  var ultima_linha = aba_servico.getLastRow() + 1

  var cabecalho = aba_servico.getRange(1,1,1,aba_servico.getLastColumn()).getValues()[0]
  var dados_organizados = organizar_acordo_cabecalho(cabecalho, obj_para_lancar)

  aba_servico.getRange(ultima_linha,1,1,3).setValues([dados_organizados])
}

function alterar_servico(obj_para_lancar){
  var aba_servico = banco_de_dados.getSheetByName("servicos")
  var ultima_linha = aba_servico.getLastRow()
  var ultima_coluna = aba_servico.getLastColumn()
  var todos_os_dados = aba_servico.getRange(1,1, ultima_linha, ultima_coluna).getValues()
  
  var cabecalho = aba_servico.getRange(1,1,1,aba_servico.getLastColumn()).getValues()[0]
  
  var dados_organizados = organizar_acordo_cabecalho(cabecalho, obj_para_lancar)
  

  for(var i = 0; i < todos_os_dados.length;i++){
    if(todos_os_dados[i][0] == obj_para_lancar['id']){
      
      aba_servico.getRange(i+1, 1, 1, todos_os_dados[i].length).setValues([dados_organizados])
    }
  }
}


function ler_todas_as_servicos(){
  var aba_servico = banco_de_dados.getSheetByName("servicos")
  var ultima_linha = aba_servico.getLastRow()
  var ultima_coluna = aba_servico.getLastColumn()
  var todos_os_dados = aba_servico.getRange(1, 1, ultima_linha, ultima_coluna).getValues()
  todos_os_dados = JSON.stringify(todos_os_dados)
  return todos_os_dados
}

function ler_servico_especifica(id){
  var aba_servico = banco_de_dados.getSheetByName("servicos")
  var ultima_linha = aba_servico.getLastRow()
  var ultima_coluna = aba_servico.getLastColumn()
  var todos_os_dados = aba_servico.getRange(1, 1, ultima_linha, ultima_coluna).getValues()
  
  for(var i = 0; i < todos_os_dados.length;i++){
    if(todos_os_dados[i][0] == id){
      return todos_os_dados[i]
    }
  }
}