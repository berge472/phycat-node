
export class Register {

    name: string ='';
    addr: number = 0; 
    type: string = ''; 
    perm: string = '';
    default: number = 0; 
    valide = false;
    fields: RegisterField[] = [];

    
}

export class RegisterField{
    

    name: string =''; 
    desc?: string; 
    value: number = 0;
    
    
    mask = 0x00000000; 
    offset = 0;
    parent: Register; 
    format = 'hex'
    fieldValues: FieldValue[] = [];


    constructor(parent : Register)
    {
        this.parent = parent;
    }
}

export class FieldValue{

    name: string = '';
    val: number = 0; 
    desc: string = '';

}