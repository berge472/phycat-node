import { RegDesc , RegFieldDesc } from "./DeviceDesc";


export class Register {


    valid = false;
    fields: RegisterField[] = [];
    value?: number;
    desc: RegDesc;


    constructor( desc: RegDesc)
    {
        this.desc = desc;

        this.desc.fields.forEach((f: any) => {
            this.fields.push(new RegisterField(f));
        });
    }

    
}

export class RegisterField{
    
    desc?: RegFieldDesc; 
    value?: number;


    constructor(desc: RegFieldDesc)
    {
        this.desc = desc;
    }
}
