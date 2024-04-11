var banco_de_dados = SpreadsheetApp.openById("1dnNb_L3LhHN25Cxa-nTnf7hiPf1EQutEfLiHTvsSa1Y")

function salvar_cliente(obj_para_lancar) {
  if(obj_para_lancar['id'] == ''){
    incluir_cliente(obj_para_lancar)
  } else {
    alterar_cliente(obj_para_lancar)
  }
}

function incluir_cliente(obj_para_lancar){
  obj_para_lancar['id'] = acha_maior_ID('clientes')
  var aba_cliente = banco_de_dados.getSheetByName("clientes")
  var ultima_linha = aba_cliente.getLastRow() + 1

  var cabecalho = aba_cliente.getRange(1,1,1,aba_cliente.getLastColumn()).getValues()[0]
  var dados_organizados = organizar_acordo_cabecalho(cabecalho, obj_para_lancar)

  aba_cliente.getRange(ultima_linha,1,1,9).setValues([dados_organizados])
}

function alterar_cliente(obj_para_lancar){
  var aba_cliente = banco_de_dados.getSheetByName("clientes")
  var ultima_linha = aba_cliente.getLastRow()
  var ultima_coluna = aba_cliente.getLastColumn()
  var todos_os_dados = aba_cliente.getRange(1,1, ultima_linha, ultima_coluna).getValues()
  
  var cabecalho = aba_cliente.getRange(1,1,1,aba_cliente.getLastColumn()).getValues()[0]
  
  var dados_organizados = organizar_acordo_cabecalho(cabecalho, obj_para_lancar)
  

  for(var i = 0; i < todos_os_dados.length;i++){
    if(todos_os_dados[i][0] == obj_para_lancar['id']){
      
      aba_cliente.getRange(i+1, 1, 1, todos_os_dados[i].length).setValues([dados_organizados])
    }
  }
}


function ler_todas_as_clientes(){
  var aba_cliente = banco_de_dados.getSheetByName("clientes")
  var ultima_linha = aba_cliente.getLastRow()
  var ultima_coluna = aba_cliente.getLastColumn()
  var todos_os_dados = aba_cliente.getRange(1, 1, ultima_linha, ultima_coluna).getValues()
  todos_os_dados = JSON.stringify(todos_os_dados)
  return todos_os_dados
}

function ler_cliente_especifica(id){
  var aba_cliente = banco_de_dados.getSheetByName("clientes")
  var ultima_linha = aba_cliente.getLastRow()
  var ultima_coluna = aba_cliente.getLastColumn()
  var todos_os_dados = aba_cliente.getRange(1, 1, ultima_linha, ultima_coluna).getValues()
  
  for(var i = 0; i < todos_os_dados.length;i++){
    if(todos_os_dados[i][0] == id){

      return JSON.stringify(todos_os_dados[i])
    }
  }
}