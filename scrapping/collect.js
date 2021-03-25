const wine = require('./index')
const db= require('../db');
fs = require('fs');

//Function to Get getWinyInfo and getWinyTaste of 1k wine

//There are 25 wines per pages
//FIXME: The method names shall be changed
async function blendAllData(max_page){
  all_wines=[]
  all_reviews=[]
  try{
  for (i = 0; i < max_page; i++){
    console.log(`Getting wines from page ${i}`);
    let res = await wine.getWinyInfo(i);
    res.forEach(elm => {
      all_wines.push(elm)
      console.log(`getting reviews for wine ${elm._id}`)
      wine.getWinyReviews(elm._id).then((reviews)=>{
      reviews.forEach(rev => all_reviews.push(rev));
      });
    });
    //FIXME:Concat marche pas ca me soule
  }
  return [all_wines,all_reviews];
  } catch(error){
    console.log(error);
    return [all_wines,all_reviews];
  }
}
async function fetchData(){

  result = await blendAllData(95);
  fs.writeFile('./scrapping/Wines.json', JSON.stringify(result[0]), (err)=> {if (err) return console.log(err);
  });
  fs.writeFile('./scrapping/Reviews.json', JSON.stringify(result[1]), (err)=> {if (err) return console.log(err);
  });

}

function sendData(){
fs.readFile('./scrapping/Wines.json', 'utf8', (err, data) => {

    if (err) {
        console.log(`Error reading file from disk: ${err}`);
    } else {

        // parse JSON string to JSON object
        const all = JSON.parse(data);
        db.insert(all);
    }

});
}
//wine.getWinyReviews(1001).then((res)=>console.log(res));
//fetchData();
sendData();