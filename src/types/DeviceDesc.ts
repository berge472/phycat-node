
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



const sizeDict  = new Map<string, number> ([
    [ "uint8" , 1],
    [ "int8" , 1],
    [ "char" , 1],
    [ "uint16" , 2],
    [ "int16" , 2],
    [ "uint32" , 4],
    [ "int32" , 4],
    [ "int64" , 8],
    [ "uint64" , 8],
    [ "int" , 4],
    [ "string" , 16]
 ]);
 
 export class RegDesc {
 
     name: string ='';
     addr: number = 0; 
     type: string = ''; 
     size: number = 0;
     perm: string = '';
     desc: string ='';
     fields: RegFieldDesc[] = [];
 
     default?: number; 
     pattern?: string;
     count = 1;
     n = 0;
     idx = 0
 
     constructor(obj: any, idx =0  )
     {
         //Normalize 
         if(Object.keys(obj).length == 1)
         {
             obj[Object.keys(obj)[0]]['name'] = Object.keys(obj)[0];
             obj = obj[Object.keys(obj)[0]];
         }
 
         this.name = obj.name;
 
         // n is the starting index for repeating register patterns
         if( 'n' in obj)
         {
             idx+= obj.n 
             this.n = obj.n
 
         }
 
         this.idx = idx;
 
         //If register is a repeating pattern
         if(this.name.includes('$n'))
         {
             this.pattern = this.name;
             this.name = this.name.replace('$n', idx.toString());
         }
         else
         {
             this.pattern = this.name;
         }
 
         if( 'type' in obj)
         {
             this.type = obj.type.replace('_t','');
             this.size = sizeDict.get(this.type) as number;
         }
         if( 'desc' in obj)
         {
             this.desc = obj.desc.replace('$n', idx.toString());
         }
         if( 'size' in obj)
             this.size = obj.size;
         if( 'default' in obj)
             this.default = obj.default;
         if( 'perm' in obj)
             this.perm = obj.perm;
         if( 'count' in obj)
             this.count = obj.count;
     }
 
 
     addField(field: RegFieldDesc)
     {
         this.fields.push(field);
     }
 
     
 }
 
 export class RegFieldDesc{
     
 
     name: string =''; 
     desc?: string; 
     
     
     mask = 0x00000000; 
     offset = 0;
     parent?: RegDesc; 
     format = 'hex'
     vals: FieldVal[] = [];
 
     nextVal =0;
 
 
     constructor(obj: any, idx = 0)
     {
         //Normalize 
         if(Object.keys(obj).length == 1)
         {
             obj[Object.keys(obj)[0]]['name'] = Object.keys(obj)[0];
             obj = obj[Object.keys(obj)[0]];
         }
 
         this.name = obj.name; 
         
         if( 'desc' in obj)
             this.desc = obj.desc;
         if( 'mask' in obj)
         {
             this.mask = obj.mask;
             
             if(this.mask != 0)
             {
                 let tmp = this.mask;
                 while(( tmp & 0x01) == 0)
                 {
                     tmp = tmp >> 1;
                     this.offset+=1;
                 }
 
             }
 
 
         }
         if( 'bit' in obj)
         {
             this.mask = 1 << obj.bit; 
             this.offset = obj.bit;
         }
  
  
         if( 'vals' in obj)
         {
             obj.vals.forEach((v : any) =>{
                 let newVal = new FieldVal(v);
                 if( newVal.val === undefined)
                 {
                     newVal.val = this.nextVal; 
                     this.nextVal+=1;
                 }
                 else 
                 {
                     this.nextVal = newVal.val+1;
                 }
 
                 this.addVal(newVal);
             })
         }
 
 
 
     }
 
     addVal(val :FieldVal)
     {
         this.vals.push(val);
     }
 
 
 }
 
 export class FieldVal{
 
     name: string = '';
     val?: number;
     desc?: string ;
 
     constructor(obj:any)
     {
         //Normalize 
         if(typeof(obj) == 'string')
         {
             this.name = obj;
         }
         else if(Object.keys(obj).length == 1)
         {
             this.name = Object.keys(obj)[0];
             obj = obj[this.name];
 
             if(typeof(obj) === 'number')
             {
                 this.val = obj;
             }
             else 
             {
                 if( 'desc' in obj)
                     this.desc = obj.desc;
                 if( 'val' in obj)
                     this.val = obj.val
             }
         }
        
 
     }
 
 }