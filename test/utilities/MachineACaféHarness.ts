import {MachineACafé} from "../../src/MachineACafé";
import {Pièce} from "../../src/Pièce";
import {HardwareFake, HardwareFakeInterface} from "./HardwareFake";
import { WaterManagementsSpyDecorator } from "./WaterManagementsSpyDecorator";

export class MachineACaféHarness extends MachineACafé {
    private hardware: HardwareFakeInterface;

    public constructor(hardware: HardwareFakeInterface, surveillanceDosesEau: WaterManagementsSpyDecorator) {
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