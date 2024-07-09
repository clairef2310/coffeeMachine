import {MachineACafé} from "../../src/MachineACafé";
import {Pièce} from "../../src/Pièce";
import {HardwareFake, HardwareFakeInterface} from "./HardwareFake";
import { WaterManagementsSpyDecorator } from "./WaterManagementsSpyDecorator";
import {ButtonCodes} from "../../src/hardware/hardware.interface";

export class MachineACaféHarness extends MachineACafé {
    private hardware: HardwareFakeInterface;
    private spy: WaterManagementsSpyDecorator;

    public constructor(hardware: HardwareFakeInterface, surveillanceDosesEau: WaterManagementsSpyDecorator) {
        super(hardware);
        this.hardware = hardware;
        this.spy = surveillanceDosesEau;
    }

    public SimulerInsertionPièce(pièce: Pièce) : void{
        this.hardware.SimulerInsertionPièce(pièce)
    }

    public SimulerAppuieSurButton(buttonCode : ButtonCodes): void {
        this.hardware.SimulerAppuieSurButton(buttonCode);
    }

    public CountInvocationsMakeACoffee() {
        return this.hardware.CountInvocationsMakeACoffee();
    }

    public CountInvocationsCollect() {
        return this.spy.getNbInvocationsCollect();
    }

    public CountInvocationsFlush() {
        return this.spy.getNbInvocationsFlush();
    }
}