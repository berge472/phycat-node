import {System } from "../index"

const fs = require('fs');
const YAML = require('yaml');


test('System File', ()=>{
    

    let newSys = new System();

    newSys.loadFromFile('./data/system.yml');




})