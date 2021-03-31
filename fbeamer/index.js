'use strict'

const crypto = require('crypto');
const request = require('request'); 
const mapper = require('./map_intent')

class FBeamer{

  registerHook(req, res) {
    const params = req.query;
    try {
      console.log(process.env.VerifyToken)
      if (params.hub && params.hub.mode === 'subscribe' && params.hub.verify_token === process.env.VerifyToken) {
      console.log("Webhook is registered");
      return res.send(params.hub.challenge);
      } else {
        console.log("Could not register webhook!");
        return res.sendStatus(200);
      }
    } catch(e) {
      console.log(e);
    } 
  }

  verifySignature(req, res, buf){
    return (req, res, buf) =>{
      if(req.method == 'POST'){
        try{
          let tempo_hash = crypto.createHmac('sha1', process.env.appSecret).update(buf, 'utf-8');
          let hash = 'sha1=' + tempo_hash.digest('hex');
          if(hash !=  req.headers['x-hub-signature']){
            throw Error('hash and x hub signature are not the same')
          } 
        }
        catch (e) {console.log(e);}
      }
    }
  }


  incoming(req, res) { 
    res.sendStatus(200);
    if(req.body.object == 'page' && req.body.object){
      let data = req.body;
      data.entry.forEach(x =>{
        x.messaging.forEach(x=>this.messageHandler(x))
      })
    }
  }



  messageHandler(obj){
    if(obj.message.text){
      let intent = obj.message.nlp.intents[0]
      if(intent && intent.confidence>0.6){
        mapper(obj, this)
      }
      else{
        this.txt(obj.sender.id, "Sorry I don't understand what you mean, maybe it was too winy for me ?")
      }
    }
    else{
      this.txt(obj.sender.id, 'Crazy!')
    }
  }
 



  sendMessage(response, sender){
    let request_body = {"recipient": {"id": sender},
                        "message": response}
    console.log(request_body)
                         
    return new Promise((resolve, reject) => { request ({
      uri: 'https://graph.facebook.com/v2.6/me/messages',
      qs :{access_token : process.env.pageAccessToken},
           method: 'POST',
           json: request_body
      }, (err , res , body) => {
        if(!err && res.statusCode === 200){
           resolve ({mid: body.message_id});
        }
        else {
          reject(err);
          }
      }); 
    });
  }


  wineTemplate(id, wine){

    let msg = {
      "attachment": {
        "type": "template",
        "payload": {
          "template_type": "generic",
          "elements": [{
            "title": `${wine.name} ${wine.type!="autre"?`(${wine.type})`:""}`,
            "subtitle": `Year: ${wine.year}\nWinery: ${wine.winery}\nFrom: ${wine.region} - ${wine.country}\nType: ${wine.type}`,
            "default_action": {
              "type": "web_url",
              "url": wine.photo
            },
            "image_url": wine.photo,
            "buttons": [{
                        "type": "web_url",
                        "title": "Discover more wines !",
                        "url":`https://www.vivino.com/search/wines?q=${wine.name}`
                        } ]  
          }]
        }

      }
    }
    return this.sendMessage(msg, id)
  }

  txt(id, text){
    return this.sendMessage({text}, id);
    }


  carrousel(id, wines){

    let wines_elements = wines.map(wine=>{
      return {
            "title": `${wine.name} ${wine.type!="autre"?`(${wine.type})`:""}` ,
            "subtitle": `Year: ${wine.year}\nWinery: ${wine.winery}\nFrom: ${wine.region} - ${wine.country}\nType: ${wine.type}`,
            "default_action": {
              "type": "web_url",
              "url": wine.photo
            },
            "image_url": wine.photo,
            "buttons": [{
                        "type": "web_url",
                        "title": "Discover more wines !",
                        "url":`https://www.vivino.com/search/wines?q=${wine.name}`
                        }]
      }
    })


    let msg = {
      "attachment":{
          "type":"template",
          "payload":{
            "template_type":"generic",
            "elements":wines_elements
          }
        }
      }
    return this.sendMessage(msg, id)
  }




}


module.exports = FBeamer;