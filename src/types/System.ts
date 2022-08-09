import { DataBus, I2C_DataBus, SPI_DataBus } from "./DataBus";
import { Device } from "./Device";

const fs = require('fs');
const YAML = require('yaml');
const PATH = require('path');

export class System {

    name: string = '';

    buses: DataBus[] = [];
    devices: Device[] = [];

    
    handleFrame(frame: number) : void 
    {
        let channel = (frame & 0xFC) >> 26;
        this.buses.forEach((b) => 
        {
            // if(b.channelIDs.includes(channel))
            // {
            //     b.
            // }
        })
    }

    loadFromFile(path: string)
    {
        const ymltxt = fs.readFileSync('./data/system.yml').toString();
        const obj = YAML.parse(ymltxt); 

        obj.devices.forEach((d : any) =>{

            if('path' in d)
            {
                let dev_path = PATH.dirname(path) + '/' + d.path;

                let dev_txt = fs.readFileSync(dev_path ).toString();

                const dev_obj = YAML.parse(dev_txt);


                d['descriptor'] = dev_obj;
                this.devices.push(new Device(d));
                
            }
            else if ('url' in d)
            {

            }
            else 
            {

            }


            


        });
    
        
    
        console.log(obj);
    }
}