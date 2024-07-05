import {MachineACafé} from "../../src/MachineACafé";
import {Pièce} from "../../src/Pièce";
import {HardwareFake} from "./HardwareFake";
import { WaterManagementsSpyDecorator } from "./WaterManagementsSpyDecorator";

export class MachineACaféHarness extends MachineACafé {
    private hardware: HardwareFake;

    public constructor(hardware: HardwareFake, surveillanceDosesEau: WaterManagementsSpyDecorator) {
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