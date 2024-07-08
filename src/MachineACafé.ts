import {Pièce} from "./Pièce";
import {HardwareInterface} from "./hardware/hardware.interface";
import {Eau} from "./Eau";

export interface MachineACaféInterface{
    
}

export class MachineACafé {
    private readonly _hardware: HardwareInterface;

    constructor(hardware: HardwareInterface) {
        hardware.RegisterMoneyInsertedCallback((montant: number) => {
            this.insérer(Pièce.Parse(montant))
        })

        this._hardware = hardware
    }

    private static readonly PrixDuCafé = Pièce.CinquanteCentimes;
    private static readonly QuantiteDEau = Eau.Plein;

    argentEncaisséEnCentimes: number = 0;
    _argentRenduEnCentimes: number = 0;

    private insérer(pièce: Pièce) {
        if (pièce.EstInférieureA(MachineACafé.PrixDuCafé)) return;

        if(this._hardware.TryPullWater() == true){
            this._hardware.MakeACoffee();
            this.argentEncaisséEnCentimes += pièce.getMontant();

        }else{
            this._argentRenduEnCentimes = this.argentEncaisséEnCentimes
        }

    }
}