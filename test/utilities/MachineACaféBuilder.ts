import {MachineACafé} from "../../src/MachineACafé";
import {HardwareFake} from "./HardwareFake";

export class MachineACaféBuilder {
    public static ParDéfaut() {
        return new MachineACaféBuilder().Build()
    }

    public Build() : [MachineACafé, HardwareFake]{
        let hrd = new HardwareFake()
        let machineACafé = new MachineACafé(hrd);
        return [machineACafé, hrd] 
    }
}