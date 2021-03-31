const {MongoClient} = require('mongodb');

const MONGODB_DB_NAME = 'WineBot';
const MONGODB_URI =`mongodb+srv://chloedia:SaXQwFjUF7IjwiAo@winebot.qyoso.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`

let client = null;
let database = null;


const getDB = module.exports.getDB = async () => {
  try {
    if (database) {
      return database;
    }

    client = await MongoClient.connect(MONGODB_URI, {'useNewUrlParser': true,"useUnifiedTopology": true });
    database = client.db(MONGODB_DB_NAME);

    console.log('💽  Connected');

    return database;
  } catch (error) {
    console.error('🚨 MongoClient.connect...', error);
    return null;
  }
};



module.exports.insert = async (products,MONGODB_COLLECTION) => {
  try {
    const db = await getDB();
    const collection = db.collection(MONGODB_COLLECTION);

    const result = await collection.insertMany(products, {'ordered': false});
    return result;

  } catch (error) {
    console.error('🚨 collection.insertMany...', error);
    return {
      'insertedCount': error.result.nInserted
    };
  }
};


module.exports.find = async (query, MONGODB_COLLECTION) => {
  try {
    const db = await getDB();
    const collection = db.collection(MONGODB_COLLECTION);
    const result = await collection.find(query).toArray();
    return result;

  } catch (error) {
    console.error('🚨 collection.find...', error);
    return null;
  }
};

module.exports.findsort = async (query, MONGODB_COLLECTION) => {
  try {
    const db = await getDB();
    const collection = db.collection(MONGODB_COLLECTION);
    const result = await collection.find(query,{ score: { $meta: "textScore" } }).sort({ score:{ $meta: "textScore" }}).toArray();
    
    return result;
  } catch (error) {
    console.error('🚨 collection.find...', error);
    return null;
  }
};


module.exports.distincts = async (field, MONGODB_COLLECTION) => {
  try {
    const db = await getDB();
    const collection = db.collection(MONGODB_COLLECTION);
    const result = await collection.distinct(field, {})
    return result;
    
  } catch (error) {
    console.error('🚨 collection.find...', error);
    return null;
  }
};

