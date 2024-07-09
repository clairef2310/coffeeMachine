import { HardwareFakeDecorator } from "./EauLimitéeDecorator";
import {HardwareFake, HardwareFakeInterface} from "./HardwareFake";

export class CoffeManagementsSpyDecorator extends HardwareFakeDecorator {

    private _nbInvocationsTryPullWater: number = 0;
    private _nbInvocationsPourWater:number = 0;

    constructor(hardware: HardwareFakeInterface) {
        super(hardware);
    }

    TryPullWater(): boolean {
        this._nbInvocationsTryPullWater++;
        return super.TryPullWater();
    }

    PourWater(): boolean {
        this._nbInvocationsPourWater++;
        return super.PourWater();
    }

    getNbInvocationsTryPullWater(): number {
        return this._nbInvocationsTryPullWater;
    }

    getNbInvocationsPourWater(): number {
        return this._nbInvocationsPourWater;
    }
}