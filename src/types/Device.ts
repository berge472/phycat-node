

/**
 * 
 */

import { DeviceDesc } from "./DeviceDesc";
import { Register } from "./Register";

export class Device {
    name: string = '';
    registers: Register[] = [];
    role: string = 'slave';

    //I2C Config
    i2c_address?: number; 

    //SPI config 
    cs_signal?: number; 
    cs_active_low?: boolean; 


    reg_addr_size?: number;
    
    datasheet?: string; 
    digikey_pn?: string;

    desc: DeviceDesc;

    constructor( obj: any)
    {
        this.desc = new DeviceDesc(obj.descriptor);
    }

}
