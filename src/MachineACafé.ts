import {Pièce} from "./Pièce";
import {ButtonCodes, HardwareInterface} from "./hardware/hardware.interface";
import {Eau} from "./Eau";

export interface MachineACaféInterface{
    
}

export class MachineACafé {
    private readonly _hardware: HardwareInterface;

    constructor(hardware: HardwareInterface) {
        hardware.RegisterMoneyInsertedCallback((montant: number) => {
            this.insérer(Pièce.Parse(montant))
        })

        hardware.RegisterButtonPressedCallback((buttonCode: ButtonCodes) => {
            this.appuyer(buttonCode);
        })

        this._hardware = hardware
    }

    private static readonly PrixDuCafé = Pièce.CinquanteCentimes;

    argentEncaisséEnCentimes: number = 0;

    private insérer(pièce: Pièce) {
        if (pièce.EstInférieureA(MachineACafé.PrixDuCafé)) return;

        if(this._hardware.TryPullWater() == true){
            this._hardware.MakeACoffee();
            this._hardware.CollectStoredMoney();

        }else{
            this._hardware.FlushStoredMoney();
        }

    }

    private appuyer(buttonCode: ButtonCodes) {
        this._hardware.RegisterButtonPressedCallback(()=>{return buttonCode});
    }
}