import {ButtonCodes} from "../../src/hardware/hardware.interface";
import {HardwareFake, HardwareFakeInterface} from "./HardwareFake";
import {Pièce} from "../../src/Pièce";

export class HardwareFakeDecorator implements HardwareFakeInterface {
    protected _decorated: HardwareFakeInterface;

    public constructor(decorated: HardwareFakeInterface) {
        this._decorated = decorated;
    }

    RegisterMoneyInsertedCallback(callback: (coinValue: number) => void): void {
        this._decorated.RegisterMoneyInsertedCallback(callback)
    }
    FlushStoredMoney(): void {
        this._decorated.FlushStoredMoney()
    }
    CollectStoredMoney(): void {
        this._decorated.CollectStoredMoney()
    }
    IsCupPresent(): boolean {
        return this._decorated.IsCupPresent()
    }
    ProvideCup(): void {
        return this._decorated.ProvideCup()
    }
    RegisterButtonPressedCallback(callback: (buttonCode: ButtonCodes) => void): void {
        return this._decorated.RegisterButtonPressedCallback(callback)
    }
    MakeACoffee(): boolean {
        return this._decorated.MakeACoffee()
    }
    TryPullWater(): boolean {
        return this._decorated.TryPullWater()
    }
    PourMilk(): boolean {
        return this._decorated.PourMilk()
    }
    PourWater(): boolean {
        return this._decorated.PourWater()
    }
    PourSugar(): boolean {
        return this._decorated.PourSugar()
    }
    SimulerInsertionPièce(pièce: Pièce): void {
        this._decorated.SimulerInsertionPièce(pièce);
    }
    CountInvocationsMakeACoffee(){
        return this._decorated.CountInvocationsMakeACoffee();
    }
}

export class EauLimitéeDecorator extends HardwareFakeDecorator {
    private stock: number;
    public constructor(decorated: HardwareFakeInterface, limite: number) {
        super(decorated);
        this.stock = limite
    }

    MakeACoffee(): boolean {
        if(this.stock == 0){
            return false;
        }
        return true;
    }

    PourWater(): boolean {
        if (this.stock > 0) {
            this.stock--;
            return true;
        }
        return false;
    }

    TryPullWater(): boolean {
        if (this.stock > 0) {
            this.stock--;
            return true;
        }
        return false;
    }
}