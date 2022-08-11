

/**
 * 
 */

import { DataBus } from "./DataBus";
import { DeviceDesc } from "./DeviceDesc";
import { Register } from "./Register";
import { System } from "./System";

export class Device {
    name: string = '';
    registers?: Register[];

    system?: System;
    interfaces?: DeviceInterface[];
    package?:string;

    desc?: DeviceDesc;

    constructor( obj: any, system?: System)
    {
        if(system)
        {
            this.system = system;
        }

        this.name = obj.name;

        if(obj.package)
            this.package = obj.package;

        if(obj.desc)
        {
            this.desc = new DeviceDesc(obj.descriptor);
            this.desc.regs.forEach((r) => {
                this.addRegister(new Register(r));
            })
        }
        
    }

    addRegister(reg: Register)
    {
        if(!this.registers)
        {
            this.registers = [];
        }

        this.registers.push(reg);
    }

    addInterface(iface: DeviceInterface)
    {
        if(!this.interfaces)
        {
            this.interfaces = [];
        }

        this.interfaces.push(iface);
    }
    

}

export class DeviceInterface{

    name?: string;
    bus?: DataBus;
    role?: string;
    cs?: string; 
    addr?: number; 
    device: Device;

    constructor( obj: any, device: Device)
    {

        this.device = device;

        if(obj.bus)
        {
            this.bus = device.system?.getBus(obj.bus);
        }

        if(!obj.role)
            this.role = obj.role;
        if(!obj.cs)
            this.cs = obj.cs;
        if(!obj.addr)
            this.addr = obj.addr;

    }


}
