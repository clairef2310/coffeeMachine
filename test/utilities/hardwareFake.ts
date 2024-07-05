import {ButtonCodes, HardwareInterface} from "../../src/hardware/hardware.interface";
import {Pièce} from "../../src/Pièce";


export class HardwareFake implements HardwareInterface {

    private FlushHasBeenCall: boolean = false;

    FlushStoredMoney(): void {
        
        this.FlushHasBeenCall= true 
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
    TryPullWater(quantite : number): boolean {

        if(quantite <= 0){
            return false
        }
        return true
    }
    PourMilk(): boolean {
        throw new Error("Method not implemented.");
    }
    PourWater(): boolean {
        throw new Error("Method not implemented.");
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

    public CountInvocationsMakeACoffee() {
        return this._invocationsMakeACoffee;
    }
}