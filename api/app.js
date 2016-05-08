'use strict';
/* jshint esnext:true, node:true */
const app = require('express')();
const requiredir = require('require-dir');
const config = require('./config.json');
const NpcGen = require('./../scripts/npcGenerator.js');
const data = requiredir('./../data');
const lodash = require('lodash');

let gen = new NpcGen({backgrounds: data.backgrounds, firstNames: data.names.firstNames, surnameone: data.names.surnameone, surnametwo: data.names.surnametwo}, lodash);

app.get('/', function(req, res, next){
  let npc = gen.generate(req.query);
  res.send(npc).end();
});

app.listen(config.server.port, config.server.interface, function(err){
  if(err){
    console.log(err);
    return process.exit(1);
  }
  console.log(`Server is up! ${config.server.interface}:${config.server.port}`);
});
