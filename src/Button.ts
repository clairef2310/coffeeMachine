import { ButtonCodes } from "./hardware/hardware.interface";

export class Button {
    private readonly buttonCode: ButtonCodes;

    constructor(buttonCode: ButtonCodes) {
        this.buttonCode = buttonCode;
    }

    getButtonCode(): ButtonCodes {
        return this.buttonCode;
    }

    public toString(): string {
        return ButtonCodes[this.buttonCode];
    }
}
