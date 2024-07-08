import { Eau } from "../src/Eau";
import {Pièce} from "../src/Pièce";
import { EauLimitéeDecorator} from "./utilities/EauLimitéeDecorator";
import {HardwareFake} from "./utilities/HardwareFake";
import "./utilities/HardwareMatchers"
import { MachineACaféBuilder } from "./utilities/MachineACaféBuilder";
import { WaterManagementsSpyDecorator } from "./utilities/WaterManagementsSpyDecorator";

describe('ÉTANT DONNÉ acheter un café n\'ayant pas d\'eau', () => {
    
        test.each([
            [Pièce.CinquanteCentimes, Eau.Vide] // Cas nominal avec suffisamment d'eau
        ])
        ('Cas pas d\'eau (eau: %s)', (pièce:Pièce, eau:Eau) => {
            
            // ÉTANT DONNÉ une machine à café avec un réservoir vide
            let cafe = new MachineACaféBuilder().PenurieDEau().Build();
    
            // QUAND on insere 50cts
            cafe.SimulerInsertionPièce(Pièce.CinquanteCentimes);
    
            // ALORS il n'a été demandé au hardware de servir un café
            expect(cafe).aucunCaféNEstServi();
    
            // ET l'argent est remboursé
            expect(cafe.argentEncaisséEnCentimes).toEqual(0);
        });
    });

describe('MVP › Cas 2 cafés pas assez d\'eau', () => {
    test('Cas 2 cafés pas assez d\'eau', () => {
        // ETANT DONNE une machine a café
        let hardwareFake = new HardwareFake();
        let eaulimitee = new EauLimitéeDecorator(hardwareFake, 1);
        let spyDecorator = new WaterManagementsSpyDecorator(eaulimitee);
        let machineACafé = new MachineACaféBuilder().AvecNiveauDEau(1).Build();
        
        // QUAND on insère 1 euro
        spyDecorator.SimulerInsertionPièce(Pièce.UnEuro);
        spyDecorator.TryPullWater();
        spyDecorator.MakeACoffee();
        spyDecorator.TryPullWater();
        spyDecorator.MakeACoffee();

        // ALORS il n'a été demandé au hardware de servir deux cafés
        expect(machineACafé).unCaféEstServi();

        // ET 50 cts a été encaissé
        expect(machineACafé.argentEncaisséEnCentimes).toEqual(50);
    });
});