const mapIntent = function(data, FB){
  
  let id = data.sender.id
  let message = data.message
  console.log(message.nlp.entities.name)

  switch(message.nlp.intents[0].name){

    case 'info_wine':
      FB.txt(id, "Alright, I have maybe a result! ")
      .then(FB.wineTemplate(id, wine))
        break;

    case 'recommandation':
      FB.txt(id, "Some recommandations")
      .then(FB.wineTemplate(id, wine))
      break;
    
    case 'vs':
      FB.txt(id, "This wine will be a better choice for you:")
      .then(FB.wineTemplate(id, wine))
      break;
}
}


module.exports = mapIntent;



