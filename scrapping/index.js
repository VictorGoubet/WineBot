'use strict';

const axios = require('axios');
const cheerio = require('cheerio');
const {'v5': uuidv5} = require('uuid');
const {optionsInfo, optionsTaste} = require('./headers.js')


async function fetch_data(options){
  const response = await axios(options);
  let {data, status} = response;
  if(status >= 200 && status < 300){
    return data
  }
  console.error(status);
  return null;
}

async function getWinyInfo(){ 
  let data = await fetch_data(optionsInfo)
  
  //on s'appui sur la premiere review pour extraire les caracteristiques du vin
  let wine_info = data.reviews[0].vintage.wine
  // Refaire un nvl object propre avec seulement ce que l'on garde

  // Il faudrait aussi parcourir la liste reviews et stocker toute les reviews, pour chaque reviews on garde l'id de l'utilisateur et la note qu'il a mit
  console.log(wine_info)
  
}


async function getWinyTaste(){
  let data = await fetch_data(optionsTaste)
  let wine_tastes = data.tastes.structure
  // Pareil, légerement refactorizer l'object qu'on envoi
  console.log(wine_tastes)
}

module.exports = {getWinyInfo, getWinyTaste};