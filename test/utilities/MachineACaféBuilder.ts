import {MachineACafé} from "../../src/MachineACafé";
import {HardwareFake} from "./hardwareFake";
import { LimiteEauDecorator } from "./LimiteEauDecorator";


export class MachineACaféBuilder {
    public static ParDéfaut() {
        return new MachineACaféBuilder().Build()
    }

    public Build() : MachineACafé {
        return new MachineACafé(new HardwareFake())
    }

    public SansEau() : MachineACafé {
        let hardware = new HardwareFake()
        let hardwareAvecPénurieEau = new LimiteEauDecorator(hardware, 0)
        let machineACafé = new MachineACafé(hardwareAvecPénurieEau)

        return machineACafé
    }
}