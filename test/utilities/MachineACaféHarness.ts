import {MachineACafé} from "../../src/MachineACafé";
import {Pièce} from "../../src/Pièce";
import {HardwareFake} from "./HardwareFake";

export class MachineACaféHarness extends MachineACafé {
    private hardware: HardwareFake;

    public constructor(hardware: HardwareFake) {
        super(hardware);
        this.hardware = hardware;
    }

    public SimulerInsertionPièce(pièce: Pièce) : void{
        this.hardware.SimulerInsertionPièce(pièce)
    }

    public CountInvocationsMakeACoffee() {
        return this.hardware.CountInvocationsMakeACoffee();
    }
}