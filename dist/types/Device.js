"use strict";
/**
 *
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeviceInterface = exports.Device = void 0;
var DeviceDesc_1 = require("./DeviceDesc");
var Register_1 = require("./Register");
var Device = /** @class */ (function () {
    function Device(obj, system) {
        var _this = this;
        this.name = '';
        if (system) {
            this.system = system;
        }
        this.name = obj.name;
        if (obj.package)
            this.package = obj.package;
        if (obj.desc) {
            this.desc = new DeviceDesc_1.DeviceDesc(obj.descriptor);
            this.desc.regs.forEach(function (r) {
                _this.addRegister(new Register_1.Register(r));
            });
        }
    }
    Device.prototype.addRegister = function (reg) {
        if (!this.registers) {
            this.registers = [];
        }
        this.registers.push(reg);
    };
    Device.prototype.addInterface = function (iface) {
        if (!this.interfaces) {
            this.interfaces = [];
        }
        this.interfaces.push(iface);
    };
    return Device;
}());
exports.Device = Device;
var DeviceInterface = /** @class */ (function () {
    function DeviceInterface(obj, device) {
        var _a;
        this.device = device;
        if (obj.bus) {
            this.bus = (_a = device.system) === null || _a === void 0 ? void 0 : _a.getBus(obj.bus);
        }
        if (!obj.role)
            this.role = obj.role;
        if (!obj.cs)
            this.cs = obj.cs;
        if (!obj.addr)
            this.addr = obj.addr;
    }
    return DeviceInterface;
}());
exports.DeviceInterface = DeviceInterface;
