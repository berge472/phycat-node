import { DataBus, I2C_DataBus, SPI_DataBus } from "./DataBus";
import { Device } from "./Device";

const fs = require('fs');
const YAML = require('yaml');
const PATH = require('path');
const request = require('sync-request');

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
        const ymltxt = fs.readFileSync(path).toString();
        const obj = YAML.parse(ymltxt); 

        obj.buses.forEach((b:any) => {
            this.buses.push(new DataBus(b));
        });

        obj.devices.forEach((d : any) =>{

            let dev_obj; 

            if('path' in d)
            {
                let dev_path = PATH.dirname(path) + '/' + d.path;

                let dev_txt = fs.readFileSync(dev_path ).toString();

                dev_obj = YAML.parse(dev_txt);
                d['descriptor'] = dev_obj;
                
            }
            else if ('url' in d)
            {
                let res = request('GET', d['url']);
                if(res.statusCode == 200)
                {
                    let dev_txt = res.getBody().toString();
                    dev_obj = YAML.parse(dev_txt);
                    d['descriptor'] = dev_obj;
                }


            }
            else 
            {
                //No descriptor
            }
            
            try
            {

                this.devices.push(new Device(d, this));
            }
            catch 
            {
                console.error(`Couldnt create Device\n` + JSON.stringify(d));
                
            }

        });


        //TODO connect busese/Devices
    
    }

    getDeviceNames() : string[]
    {
        let arrNames:string[] = []

        this.devices.forEach((d)=>{
            arrNames.push(d.name);
        })

        return arrNames;
    }

    getBusNames() : string[]
    {
        let arrNames:string[] = []

        this.buses.forEach((b)=>{
            arrNames.push(b.name);
        })

        return arrNames;
    }

    getBus(name: string) : DataBus | undefined
    {
        this.buses.forEach((b) =>{
            if(b.name == name)
            {
                return b;
            }
        });

        return undefined;
    }
}