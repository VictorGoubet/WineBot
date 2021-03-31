'use strict';

const fbeamer = require('./fbeamer/index');
const express = require('express');
const bp = require('body-parser');


const FB = new fbeamer();
const server = express();
const PORT = process.env.PORT;

const launch_server = () =>{
  server.get('/', (req, res) => FB.registerHook(req, res));

  server.post('/', bp.json ({
    verify: FB.verifySignature.call(FB)
  }));

  server.post('/', (req, res, _) => FB.incoming(req, res));
  
  server.listen(PORT, () => console.log(`The bot server is running on port ${PORT}`));
}

module.exports = launch_server;