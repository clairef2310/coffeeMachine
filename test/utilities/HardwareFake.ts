import {ButtonCodes, CoinCodes, HardwareInterface} from "../../src/hardware/hardware.interface";
import {Pièce} from "../../src/Pièce";

export interface HardwareFakeInterface extends HardwareInterface {
    SimulerInsertionPièce(pièce: Pièce): void;

    CountInvocationsMakeACoffee(): number;

    SimulerAppuieSurButton(buttonCode: ButtonCodes): void;
}

export class HardwareFake implements HardwareFakeInterface {
    DropCashback(coin_code: CoinCodes): boolean {
        throw new Error("Method not implemented.");
    }
    SetLungoWarningLedState(state: boolean): void {
        throw new Error("Method not implemented.");
    }
    PourChocolate(): boolean {
        throw new Error("Method not implemented.");
    }
    IsCupPresent(): boolean {
        throw new Error("Method not implemented.");
    }
    ProvideCup(): void {
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
    private _buttonPressedCallback: (buttonCode: ButtonCodes) => void = () => {};
    private _invocationsMakeACoffee: number = 0;
    private _invocationCollect: number = 0;
    private _invocationsFlush: number = 0;

    MakeACoffee(): boolean {
        this._invocationsMakeACoffee ++;
        return true;
    }

    RegisterMoneyInsertedCallback(callback: (coinValue: number) => void): void {
        this._moneyInsertedCallback = callback;
    }

    RegisterButtonPressedCallback(callback: (buttonCode: ButtonCodes) => void): void {
        this._buttonPressedCallback = callback;
    }

    public SimulerInsertionPièce(pièce: Pièce): void {
        this._moneyInsertedCallback(pièce.getMontant())
    }

    public SimulerAppuieSurButton(buttonCode: ButtonCodes): void {
        this._buttonPressedCallback(buttonCode);
    }

    public CountInvocationsMakeACoffee() : number {
        return this._invocationsMakeACoffee;
    }

    FlushStoredMoney(): void {
        this._invocationsFlush++;
    }
    CollectStoredMoney(): void {
        this._invocationCollect++;
    }
}