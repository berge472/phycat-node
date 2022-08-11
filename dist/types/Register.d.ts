import { RegDesc, RegFieldDesc } from "./DeviceDesc";
export declare class Register {
    valid: boolean;
    fields: RegisterField[];
    value?: number;
    desc: RegDesc;
    constructor(desc: RegDesc);
}
export declare class RegisterField {
    desc?: RegFieldDesc;
    value?: number;
    constructor(desc: RegFieldDesc);
}
