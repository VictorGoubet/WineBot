'use strict'

const crypto = require('crypto');
const request = require('request'); 
const mapper = require('./map_intent')

class FBeamer{

  constructor({pageAccessToken , VerifyToken, appSecret}){
    try{
      this.pageAccessToken = pageAccessToken;
      this.VerifyToken = VerifyToken;
      this.appSecret = appSecret;
    }catch{
      console.log("We don't have the two Tokens");
    }
  }

  registerHook(req, res) {
    const params = req.query;
    const mode = params.hub.mode
    const token = params.hub.verify_token
    const challenge = params.hub.challenge;

    try {
      if (mode === 'subscribe' && token === this.VerifyToken) {
      console.log("webhook is registered");
      return res.send(challenge);
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
                         
    return new Promise((resolve, reject) => { request ({
      uri: 'https://graph.facebook.com/v2.6/me/messages',
      qs :{access_token : this.pageAccessToken},
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



    let rate_btn = ["1", "2", "3"].map(x=>{
        return {
                "type": "postback",
                "title": x,
                "payload": x,
                }
    })

    let msg = {
      "attachment": {
        "type": "template",
        "payload": {
          "template_type": "generic",
          "elements": [{
            "title": wine.name ,
            "subtitle": `Year: ${wine.year}\nWinery: ${wine.winery}`,
            "image_url": wine.picture,
            "buttons": rate_btn        
          }]
        }
      }
    }
    console.log(msg.attachment.payload)
    return this.sendMessage(msg, id)
  }

  txt(id, text){
    return this.sendMessage({text}, id);
    }




}


module.exports = FBeamer;