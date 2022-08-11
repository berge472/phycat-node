/**
 *
 */
import { DataBus } from "./DataBus";
import { DeviceDesc } from "./DeviceDesc";
import { Register } from "./Register";
import { System } from "./System";
export declare class Device {
    name: string;
    registers?: Register[];
    system?: System;
    interfaces?: DeviceInterface[];
    package?: string;
    desc?: DeviceDesc;
    constructor(obj: any, system?: System);
    addRegister(reg: Register): void;
    addInterface(iface: DeviceInterface): void;
}
export declare class DeviceInterface {
    name?: string;
    bus?: DataBus;
    role?: string;
    cs?: string;
    addr?: number;
    device: Device;
    constructor(obj: any, device: Device);
}
