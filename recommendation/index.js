const math = require('mathjs')
const db = require('../db/index');



const cos_sim = (v1, v2)=>{
  return math.dot(v1, v2)/(math.norm(v1)*math.norm(v2))
}


const get_metadata = async ()=>{
  let all_uniques = {}
  let fields = ['country', 'winery', 'region', 'type']

  let promises = fields.map(x=>db.distincts(x ,'wines'));
  let res = await Promise.all(promises)

  let data = await db.find({}, 'wines')
  let stats = {
    max:{'acidity':0, 'intensity':0, 'fizziness':0},
    min:{'acidity':0, 'intensity':0, 'fizziness':0} 
  }
  
  let taste_fields = ['acidity', 'intensity', 'fizziness']

  
  data.forEach(x=>{
    taste_fields.forEach(y=>{
      stats.max[y] = stats.max[y]<x[y]?x[y]:stats.max[y]
      stats.min[y] = stats.min[y]>x[y]?x[y]:stats.min[y]
      })
  })


  fields.forEach((x, i)=>all_uniques[x]=res[i])
  return {all_uniques, stats}
}

const get_wine_vector = async (wine_id, metadata)=>{
  let wine = await db.find({"_id":wine_id}, 'wines')
  wine = wine[0]
  let max = metadata.stats.max
  let min = metadata.stats.min
  let vector = [(wine.acidity-min.acidity)/(max.acidity-min.acidity),
                wine.fizziness?wine.fizziness/max.fizziness:0,
                (wine.intensity-min.intensity)/(max.intensity-min.intensity)]

  let fields = ['country', 'winery', 'region', 'type']
  fields.forEach(x=>{
    vector = vector.concat(metadata.all_uniques[x].map(y=>y==wine[x]?1:0))
    })
  return vector
}

const get_user_vector = async (user_id, metadata) => {
  let reviews = await db.find({user_id}, 'reviews');
  let promises = reviews.map(async x=>{
      return math.multiply(await get_wine_vector(x.wine_id, metadata), x.rating)
    })
  let vector_reviews = await Promise.all(promises)
  vector_reviews = math.mean(vector_reviews, 0)
  return vector_reviews
}





const similar_users = async (user_id, wine_id, metadata, n)=>{
  let users = await db.find({'wine_id':wine_id}, 'reviews')
  let uv = await get_user_vector(user_id, metadata);

  let promises = users.map(async x =>cos_sim(await get_user_vector(x.user_id, metadata), uv));
  let all_distances = await Promise.all(promises);
  let zip = users.map((x, i)=>{return {id:x, d:all_distances[i]}})
  zip.sort((x, y)=>x.d<y.d?-1:x.d>y.d?1:0)
  return zip.slice(-n)
}


const predict_score = async (user_id, wine_id, metadata, n=5) => {
  let near_users = await similar_users(user_id, wine_id, metadata, n)
  let score = near_users.reduce((sum, x)=>sum+x.id.rating*x.d, 0) / n
  return score
}


function getRandom(arr, n) {
    var result = new Array(n),
        len = arr.length,
        taken = new Array(len);
    if (n > len)
        throw new RangeError("getRandom: more elements taken than available");
    while (n--) {
        var x = Math.floor(Math.random() * len);
        result[n] = arr[x in taken ? taken[x] : x];
        taken[x] = --len in taken ? taken[len] : len;
    }
    return result;
}



const make_recommandation = async (user_id, k=3, n=5) =>{
  let metadata = await get_metadata()

  let rated_wines = await db.find({user_id}, 'reviews')
  rated_wines = rated_wines.map(x=>x.wine_id)

  let ids = await db.find({wine_id:{$nin:rated_wines}}, "reviews")
  ids = ids.map(x=>x.wine_id)
  ids = [...new Set(ids)]

  let subset = getRandom(ids, 30)
  let promises = subset.map(x=>predict_score(user_id, x, metadata, n))
  let scores = await Promise.all(promises)

  let res = scores.map((x, i) => {return {id:subset[i], score:x}})
  res.sort((a, b)=>a.score<b.score?-1:a.score>b.score?1:0)
  res = res.slice(-k).reverse()

  let promises2 = res.map(x=>db.find({_id:x.id}, 'wines'))
  let recommandations = await Promise.all(promises2)
  return recommandations.flat()
}

module.exports = {get_user_vector, get_metadata, make_recommandation,predict_score}






