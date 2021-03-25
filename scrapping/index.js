'use strict';

const axios = require('axios');
const cheerio = require('cheerio');
const {'v5': uuidv5} = require('uuid');
const {optionsInfo, optionsReviews} = require('./headers.js')


async function fetch_data(options){
  const response = await axios(options);
  let {data, status} = response;
  if(status >= 200 && status < 300){
    return data
  }
  console.error(status);
  return null;
}

async function getWinyInfo(page){ 
  let data = await fetch_data(optionsInfo(page))
  
  //on s'appui sur la premiere review pour extraire les caracteristiques du vin
  let wine_info = data.explore_vintage.matches
  //console.log(wine_info[0].vintage)
  let mywines= wine_info.map((res) => {
    return {
    '_id': res.vintage.wine.id,
    'photo':(res.vintage.image.variations!=null)?"https:"+res.vintage.image.variations.bottle_large:null,
    'name': res.vintage.wine.name,
    'year': res.vintage.year,
    'region':(res.vintage.wine.region!=null)?res.vintage.wine.region.name:null,
    'country':(res.vintage.wine.region!=null)?res.vintage.wine.region.country.name:null,
    'most_used_grapes':(res.vintage.wine.region!=null)?res.vintage.wine.region.country.most_used_grapes.map(item=>item.seo_name):null,
    'winery': res.vintage.wine.winery.name,
    'acidity':(res.vintage.wine.taste.structure!=null)?res.vintage.wine.taste.structure.acidity:null,
    'fizziness':(res.vintage.wine.taste.structure!=null)?res.vintage.wine.taste.structure.fizziness:null,
    'intensity':(res.vintage.wine.taste.structure!=null)?res.vintage.wine.taste.structure.intensity:null,
    'sweetness':(res.vintage.wine.taste.structure!=null)?res.vintage.wine.taste.structure.sweetness:null,
    'tannin':(res.vintage.wine.taste.structure!=null)?res.vintage.wine.taste.structure.tannin:null,
    'type': (res.vintage.wine.style!=null)?res.vintage.wine.style.name:null,
    'fun_fact': (res.vintage.wine.style!=null)?res.vintage.wine.style.interesting_facts:null
  }
  })

  // Il faudrait aussi parcourir la liste reviews et stocker toute les reviews, pour chaque reviews on garde l'id de l'utilisateur et la note qu'il a mit
  return mywines
  
}

async function getWinyReviews(id){ 
  let data = await fetch_data(optionsReviews(id))
  
  //on s'appui sur la premiere review pour extraire les caracteristiques du vin
  let wine_reviews = data.reviews
  let myreviews = wine_reviews.map(review =>{ return {
    '_id':review.id,
    'user_id': review.user.id,
    'wine_id':review.vintage.wine.id,
    'rating': review.rating
  }
  });
  return myreviews
  }
module.exports = {getWinyInfo,getWinyReviews};