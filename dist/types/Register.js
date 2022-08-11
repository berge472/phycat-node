"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterField = exports.Register = void 0;
var Register = /** @class */ (function () {
    function Register(desc) {
        var _this = this;
        this.valid = false;
        this.fields = [];
        this.desc = desc;
        this.desc.fields.forEach(function (f) {
            _this.fields.push(new RegisterField(f));
        });
    }
    return Register;
}());
exports.Register = Register;
var RegisterField = /** @class */ (function () {
    function RegisterField(desc) {
        this.desc = desc;
    }
    return RegisterField;
}());
exports.RegisterField = RegisterField;
