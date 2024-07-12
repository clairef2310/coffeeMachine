import {MachineACafé} from "../../src/MachineACafé";
import {Pièce} from "../../src/Pièce";
import {HardwareFake, HardwareFakeInterface} from "./HardwareFake";
import { WaterHardwareSpy } from "./WaterHardwareSpy";
import {ButtonCodes} from "../../src/hardware/hardware.interface";

export class MachineACaféHarness extends MachineACafé {
    private hardware: HardwareFakeInterface;
    private spy: WaterHardwareSpy;

    public constructor(hardware: HardwareFakeInterface, surveillanceDosesEau: WaterHardwareSpy) {
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