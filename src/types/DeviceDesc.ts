import { RegDesc, RegFieldDesc } from "./RegDesc";


export class DeviceDesc {
    name: string = '';
    desc: string = '';
    category: string = '';
    datasheet?: string = '';
    mfr?: string = '';
    mfr_pn?: string = '';

    i2c_addr?: number; 

    regs: RegDesc[] = [];
    configs: any[] = [];


    nextAddr = 0;

    constructor(obj: any )
    {
        obj.registers.forEach((r:any) => 
        {
            let idx = 0
            let count =1

            while( idx < count )
            {
                let newReg = new RegDesc(r,idx); 
                if(newReg.addr == 0)
                {
                    newReg.addr = this.nextAddr; 
                    this.nextAddr+= newReg.size; 
                }
                this.regs.push(newReg);
                idx++; 
                count = newReg.count;
            }


        });

        obj.fields.forEach((fr:any) => 
        {
            let pattern = '';
            let fields : string[] = [];
            //normalize  
            if(Object.keys(fr).length == 1)
            {
                pattern = Object.keys(fr)[0];
                fields = fr[pattern];
            }

            this.regs.forEach((r:RegDesc) => {

                if(r.pattern == pattern)
                {
                    fields.forEach((f) =>{
                        let newField = new RegFieldDesc(f);
                        r.addField(newField);
                        
                    });
                }


            })

        });
    }

    
}