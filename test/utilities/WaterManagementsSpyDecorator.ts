import { HardwareFakeDecorator } from "./EauLimitéeDecorator";
import {HardwareFake, HardwareFakeInterface} from "./HardwareFake";

export class WaterManagementsSpyDecorator extends HardwareFakeDecorator {

    private _nbInvocationsTryPullWater: number = 0;
    private _nbInvocationsPourWater:number = 0;
    private _nbInvocationsFlush:number = 0;
    private _nbInvocationsCollect:number = 0;

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

    FlushStoredMoney(): void {
        this._nbInvocationsFlush++;
        return super.FlushStoredMoney();
    }

    CollectStoredMoney(): void {
        this._nbInvocationsCollect++;
        return super.CollectStoredMoney();
    }

    getNbInvocationsTryPullWater(): number {
        return this._nbInvocationsTryPullWater;
    }

    getNbInvocationsPourWater(): number {
        return this._nbInvocationsPourWater;
    }

    getNbInvocationsFlush(): number {
        return this._nbInvocationsFlush;
    }

    getNbInvocationsCollect(): number {
        return this._nbInvocationsCollect;
    }
}