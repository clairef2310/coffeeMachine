import {ButtonCodes} from "../../src/hardware/hardware.interface";
import {HardwareFake, HardwareFakeInterface} from "./HardwareFake";
import {Pièce} from "../../src/Pièce";
import {HardwareFakeDecorator} from "./EauLimitéeDecorator";

export class CaféLimitéeDecorator extends HardwareFakeDecorator {
    private stock: number;
    private readonly maxStock: number;

    public constructor(decorated: HardwareFakeInterface, limite: number) {
        super(decorated);
        this.stock = limite
        this.maxStock = 5; // Stock maximum d'eau
    }

    MakeACoffee(): boolean {
        if (this.stock > 0) {
            this.stock--;
            return true;
        }
        return false;
    }

    RegisterButtonPressedCallback(callback: (buttonCode: ButtonCodes) => void): void {
        const wrappedCallback = (buttonCode: ButtonCodes) => {
            if (buttonCode === ButtonCodes.BTN_MAINTENANCE_RESET) {
                this.stock = this.maxStock;
            }
            callback(buttonCode);
        };
        this._decorated.RegisterButtonPressedCallback(wrappedCallback);
    }
}