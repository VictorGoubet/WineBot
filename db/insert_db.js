const wine = require('../scrapping/index.js')
const db = require('./index.js');


async function getData(n_page){

  let all_wines, all_reviews;
  try{
    let promises_wine = [...Array(n_page).keys()].map(x=>{wine.getWinyInfo(x+30)})
    all_wines = await Promise.all(promises_wine)
    all_wines = all_wines.flat()

    let promises_reviews = all_wines.map(x=>{return wine.getWinyReviews(x._id)})
    all_reviews = await Promise.all(promises_reviews)
    all_reviews = all_reviews.flat()
  } catch(error){
    console.log(error)
  }

  return [all_wines, all_reviews];
}

async function sendData(n_page){
  let data = await getData(n_page)
  console.log(data[0].length, data[1].length)
  db.insert(data[0], 'wines');
  db.insert(data[1], 'reviews');
}



sendData(10);