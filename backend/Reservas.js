var banco_de_dados = SpreadsheetApp.openById("1dnNb_L3LhHN25Cxa-nTnf7hiPf1EQutEfLiHTvsSa1Y")


// front-end
// salvar_reserva(obj_para_lancar)
// incluir_reserva(obj_para_lancar)
// salvar_reserva_calendario(obj_para_lancar)


function salvar_reserva(obj_para_lancar) {
  
  var obj_para_lancar = JSON.parse(obj_para_lancar)
  
  if(obj_para_lancar['id'] == ''){
    // 1
    return JSON.stringify(incluir_reserva(obj_para_lancar))
  } else {
    alterar_reserva(obj_para_lancar)
  }
}

function incluir_reserva(obj_para_lancar){
  obj_para_lancar['id'] = acha_maior_ID('reservas')
  var aba_reservas = banco_de_dados.getSheetByName("reservas")
  var ultima_linha = aba_reservas.getLastRow() + 1

  var arr_id_de_eventos = salvar_reserva_calendario(obj_para_lancar)
  
  

  var linha_para_escrever = [
    obj_para_lancar['id'],
    obj_para_lancar['titulo_da_reserva'],
    obj_para_lancar['data_do_check_in'],
    obj_para_lancar['data_do_check_out'],
    obj_para_lancar['status_da_reserva'],
    JSON.stringify(obj_para_lancar['arr_cliente']),
    JSON.stringify(obj_para_lancar['arr_hospedagens']),
    JSON.stringify(obj_para_lancar['arr_produtos']),
    obj_para_lancar['obs_da_reserva'],
    JSON.stringify(obj_para_lancar['arr_pagamentos']),
    JSON.stringify(arr_id_de_eventos)
  ]

  
  aba_reservas.getRange(ultima_linha, 1, 1, linha_para_escrever.length).setValues([linha_para_escrever])
  
  var arr_de_retorno = [arr_id_de_eventos, obj_para_lancar['id']]

  // 2
  return arr_de_retorno
  
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

function ler_todas_as_reservas(){
  var aba_servico = banco_de_dados.getSheetByName("reservas")
  var ultima_linha = aba_servico.getLastRow()
  var ultima_coluna = aba_servico.getLastColumn()
  var todos_os_dados = aba_servico.getRange(1, 1, ultima_linha, ultima_coluna).getValues()
  todos_os_dados = JSON.stringify(todos_os_dados)
  return todos_os_dados
}

function ler_reserva_especifica(id){
  var id = 1
  var aba_reservas = banco_de_dados.getSheetByName("reservas")
  var ultima_linha = aba_reservas.getLastRow()
  var ultima_coluna = aba_reservas.getLastColumn()
  var todos_os_dados = aba_reservas.getRange(1, 1, ultima_linha+2, ultima_coluna).getValues()
  
  for(var i = 0; i < todos_os_dados.length;i++){
    if(todos_os_dados[i][0] == id){
      console.log(todos_os_dados[i])
      return JSON.stringify(todos_os_dados[i])
    }
  }
}

function salvar_reserva_calendario(obj_para_lancar){
  

  var my_string = ''
  my_string += "ID: " + obj_para_lancar['id'] + '\n'
  my_string += "Status da Reserva: " + obj_para_lancar['status_da_reserva'] + '\n'
  my_string += "Observação: " + obj_para_lancar['obs_da_reserva'] + '\n\n'

  var arr_cliente_to_string = 'Clientes:\n'
  obj_para_lancar['arr_cliente'].forEach((item) =>{
    arr_cliente_to_string += "[" +item[0] + "; " + item[1] + ']'
  })

  var arr_hospedagem_to_string = `\nHospedagens:\n`

  obj_para_lancar['arr_hospedagens'].forEach((item) =>{
    arr_hospedagem_to_string += "[" + item[1] + ";" + item[2] + '] \n'
  })



  var arr_produtos_to_string = 'Produtos:\n'
  obj_para_lancar['arr_produtos'].forEach((item) =>{
    var data_desmontada = desmonta_data(item[3].slice(0, 10))
    var data_para_o_usuario = data_desmontada.dia + '/' + (parseInt(data_desmontada.mes)+1).toString() + '/' + data_desmontada.ano
    arr_produtos_to_string += "[" + item[1] + ', ' + item[2] + ', ' + data_para_o_usuario + ']\n'    
  })


  var arr_pagamentos_to_string = 'Pagamentos:\n'
  obj_para_lancar['arr_pagamentos'].forEach((item) =>{
    var data_desmontada = desmonta_data(item[3].slice(0, 10))
    var data_para_o_usuario = data_desmontada.dia + '/' + (parseInt(data_desmontada.mes)+1).toString() + '/' + data_desmontada.ano
    arr_pagamentos_to_string += "[" + item[1] + ', ' + item[2] + ', ' + data_para_o_usuario + ']\n'    
  })

  var resultado_da_descricao = my_string + arr_cliente_to_string + '\n' + arr_hospedagem_to_string + '\n' + arr_pagamentos_to_string + '\n' + arr_produtos_to_string


  var hospedagens = obj_para_lancar['arr_hospedagens']
  
  var arr_do_id_dos_eventos = []

  hospedagens.forEach((item) =>{
    var calendario = CalendarApp.getCalendarsByName(item[1])[0]
    var este_evento = calendario.createEvent(
      obj_para_lancar['titulo_da_reserva'],
      new Date(item[3]),
      new Date(item[4]), {
      description: resultado_da_descricao
    })

  
    arr_do_id_dos_eventos.push(este_evento.getId())
  })

  // 3
  return arr_do_id_dos_eventos
  
}


















