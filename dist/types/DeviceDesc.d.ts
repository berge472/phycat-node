export declare class DeviceDesc {
    name: string;
    desc: string;
    category: string;
    datasheet?: string;
    mfr?: string;
    mfr_pn?: string;
    i2c_addr?: number;
    regs: RegDesc[];
    configs: any[];
    nextAddr: number;
    constructor(obj: any);
}
export declare class RegDesc {
    name: string;
    addr: number;
    type: string;
    size: number;
    perm: string;
    desc: string;
    fields: RegFieldDesc[];
    default?: number;
    pattern?: string;
    count: number;
    n: number;
    idx: number;
    constructor(obj: any, idx?: number);
    addField(field: RegFieldDesc): void;
}
export declare class RegFieldDesc {
    name: string;
    desc?: string;
    mask: number;
    offset: number;
    parent?: RegDesc;
    format: string;
    vals: FieldVal[];
    nextVal: number;
    constructor(obj: any, idx?: number);
    addVal(val: FieldVal): void;
}
export declare class FieldVal {
    name: string;
    val?: number;
    desc?: string;
    constructor(obj: any);
}
