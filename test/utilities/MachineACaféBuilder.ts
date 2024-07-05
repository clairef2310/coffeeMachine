import {MachineACafé} from "../../src/MachineACafé";
import { MachineACaféHarness } from "./MachineACaféHarness";
import {HardwareFake} from "./HardwareFake";
import { EauLimitéeDecorator } from "./EauLimitéeDecorator";

export class MachineACaféBuilder {
    
    private _penurieDEau: boolean = false; 
    private limite: number = 1;

    public static ParDéfaut() {
        return new MachineACaféBuilder().Build()
    }

    public Build() : MachineACaféHarness {
        let hardware: HardwareFake = new HardwareFake();
        if(this._penurieDEau) hardware = new EauLimitéeDecorator(hardware, this.limite);

        return new MachineACaféHarness(hardware)
    }

    public PenurieDEau(): this{
        this._penurieDEau = true
        return this
    }
}