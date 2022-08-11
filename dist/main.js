#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var System_1 = require("./types/System");
var ArgumentParser = require('argparse').ArgumentParser;
var version = require('../package.json').version;
var repl = require('repl');
var parser = new ArgumentParser({ description: 'PhyCat CLI' });
parser.add_argument('-v', '--version', { action: 'version', version: version });
parser.add_argument('-f', '--file', { type: 'str', help: 'input file', default: './system.yml' });
parser.add_argument('-b', '--bar', { help: 'bar foo' });
parser.add_argument('--baz', { help: 'baz bar' });
var args = parser.parse_args();
var system = new System_1.System();
system.loadFromFile(args.file);
function autoComp(line) {
    var nodes = line.split('/');
    var completions = ['sys', 'cfg'];
    switch (nodes.length) {
        case 0:
            break;
        case 1:
        case 2:
            switch (nodes[0]) {
                case 'sys':
                    completions = ['bus', 'dev'];
                    break;
            }
        case 3:
            switch (nodes[1]) {
                case 'dev':
                    completions = system.getDeviceNames();
                    break;
            }
    }
    var subStr = line;
    if (nodes.length > 0) {
        subStr = nodes[nodes.length - 1];
    }
    var hits = completions.filter(function (c) { return c.startsWith(subStr); });
    if (hits.length == 1) {
        line = hits[0];
    }
    return [hits.length ? hits : completions, line];
}
repl.start({ completer: autoComp });
