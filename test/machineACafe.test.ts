import {MachineACafé} from "../src/MachineACafé";
import { Eau } from "../src/Eau";
import {Pièce} from "../src/Pièce";
import {HardwareFake} from "./utilities/HardwareFake";
import "./utilities/HardwareMatchers"
import { MachineACaféBuilder } from "./utilities/MachineACaféBuilder";

describe("MVP", () => {
    test("Cas nominal", () => {
        // ETANT DONNE une machine a café
        let cafe = MachineACaféBuilder.ParDéfaut();

        // QUAND on insère 50cts
        cafe[1].SimulerInsertionPièce(Pièce.CinquanteCentimes)

        // ALORS il a été demandé au hardware de servir un café
        expect(cafe[1]).unCaféEstServi();

        // ET l'argent est encaissé
        expect(cafe[0].argentEncaisséEnCentimes).toEqual(50);
    })

    test("Cas 2 cafés", () => {
        // ETANT DONNE une machine a café
        let cafe = MachineACaféBuilder.ParDéfaut();

        // QUAND on insère 50cts, 2 fois
        cafe[1].SimulerInsertionPièce(Pièce.CinquanteCentimes)
        cafe[1].SimulerInsertionPièce(Pièce.CinquanteCentimes)

        // ALORS il a été demandé au hardware de servir deux cafés
        expect(cafe[0]).xCafésSontServis(2);

        // ET l'argent est encaissé
        expect(cafe[0].argentEncaisséEnCentimes).toEqual(100);
    })

    test.each([
        Pièce.UnCentime,
        Pièce.DeuxCentimes,
        Pièce.CinqCentimes,
        Pièce.DixCentimes,
        Pièce.VingtCentimes,
    ])
    ("Cas pas assez argent : %s", (pièce: Pièce) => {
        // ETANT DONNE une machine a café
        // ET une pièce d'une valeur inférieure 50cts
        let hardware = new HardwareFake()
        let machineACafé = new MachineACafé(hardware)

        // QUAND on insère la pièce
        hardware.SimulerInsertionPièce(pièce)

        // ALORS il n'a pas été demandé au hardware de servir un café
        expect(hardware).aucunCaféNEstServi();

        // ET l'argent n'est pas encaissé
        expect(machineACafé.argentEncaisséEnCentimes).toEqual(0);
    })

    // TODO : Plus de 50cts
    test.each([
        Pièce.CinquanteCentimes,
        Pièce.UnEuro,
        Pièce.DeuxEuros,
    ])
    ("Cas nominal : %s", (pièce: Pièce) => {
        // ETANT DONNE une machine a café
        // ET une pièce d'une valeur supérieure à 50cts
        let cafe = MachineACaféBuilder.ParDéfaut();

        // QUAND on insère la pièce
        cafe[1].SimulerInsertionPièce(pièce)

        // ALORS il a été demandé au hardware de servir un café
        expect(cafe[1]).unCaféEstServi();

        // ET l'argent est encaissé
        expect(cafe[0].argentEncaisséEnCentimes).toEqual(pièce.getMontant());
    })

    describe('ÉTANT DONNÉ une machine à café avec un réservoir d\'eau limité', () => {
    
        test.each([
            [Pièce.CinquanteCentimes, Eau.Plein] // Cas nominal avec suffisamment d'eau
        ])
        ('Cas nominal (eau: %s)', (pièce:Pièce, eau:Eau) => {
            
            // ÉTANT DONNÉ une machine à café avec un réservoir d'eau limité
            let cafe = MachineACaféBuilder.ParDéfaut();
    
            // QUAND il y a assez d'eau
            cafe[1].PourWater();
    
            // ALORS il a été demandé au hardware de servir un café
            expect(cafe[1]).unCaféEstServi();
    
            // ET l'argent est encaissé
            expect(cafe[0].argentEncaisséEnCentimes).toEqual(pièce.getMontant());
        });
    });
    
})