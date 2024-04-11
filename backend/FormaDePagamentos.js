var banco_de_dados = SpreadsheetApp.openById("1dnNb_L3LhHN25Cxa-nTnf7hiPf1EQutEfLiHTvsSa1Y")

function salvar_formaDePagamento(obj_para_lancar) {
  if(obj_para_lancar['id'] == ''){
    incluir_formaDePagamento(obj_para_lancar)
  } else {
    alterar_formaDePagamento(obj_para_lancar)
  }
}

function incluir_formaDePagamento(obj_para_lancar){
  obj_para_lancar['id'] = acha_maior_ID('formaDePagamentos')
  var aba_formaDePagamento = banco_de_dados.getSheetByName("formaDePagamentos")
  var ultima_linha = aba_formaDePagamento.getLastRow() + 1

  var cabecalho = aba_formaDePagamento.getRange(1,1,1,aba_formaDePagamento.getLastColumn()).getValues()[0]
  var dados_organizados = organizar_acordo_cabecalho(cabecalho, obj_para_lancar)

  aba_formaDePagamento.getRange(ultima_linha,1,1,2).setValues([dados_organizados])
}

function alterar_formaDePagamento(obj_para_lancar){
  var aba_formaDePagamento = banco_de_dados.getSheetByName("formaDePagamentos")
  var ultima_linha = aba_formaDePagamento.getLastRow()
  var ultima_coluna = aba_formaDePagamento.getLastColumn()
  var todos_os_dados = aba_formaDePagamento.getRange(1,1, ultima_linha, ultima_coluna).getValues()
  

  var cabecalho = aba_formaDePagamento.getRange(1,1,1,aba_formaDePagamento.getLastColumn()).getValues()[0]
  
  var dados_organizados = organizar_acordo_cabecalho(cabecalho, obj_para_lancar)
  

  for(var i = 0; i < todos_os_dados.length;i++){
    if(todos_os_dados[i][0] == obj_para_lancar['id']){
      
      aba_formaDePagamento.getRange(i+1, 1, 1, todos_os_dados[i].length).setValues([dados_organizados])
    }
  }
}


function ler_todas_as_formaDePagamentos(){
  var aba_formaDePagamento = banco_de_dados.getSheetByName("formaDePagamentos")
  var ultima_linha = aba_formaDePagamento.getLastRow()
  var ultima_coluna = aba_formaDePagamento.getLastColumn()
  var todos_os_dados = aba_formaDePagamento.getRange(1, 1, ultima_linha, ultima_coluna).getValues()
  todos_os_dados = JSON.stringify(todos_os_dados)
  return todos_os_dados
}

function ler_formaDePagamento_especifica(id){
  var aba_formaDePagamento = banco_de_dados.getSheetByName("formaDePagamentos")
  var ultima_linha = aba_formaDePagamento.getLastRow()
  var ultima_coluna = aba_formaDePagamento.getLastColumn()
  var todos_os_dados = aba_formaDePagamento.getRange(1, 1, ultima_linha, ultima_coluna).getValues()
  
  for(var i = 0; i < todos_os_dados.length;i++){
    if(todos_os_dados[i][0] == id){
      return todos_os_dados[i]
    }
  }
}