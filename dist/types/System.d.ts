import { DataBus } from "./DataBus";
import { Device } from "./Device";
export declare class System {
    name: string;
    buses: DataBus[];
    devices: Device[];
    handleFrame(frame: number): void;
    loadFromFile(path: string): void;
    getDeviceNames(): string[];
    getBusNames(): string[];
    getBus(name: string): DataBus | undefined;
}
