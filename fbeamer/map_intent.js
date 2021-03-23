
let wine = {
                  picture: 'https://images.vivino.com/thumbs/tjsz19oTQBOf5qgrHBvZQA_pb_x600.png',
                  winery: 'Château Rocher Gardat',
                  country: '',
                  city: '',
                  year: '2018',
                  name: 'Montagne-Saint-Émilion',
                  category: '',
                  puissance: undefined
                } 



const mapIntent = function(data, FB){
  
  let id = data.sender.id
  let message = data.message

  switch(message.nlp.intents[0].name){

    case 'info_wine':
      FB.txt(id, "Alright, I have a result! ")
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



