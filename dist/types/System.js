"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.System = void 0;
var DataBus_1 = require("./DataBus");
var Device_1 = require("./Device");
var fs = require('fs');
var YAML = require('yaml');
var PATH = require('path');
var request = require('sync-request');
var System = /** @class */ (function () {
    function System() {
        this.name = '';
        this.buses = [];
        this.devices = [];
    }
    System.prototype.handleFrame = function (frame) {
        var channel = (frame & 0xFC) >> 26;
        this.buses.forEach(function (b) {
            // if(b.channelIDs.includes(channel))
            // {
            //     b.
            // }
        });
    };
    System.prototype.loadFromFile = function (path) {
        var _this = this;
        var ymltxt = fs.readFileSync(path).toString();
        var obj = YAML.parse(ymltxt);
        obj.buses.forEach(function (b) {
            _this.buses.push(new DataBus_1.DataBus(b));
        });
        obj.devices.forEach(function (d) {
            var dev_obj;
            if ('path' in d) {
                var dev_path = PATH.dirname(path) + '/' + d.path;
                var dev_txt = fs.readFileSync(dev_path).toString();
                dev_obj = YAML.parse(dev_txt);
                d['descriptor'] = dev_obj;
            }
            else if ('url' in d) {
                var res = request('GET', d['url']);
                if (res.statusCode == 200) {
                    var dev_txt = res.getBody().toString();
                    dev_obj = YAML.parse(dev_txt);
                    d['descriptor'] = dev_obj;
                }
            }
            else {
                //No descriptor
            }
            try {
                _this.devices.push(new Device_1.Device(d, _this));
            }
            catch (_a) {
                console.error("Couldnt create Device\n" + JSON.stringify(d));
            }
        });
        //TODO connect busese/Devices
    };
    System.prototype.getDeviceNames = function () {
        var arrNames = [];
        this.devices.forEach(function (d) {
            arrNames.push(d.name);
        });
        return arrNames;
    };
    System.prototype.getBusNames = function () {
        var arrNames = [];
        this.buses.forEach(function (b) {
            arrNames.push(b.name);
        });
        return arrNames;
    };
    System.prototype.getBus = function (name) {
        this.buses.forEach(function (b) {
            if (b.name == name) {
                return b;
            }
        });
        return undefined;
    };
    return System;
}());
exports.System = System;
