import {ButtonCodes, HardwareInterface} from "../../src/hardware/hardware.interface";

export class LimiteEauDecorator implements HardwareInterface {

    private _decorated: HardwareInterface;
    private _stock: number;

    public constructor(decorated: HardwareInterface, limite: number) {
        this._decorated = decorated;
        this._stock = limite;
    }

    RegisterMoneyInsertedCallback(callback: (coinValue: number) => void): void {
        throw new Error("Method not implemented.");
    }
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
        this._decorated.ProvideCup()
    }
    RegisterButtonPressedCallback(callback: (buttonCode: ButtonCodes) => void): void {
        throw new Error("Method not implemented.");
    }

    MakeACoffee(): boolean {
        return this._decorated.MakeACoffee()
    }
    TryPullWater(): boolean {
        let uneDoseRestante = this._stock > 0
        this._stock --
        return uneDoseRestante
    }
    PourMilk(): boolean {
        return this._decorated.PourMilk()
    }
    PourWater(): boolean {
        let uneDoseRestante = this._stock > 0
        this._stock --
        return uneDoseRestante
    }

    PourSugar(): boolean {
        return this._decorated.PourSugar()
    }

}