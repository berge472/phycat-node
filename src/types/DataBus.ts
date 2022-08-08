
import { Device } from "./Device";



export class DataBus{
    name: string = ''; 
    type: string = '';

    devices: Device[] = [];
    channels: DataChannel[] = [];

    constructor( )
    {

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





