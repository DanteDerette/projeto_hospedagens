function doGet(e) {
  try{
    var html = HtmlService.createTemplateFromFile(e.parameter.page)
    html.id = e.parameter.id
    return html.evaluate();  
  } catch(err){
    var html = HtmlService.createTemplateFromFile('templates/index')
    return html.evaluate();  
  }
}

function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}

function backend(func, args){
  return Backend[func](args)
}
