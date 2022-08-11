"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.SPI_DataBus = exports.I2C_DataBus = exports.DataChannel = exports.Signal = exports.DataBus = void 0;
var DataBus = /** @class */ (function () {
    function DataBus(obj) {
        var _this = this;
        this.name = '';
        this.type = '';
        this.signals = [];
        this.devices = [];
        this.channels = [];
        this.name = obj.name;
        this.type = obj.type;
        if (obj.signals) {
            obj.signals.forEach(function (s) {
                _this.signals.push(new Signal(s));
            });
        }
    }
    DataBus.prototype.handleFrame = function (frame) {
    };
    DataBus.prototype.hasChannel = function (id) {
        this.channels.forEach(function (c) {
            if (c.id == id) {
                return true;
            }
        });
        return false;
    };
    DataBus.prototype.getDeviceNames = function () {
        var arrNames = [];
        this.devices.forEach(function (d) {
            arrNames.push(d.name);
        });
        return arrNames;
    };
    return DataBus;
}());
exports.DataBus = DataBus;
var Signal = /** @class */ (function () {
    function Signal(obj) {
        //Normalize 
        this.name = Object.keys(obj)[0];
        this.id = obj[this.name];
    }
    return Signal;
}());
exports.Signal = Signal;
var DataChannel = /** @class */ (function () {
    function DataChannel() {
        this.name = '';
        this.id = -1;
    }
    return DataChannel;
}());
exports.DataChannel = DataChannel;
var I2C_DataBus = /** @class */ (function (_super) {
    __extends(I2C_DataBus, _super);
    function I2C_DataBus() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.channelId = -1;
        return _this;
    }
    I2C_DataBus.prototype.handleFrame = function (frame) {
    };
    return I2C_DataBus;
}(DataBus));
exports.I2C_DataBus = I2C_DataBus;
var SPI_DataBus = /** @class */ (function (_super) {
    __extends(SPI_DataBus, _super);
    function SPI_DataBus() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.misoChannelId = -1;
        _this.mosiChannelId = -1;
        return _this;
    }
    SPI_DataBus.prototype.handleFrame = function (frame) {
    };
    return SPI_DataBus;
}(DataBus));
exports.SPI_DataBus = SPI_DataBus;
