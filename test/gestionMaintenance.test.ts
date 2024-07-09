import {Pièce} from "../src/Pièce";
import "./utilities/HardwareMatchers"
import {MachineACaféBuilder} from "./utilities/MachineACaféBuilder";
import {ButtonCodes} from "../src/hardware/hardware.interface";
import {Eau} from "../src/Eau";

describe('On restock l\'eau', () => {

    test('Cas appuyer sur button pour remplir le réservoir',() => {

        // ÉTANT DONNÉ une machine à café avec un réservoir vide
        let cafe = new MachineACaféBuilder().PenurieDEau().Build();

        // QUAND on appuie sur le bouton puis on met une pièce
        cafe.SimulerAppuieSurButton(ButtonCodes.BTN_MAINTENANCE_RESET);
        cafe.SimulerInsertionPièce(Pièce.CinquanteCentimes);

        // ALORS il a été demandé au hardware de servir un café
        expect(cafe).unCaféEstServi();

        // ET l'argent est encaissé
        expect(cafe.CountInvocationsCollect()).toEqual(1);
    });
});

describe('On peut revider le stock', () => {
    test.each([
        Pièce.CinquanteCentimes,
    ])('Cas vider le stock', (piece:Pièce) => {
        // ETANT DONNE une machine a café
        let machineACafé = new MachineACaféBuilder().PenurieDEau().Build();

        // QUAND on insère deux fois 50cts
        machineACafé.SimulerAppuieSurButton(ButtonCodes.BTN_MAINTENANCE_RESET);
        for(let i = 0; i < Eau.quantitéMax; i++) {
            machineACafé.SimulerInsertionPièce(piece);
        }
        machineACafé.SimulerInsertionPièce(piece);
        // ALORS il a été demandé au hardware de servir 5 cafés
        expect(machineACafé).xCafésSontServis(5);

        // ET 50 cts a été encaissé
        expect(machineACafé.CountInvocationsCollect()).toEqual(5);
        expect(machineACafé.CountInvocationsFlush()).toEqual(1);
    });
});