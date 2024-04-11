var banco_de_dados = SpreadsheetApp.openById("1dnNb_L3LhHN25Cxa-nTnf7hiPf1EQutEfLiHTvsSa1Y")

function salvar_servico_prestado(obj_para_lancar) {
  if(obj_para_lancar['id'] == ''){
    incluir_prestacao_de_servico(obj_para_lancar)
  } else {
    alterar_prestacao_de_servico(obj_para_lancar)
  }
}

function incluir_prestacao_de_servico(obj_para_lancar){

  obj_para_lancar['id'] = acha_maior_ID('servicos_prestados')
  var aba_servico = banco_de_dados.getSheetByName("servicos_prestados")
  var ultima_linha = aba_servico.getLastRow() + 1


  var montar_prestadores_calendario = ''
  var montar_prestadores = ''
  obj_para_lancar['prestador'].forEach((item) => {
    montar_prestadores += '[' + item['id_do_prestador'] + ';' + item['nome_do_prestador'] + '],'
    montar_prestadores_calendario += '[' + item['id_do_prestador'] + ';' + item['nome_do_prestador'] + ']\n'
  })
  montar_prestadores = montar_prestadores.slice(0, montar_prestadores.length-1)

  var montar_servicos_prestados = ''
  var montar_servicos = ''
  obj_para_lancar['servico'].forEach((item) => {
    montar_servicos += '[' + item['id_do_servico'] + ';' + item['nome_do_servico'] + ';' + item['valor_do_servico'] +'],'
    montar_servicos_prestados += '[' + item['id_do_servico'] + ';' + item['nome_do_servico'] + ';' + item['valor_do_servico'] +']\n'
  })
  montar_servicos = montar_servicos.slice(0, montar_servicos.length-1)


  aba_servico.getRange(ultima_linha,1).setValue(obj_para_lancar['id'])
  aba_servico.getRange(ultima_linha,2).setValue(montar_prestadores)
  aba_servico.getRange(ultima_linha,3).setValue(montar_servicos)
  aba_servico.getRange(ultima_linha,4).setValue(obj_para_lancar['data_prestacao'])

  var id_do_evento = salvar_evento_prestacao(
    obj_para_lancar['data_prestacao'],
    montar_prestadores_calendario,
    montar_servicos_prestados,
    obj_para_lancar['valor_total_dos_servicos']
  )


  aba_servico.getRange(ultima_linha,5).setValue(id_do_evento)


  
}

function alterar_prestacao_de_servico(obj_para_lancar){
  var aba_servico = banco_de_dados.getSheetByName("servicos_prestados")
  var ultima_linha = aba_servico.getLastRow()
  var ultima_coluna = aba_servico.getLastColumn()
  var todos_os_dados = aba_servico.getRange(1,1, ultima_linha, ultima_coluna).getValues()

  for(var i = 0; i < todos_os_dados.length;i++){
    if(todos_os_dados[i][0] == obj_para_lancar['id']){
      obj_para_lancar['id'] = acha_maior_ID('servicos_prestados')
      var aba_servico = banco_de_dados.getSheetByName("servicos_prestados")
      var ultima_linha = i+1


      var montar_prestadores_calendario = ''
      var montar_prestadores = ''
      obj_para_lancar['prestador'].forEach((item) => {
        montar_prestadores += '[' + item['id_do_prestador'] + ';' + item['nome_do_prestador'] + '],'
        montar_prestadores_calendario += '[' + item['id_do_prestador'] + ';' + item['nome_do_prestador'] + ']\n'
      })
      montar_prestadores = montar_prestadores.slice(0, montar_prestadores.length-1)

      var montar_servicos_prestados = ''
      var montar_servicos = ''
      obj_para_lancar['servico'].forEach((item) => {
        montar_servicos += '[' + item['id_do_servico'] + ';' + item['nome_do_servico'] + ';' + item['valor_do_servico'] +'],'
        montar_servicos_prestados += '[' + item['id_do_servico'] + ';' + item['nome_do_servico'] + ';' + item['valor_do_servico'] +']\n'
      })
      montar_servicos = montar_servicos.slice(0, montar_servicos.length-1)


      aba_servico.getRange(ultima_linha,1).setValue(obj_para_lancar['id'])
      aba_servico.getRange(ultima_linha,2).setValue(montar_prestadores)
      aba_servico.getRange(ultima_linha,3).setValue(montar_servicos)
      aba_servico.getRange(ultima_linha,4).setValue(obj_para_lancar['data_prestacao'])

      var id_do_evento = salvar_evento_prestacao(
        obj_para_lancar['data_prestacao'],
        montar_prestadores_calendario,
        montar_servicos_prestados,
        obj_para_lancar['valor_total_dos_servicos']
      )

      aba_servico.getRange(ultima_linha,5).setValue(id_do_evento)
      remove_evento_prestacoes(obj_para_lancar['id_evento_calendario'])
    }
  }
  

}

function ler_todas_as_prestacao_servicos(){
  var aba_servico = banco_de_dados.getSheetByName("servicos_prestados")
  var ultima_linha = aba_servico.getLastRow()
  var ultima_coluna = aba_servico.getLastColumn()
  var todos_os_dados = aba_servico.getRange(1, 1, ultima_linha, ultima_coluna).getValues()
  todos_os_dados = JSON.stringify(todos_os_dados)
  return todos_os_dados
}

function ler_prestacao_de_servico_especifica(id){
  
  var aba_servico = banco_de_dados.getSheetByName("servicos_prestados")
  var ultima_linha = aba_servico.getLastRow()
  var ultima_coluna = aba_servico.getLastColumn()
  var todos_os_dados = aba_servico.getRange(1, 1, ultima_linha, ultima_coluna).getValues()
  
  for(var i = 0; i < todos_os_dados.length;i++){
    if(todos_os_dados[i][0] == id){
      return JSON.stringify(todos_os_dados[i])
    }
  }
}

function prepara_form_servicos_prestados(){
  var prestadores = banco_de_dados.getSheetByName("prestadores")
  var todos_prestadores = prestadores.getRange(
    1,
    1,
    prestadores.getLastRow(),
    prestadores.getLastColumn()
  ).getValues()

  var servicos = banco_de_dados.getSheetByName("servicos")
  var todos_servicos = servicos.getRange(
    1,
    1,
    servicos.getLastRow(),
    servicos.getLastColumn()
  ).getValues()

  var meu_return = JSON.stringify([todos_prestadores, todos_servicos])
  return meu_return
}

function salvar_evento_prestacao(
    data_prestacao,
    montar_prestadores_calendario,
    montar_servicos_prestados,
    valor_total_dos_servicos
  ){

  var calendario_prestacao = CalendarApp.getCalendarsByName('Prestacoes')[0]

  var data_do_evento = data_prestacao

  var event = calendario_prestacao.createAllDayEvent('Prestação', new Date(
    desmonta_data(data_do_evento).ano,
    desmonta_data(data_do_evento).mes,
    desmonta_data(data_do_evento).dia
  ), {
    description: 'Prestador:\n' + montar_prestadores_calendario + '\nServiços Prestados:\n' + montar_servicos_prestados + "\nValor Total: " + valor_total_dos_servicos
  });

  return event.getId()
}

function remove_evento_prestacoes(id_do_evento){
  var calendario_prestacao = CalendarApp.getCalendarsByName('Prestacoes')[0]
  var evento_selecionado = calendario_prestacao.getEventById(id_do_evento)
  evento_selecionado.deleteEvent()
}







