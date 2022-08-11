import { Device } from "./Device";
export declare class DataBus {
    name: string;
    type: string;
    signals: Signal[];
    devices: Device[];
    channels: DataChannel[];
    constructor(obj: any);
    handleFrame(frame: number): void;
    hasChannel(id: number): boolean;
    getDeviceNames(): string[];
}
export declare class Signal {
    name: string;
    id: number;
    constructor(obj: any);
}
export declare class DataChannel {
    name: string;
    id: number;
}
export declare class I2C_DataBus extends DataBus {
    channelId: number;
    handleFrame(frame: number): void;
}
export declare class SPI_DataBus extends DataBus {
    misoChannelId: number;
    mosiChannelId: number;
    handleFrame(frame: number): void;
}
