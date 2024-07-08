import {ButtonCodes, HardwareInterface} from "../../src/hardware/hardware.interface";
import {Pièce} from "../../src/Pièce";

export interface HardwareFakeInterface extends HardwareInterface {
    SimulerInsertionPièce(pièce: Pièce): void;
    CountInvocationsMakeACoffee(): number;
}

export class HardwareFake implements HardwareFakeInterface {
    FlushStoredMoney(): void {
        throw new Error("Method not implemented.");
    }
    CollectStoredMoney(): void {
        throw new Error("Method not implemented.");
    }
    IsCupPresent(): boolean {
        throw new Error("Method not implemented.");
    }
    ProvideCup(): void {
        throw new Error("Method not implemented.");
    }
    RegisterButtonPressedCallback(callback: (buttonCode: ButtonCodes) => void): void {
        throw new Error("Method not implemented.");
    }
    TryPullWater(): boolean {
        return true;
    }
    PourMilk(): boolean {
        throw new Error("Method not implemented.");
    }
    PourWater(): boolean {
        return true;
    }
    PourSugar(): boolean {
        throw new Error("Method not implemented.");
    }

    private _moneyInsertedCallback: (coinValue: number) => void = () => {};
    private _invocationsMakeACoffee: number = 0;

    MakeACoffee(): boolean {
        this._invocationsMakeACoffee ++;
        return true;
    }

    RegisterMoneyInsertedCallback(callback: (coinValue: number) => void): void {
        this._moneyInsertedCallback = callback;
    }

    public SimulerInsertionPièce(pièce: Pièce): void {
        this._moneyInsertedCallback(pièce.getMontant())
    }

    public CountInvocationsMakeACoffee() : number {
        return this._invocationsMakeACoffee;
    }
}