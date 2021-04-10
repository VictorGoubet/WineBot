const db = require('../db');
const uuid5 = require('uuid5')
const reco = require('../recommendation')

const mapIntent = async (data, FB) => {
  
  let id = data.sender.id
  let message = data.message
  var metadata

  await FB.txt(id, 'Intent: '+JSON.stringify(message.nlp.intents[0].name))

  switch(message.nlp.intents[0].name){


    case 'hello':
      await FB.txt(id,'Hey! What a winy day today ! 🍷 You seem thiiiirsty, I\'ll help you !');
      await FB.txt(id,'You can ask me about your favorite wine from our secret database 🤫 (Try \'Tell me about Bourgogne\' or \'Give me some info on Prosecco (Zonin)\' )\n I can also recommend you a wine that I think would suit you perfectly 😎 (Try \'Give me some recommendations or What are the best wines ?\')\nYou are hesitent between two wines ? Let me help you chose, you have no time for bad choices 🤧 (Try \'Champagne or Bourgogne ? \' or \'What is the best wine between Tempranillo(Campo Viejo) and Rioja Crianza (Marqués de Cáceres)\').\n I can finally give you your user vector, just ask "user vector" ');
    
      let ratings = await db.find({'user_id':parseInt(id)},'reviews');
      if(ratings.length == 0){
        await FB.txt(id,'Seems like you are a new wine buddy 🤝, before we can actually give you recommendation pleaaaase search some wines you liiiike 🤤 (Tell me about Bourgogne)');
      }
    break;

    case 'info_wine':
      try{
        var wine
    
        if(message.nlp.entities['winery:winery']){
          console.log(message.nlp.entities['winery:winery'])

          wine = await db.findsort({ '$text': { '$search': message.nlp.entities['name:name'][0].value}, 'winery':message.nlp.entities['winery:winery'][0].value}, 'wines')
        }
        else{
          wine = await db.findsort({ '$text': { '$search': message.nlp.entities['name:name'][0].value}}, 'wines')
        }
        

        if(wine.length>0){
          await FB.txt(id, "Alright, I have maybe a result! 🍷")
          await FB.wineTemplate(id, wine[0])
          let rd_i = Math.floor(Math.random() * wine[0].fun_fact.length)
          await FB.txt(id,'Fun fact:\n' + wine[0].fun_fact[rd_i])
          await db.insert([{'_id':uuid5(wine[0].photo+id), 
                            'user_id': parseInt(id), 
                            'wine_id': wine[0]._id, 
                            'rating':5}], 'reviews')
        }
        else{
          await FB.txt(id, "Sorry, I don't know this wine! 🙇‍♂️🙇‍♂️ ")
        }

      }catch{
        await FB.txt(id, "Sorry, It seems I'm not clever enough to extract what you mean, may I have drink too wine ? 🤢🤢")
      }
      
    
      break;

    case 'recommandation':
      try{
        await FB.txt(id, "Alright 🤝! It can take few seconds,we are analysing your profile to give you your next favorite wine 🍷🍷 Please winy wait..")
        let recommandations = await reco.make_recommandation(parseInt(id))

        await FB.carrousel(id, recommandations)

      }catch{
        await FB.txt(id, "Sorry, It seems I'm not clever enough to extract what you mean, may I have drink too wine ? 🤢🤢")
      }
      
      break;
    
    case 'vs':
      await FB.txt(id, "Let the match BEGIN ! (This might take some time, the loser is quite resistant 🦾)")
      let wine_1;
      let wine_2;
      try{
        wineries = message.nlp.entities['winery:winery']
          if(wineries){
            if(wineries.length == 2){
              wine_1 = await db.findsort({ '$text': { '$search': message.nlp.entities['name:name'][0].value}, 'winery':wineries[0].value}, 'wines')
              wine_2 = await db.findsort({ '$text': { '$search': message.nlp.entities['name:name'][1].value}, 'winery':wineries[1].value}, 'wines')
            }else {
              wine_1 = await db.findsort({ '$text': { '$search': message.nlp.entities['name:name'][0].value}, 'winery':wineries[0].value}, 'wines')
              if(wine_1.length == 0){
                wine_1 = await db.findsort({ '$text': { '$search': message.nlp.entities['name:name'][0].value}}, 'wines')
                wine_2 = await db.findsort({ '$text': { '$search': message.nlp.entities['name:name'][1].value}, 'winery':wineries[0].value}, 'wines')
                if(wine_2.length == 0){
                  wine_2 = await db.findsort({ '$text': { '$search': message.nlp.entities['name:name'][1].value}}, 'wines')
                }
              }
              else{
                wine_2 = await db.findsort({ '$text': { '$search': message.nlp.entities['name:name'][1].value}}, 'wines')
              }
            } 
        }
        else{
          wine_1 = await db.findsort({ '$text': { '$search': message.nlp.entities['name:name'][0].value}}, 'wines')

          wine_2 = await db.findsort({ '$text': { '$search': message.nlp.entities['name:name'][1].value}}, 'wines');
        }
          
          if(wine_1.length == 0 || wine_2.length==0){
            throw 'Error';
          }

          let review1 = await db.find({wine_id:parseInt(wine_1[0]._id), user_id:parseInt(id)}, 'reviews')
          let review2 = await db.find({wine_id:parseInt(wine_2[0]._id), user_id:parseInt(id)}, 'reviews')

          
          const metadata = await reco.get_metadata();
          var score_1
          if(review1.length==0){      
            score_1 = await reco.predict_score(parseInt(id), parseInt(wine_1[0]._id),metadata);
          }
          else{
            score_1 = review1[0].rating
          }
          console.log(score_1)

          if(review2.length==0){
            score_2 = await reco.predict_score(parseInt(id),parseInt(wine_2[0]._id),metadata);
          }
          else{
            score_2 = review2[0].rating
          }
          console.log(score_2)
          


          await FB.txt(id, "Seems like we have our winner 🎉🎉! You should definitely drink this wine :  ")
          if (score_1>score_2) {
            await FB.wineTemplate(id, wine_1[0])
          } else {
            await FB.wineTemplate(id, wine_2[0])
          }
      }
      catch{
        await FB.txt(id, "Ooops seems like we don't have one of this wine in our database... 👀")
      }
      break;
    
    case 'user_vector':
      let metadata = await reco.get_metadata()
      let uv = await reco.get_user_vector(parseInt(id), metadata)
      let names =['acidity', 'intensity', 'fizziness'].concat(['country', 'winery', 'region', 'type'].map(x=>metadata.all_uniques[x]).flat())
      let zip = uv.map((x, i)=>{return {val:x, name:names[i]}})
      uv = zip.filter(x=>x.val!=0).map(x=>`${x.name}: ${x.val}\n`).join('')
      await FB.txt(id, `Your user vector (without 0 fields) :\n${uv}`)
      break;


    case 'Bye':
      await FB.txt(id, "Already leaving? Seems like we've been efficient again today ! 🤓 Have a Winy Day ! Come back whenever you need some greeeaat reco 👀");
      break;
  }
}


module.exports = mapIntent;



