import {ButtonCodes, CoinCodes} from "../../src/hardware/hardware.interface";
import {HardwareFake, HardwareFakeInterface} from "./HardwareFake";
import {Pièce} from "../../src/Pièce";

export class HardwareFakeDecorator implements HardwareFakeInterface {
    protected _decorated: HardwareFakeInterface;

    public constructor(decorated: HardwareFakeInterface) {
        this._decorated = decorated;
    }

    DropCashback(coin_code: CoinCodes): boolean {
        return this._decorated.DropCashback(coin_code);
    }
    SetLungoWarningLedState(state: boolean): void {
        this._decorated.SetLungoWarningLedState(state);
    }
    PourChocolate(): boolean {
        return this._decorated.PourChocolate();
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
    SimulerAppuieSurButton(buttonCode: ButtonCodes): void {
        this._decorated.SimulerAppuieSurButton(buttonCode);
    }
    CountInvocationsMakeACoffee(){
        return this._decorated.CountInvocationsMakeACoffee();
    }
}

export class EauLimitéeDecorator extends HardwareFakeDecorator {
    private stock: number;
    private readonly maxStock: number;

    public constructor(decorated: HardwareFakeInterface, limite: number) {
        super(decorated);
        this.stock = limite;
        this.maxStock = 5; // Stock maximum d'eau
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

    RegisterButtonPressedCallback(callback: (buttonCode: ButtonCodes) => void): void {
        const wrappedCallback = (buttonCode: ButtonCodes) => {
            if (buttonCode === ButtonCodes.BTN_MAINTENANCE_RESET) {
                this.stock = this.maxStock; // Réinitialiser le stock d'eau au maximum
            }
            callback(buttonCode); // Appeler le callback original
        };
        this._decorated.RegisterButtonPressedCallback(wrappedCallback);
    }

}