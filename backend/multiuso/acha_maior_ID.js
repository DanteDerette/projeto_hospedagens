var banco_de_dados = SpreadsheetApp.openById("1dnNb_L3LhHN25Cxa-nTnf7hiPf1EQutEfLiHTvsSa1Y")

function acha_maior_ID(nomeDaAba){
  var aba = banco_de_dados.getSheetByName(nomeDaAba)

  var ultimaLinha = aba.getLastRow() + 1
  var maiorNumero = 0 

  for(var i = 2; i < ultimaLinha;i++){
    if(aba.getRange(i, 1).getValue() > maiorNumero){
      maiorNumero = aba.getRange(i, 1).getValue()
    }
  }

  return maiorNumero + 1

}