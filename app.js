const server = require('./server')
const wine = require('./scrapping/index')
const db= require('./db');
fs = require('fs');

//db.find({'wine_id' : 1130327},'reviews').then((res)=>console.log(res))

server();

