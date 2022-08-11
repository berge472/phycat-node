
import { Device } from "./Device";



export class DataBus{
    name: string = ''; 
    type: string = '';

    signals: Signal[] = [];
    devices: Device[] = [];
    channels: DataChannel[] = [];

    constructor( obj: any )
    {
        this.name = obj.name;
        this.type = obj.type;

        if(obj.signals)
        {
            
            obj.signals.forEach((s : any) => {
                this.signals.push(new Signal(s));
            });
        }
        
    }

    handleFrame(frame: number) : void
    {

    }

    hasChannel(id: number ) : boolean
    {

        this.channels.forEach((c) =>{
            if(c.id == id )
            {
                return true;
            }
        })

        return false;
    }

    getDeviceNames() : string[]
    {
        let arrNames:string[] = []

        this.devices.forEach((d)=>{
            arrNames.push(d.name);
        })

        return arrNames;
    }
}

export class Signal{

    name: string; 
    id: number; 

    constructor(obj: any )
    {

        //Normalize 
        this.name = Object.keys(obj)[0];
        this.id = obj[this.name];
    }
}

export class DataChannel{

    name: string = '';
    id = -1;

}

export class I2C_DataBus extends DataBus{

    channelId = -1;

    handleFrame(frame: number) : void
    {
        
    }


}

export class SPI_DataBus extends DataBus{

    misoChannelId = -1;
    mosiChannelId = -1;

    handleFrame(frame: number) : void
    {

    }

}





