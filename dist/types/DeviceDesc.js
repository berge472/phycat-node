"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FieldVal = exports.RegFieldDesc = exports.RegDesc = exports.DeviceDesc = void 0;
var DeviceDesc = /** @class */ (function () {
    function DeviceDesc(obj) {
        var _this = this;
        this.name = '';
        this.desc = '';
        this.category = '';
        this.datasheet = '';
        this.mfr = '';
        this.mfr_pn = '';
        this.regs = [];
        this.configs = [];
        this.nextAddr = 0;
        obj.registers.forEach(function (r) {
            var idx = 0;
            var count = 1;
            while (idx < count) {
                var newReg = new RegDesc(r, idx);
                if (newReg.addr == 0) {
                    newReg.addr = _this.nextAddr;
                    _this.nextAddr += newReg.size;
                }
                _this.regs.push(newReg);
                idx++;
                count = newReg.count;
            }
        });
        obj.fields.forEach(function (fr) {
            var pattern = '';
            var fields = [];
            //normalize  
            if (Object.keys(fr).length == 1) {
                pattern = Object.keys(fr)[0];
                fields = fr[pattern];
            }
            _this.regs.forEach(function (r) {
                if (r.pattern == pattern) {
                    fields.forEach(function (f) {
                        var newField = new RegFieldDesc(f);
                        r.addField(newField);
                    });
                }
            });
        });
    }
    return DeviceDesc;
}());
exports.DeviceDesc = DeviceDesc;
var sizeDict = new Map([
    ["uint8", 1],
    ["int8", 1],
    ["char", 1],
    ["uint16", 2],
    ["int16", 2],
    ["uint32", 4],
    ["int32", 4],
    ["int64", 8],
    ["uint64", 8],
    ["int", 4],
    ["string", 16]
]);
var RegDesc = /** @class */ (function () {
    function RegDesc(obj, idx) {
        if (idx === void 0) { idx = 0; }
        this.name = '';
        this.addr = 0;
        this.type = '';
        this.size = 0;
        this.perm = '';
        this.desc = '';
        this.fields = [];
        this.count = 1;
        this.n = 0;
        this.idx = 0;
        //Normalize 
        if (Object.keys(obj).length == 1) {
            obj[Object.keys(obj)[0]]['name'] = Object.keys(obj)[0];
            obj = obj[Object.keys(obj)[0]];
        }
        this.name = obj.name;
        // n is the starting index for repeating register patterns
        if ('n' in obj) {
            idx += obj.n;
            this.n = obj.n;
        }
        this.idx = idx;
        //If register is a repeating pattern
        if (this.name.includes('$n')) {
            this.pattern = this.name;
            this.name = this.name.replace('$n', idx.toString());
        }
        else {
            this.pattern = this.name;
        }
        if ('type' in obj) {
            this.type = obj.type.replace('_t', '');
            this.size = sizeDict.get(this.type);
        }
        if ('desc' in obj) {
            this.desc = obj.desc.replace('$n', idx.toString());
        }
        if ('size' in obj)
            this.size = obj.size;
        if ('default' in obj)
            this.default = obj.default;
        if ('perm' in obj)
            this.perm = obj.perm;
        if ('count' in obj)
            this.count = obj.count;
    }
    RegDesc.prototype.addField = function (field) {
        this.fields.push(field);
    };
    return RegDesc;
}());
exports.RegDesc = RegDesc;
var RegFieldDesc = /** @class */ (function () {
    function RegFieldDesc(obj, idx) {
        if (idx === void 0) { idx = 0; }
        var _this = this;
        this.name = '';
        this.mask = 0x00000000;
        this.offset = 0;
        this.format = 'hex';
        this.vals = [];
        this.nextVal = 0;
        //Normalize 
        if (Object.keys(obj).length == 1) {
            obj[Object.keys(obj)[0]]['name'] = Object.keys(obj)[0];
            obj = obj[Object.keys(obj)[0]];
        }
        this.name = obj.name;
        if ('desc' in obj)
            this.desc = obj.desc;
        if ('mask' in obj) {
            this.mask = obj.mask;
            if (this.mask != 0) {
                var tmp = this.mask;
                while ((tmp & 0x01) == 0) {
                    tmp = tmp >> 1;
                    this.offset += 1;
                }
            }
        }
        if ('bit' in obj) {
            this.mask = 1 << obj.bit;
            this.offset = obj.bit;
        }
        if ('vals' in obj) {
            obj.vals.forEach(function (v) {
                var newVal = new FieldVal(v);
                if (newVal.val === undefined) {
                    newVal.val = _this.nextVal;
                    _this.nextVal += 1;
                }
                else {
                    _this.nextVal = newVal.val + 1;
                }
                _this.addVal(newVal);
            });
        }
    }
    RegFieldDesc.prototype.addVal = function (val) {
        this.vals.push(val);
    };
    return RegFieldDesc;
}());
exports.RegFieldDesc = RegFieldDesc;
var FieldVal = /** @class */ (function () {
    function FieldVal(obj) {
        this.name = '';
        //Normalize 
        if (typeof (obj) == 'string') {
            this.name = obj;
        }
        else if (Object.keys(obj).length == 1) {
            this.name = Object.keys(obj)[0];
            obj = obj[this.name];
            if (typeof (obj) === 'number') {
                this.val = obj;
            }
            else {
                if ('desc' in obj)
                    this.desc = obj.desc;
                if ('val' in obj)
                    this.val = obj.val;
            }
        }
    }
    return FieldVal;
}());
exports.FieldVal = FieldVal;
