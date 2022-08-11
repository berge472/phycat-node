#!/usr/bin/env node

import { System } from "./types/System";
const { ArgumentParser } = require('argparse');
const { version } = require('../package.json');

let repl = require('repl')


const parser = new ArgumentParser({ description: 'PhyCat CLI'});


parser.add_argument('-v', '--version', { action: 'version', version });
parser.add_argument('-f', '--file', { type: 'str', help: 'input file', default:'./system.yml' });
parser.add_argument('-b', '--bar', { help: 'bar foo' });
parser.add_argument('--baz', { help: 'baz bar' });


let args = parser.parse_args();
let system = new System();
system.loadFromFile(args.file); 



function autoComp(line:string)
{
    let nodes = line.split('/')
    let completions = ['sys', 'cfg'];

    switch(nodes.length)
    {
        case 0:
            break;
        case 1: 
        case 2: 
            switch(nodes[0])
            {
                case 'sys':
                    completions = ['bus', 'dev']
                    break;

            }
        case 3:
            switch(nodes[1])
            {
                case 'dev':
                    completions = system.getDeviceNames();
                    break;
            }

    }

    let subStr = line; 

    if(nodes.length > 0)
    {
        subStr = nodes[nodes.length -1];
    }
    const hits = completions.filter((c) => c.startsWith(subStr));

    if(hits.length ==1 )
    {
        line = hits[0];
    }

    return [hits.length ? hits : completions, line];
}



repl.start({completer: autoComp});



