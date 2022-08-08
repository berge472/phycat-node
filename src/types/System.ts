import { DataBus, I2C_DataBus, SPI_DataBus } from "./DataBus";

export class System {

    name: string = '';

    buses: DataBus[] = [];

    constructor()
    {
        let i2cTest = new I2C_DataBus();
        let spiTest = new SPI_DataBus();

        this.buses.push(i2cTest);
        this.buses.push(spiTest);
    }
    
    handleFrame(frame: number) : void 
    {
        let channel = (frame & 0xFC) >> 26;
        this.buses.forEach((b) => 
        {
            if(b.channelIDs.includes(channel))
            {
                b.
            }
        })
    }
}