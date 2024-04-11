var banco_de_dados = SpreadsheetApp.openById("1dnNb_L3LhHN25Cxa-nTnf7hiPf1EQutEfLiHTvsSa1Y")



function salvar_produto(obj_para_lancar) {
  if(obj_para_lancar['id'] == ''){
    incluir_produto(obj_para_lancar)
  } else {
    alterar_produto(obj_para_lancar)
  }
}

function incluir_produto(obj_para_lancar){
  obj_para_lancar['id'] = acha_maior_ID('produtos')
  var aba_produto = banco_de_dados.getSheetByName("produtos")
  var ultima_linha = aba_produto.getLastRow() + 1

  var cabecalho = aba_produto.getRange(1,1,1,aba_produto.getLastColumn()).getValues()[0]
  var dados_organizados = organizar_acordo_cabecalho(cabecalho, obj_para_lancar)

  aba_produto.getRange(ultima_linha,1,1,3).setValues([dados_organizados])
}

function alterar_produto(obj_para_lancar){
  var aba_produto = banco_de_dados.getSheetByName("produtos")
  var ultima_linha = aba_produto.getLastRow()
  var ultima_coluna = aba_produto.getLastColumn()
  var todos_os_dados = aba_produto.getRange(1,1, ultima_linha, ultima_coluna).getValues()
  Logger.log(todos_os_dados)

  var cabecalho = aba_produto.getRange(1,1,1,aba_produto.getLastColumn()).getValues()[0]
  Logger.log(cabecalho)
  var dados_organizados = organizar_acordo_cabecalho(cabecalho, obj_para_lancar)
  Logger.log(dados_organizados)

  for(var i = 0; i < todos_os_dados.length;i++){
    if(todos_os_dados[i][0] == obj_para_lancar['id']){
      Logger.log(dados_organizados)
      aba_produto.getRange(i+1, 1, 1, todos_os_dados[i].length).setValues([dados_organizados])
    }
  }
}


function ler_todas_as_produtos(){
  var aba_produto = banco_de_dados.getSheetByName("produtos")
  var ultima_linha = aba_produto.getLastRow()
  var ultima_coluna = aba_produto.getLastColumn()
  var todos_os_dados = aba_produto.getRange(1, 1, ultima_linha, ultima_coluna).getValues()
  todos_os_dados = JSON.stringify(todos_os_dados)
  return todos_os_dados
}

function ler_produto_especifica(id){
  var aba_produto = banco_de_dados.getSheetByName("produtos")
  var ultima_linha = aba_produto.getLastRow()
  var ultima_coluna = aba_produto.getLastColumn()
  var todos_os_dados = aba_produto.getRange(1, 1, ultima_linha, ultima_coluna).getValues()
  
  for(var i = 0; i < todos_os_dados.length;i++){
    if(todos_os_dados[i][0] == id){
      return todos_os_dados[i]
    }
  }
}