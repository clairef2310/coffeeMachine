import { Cafe } from "../src/Cafe";
import {Pièce} from "../src/Pièce";
import { CaféLimitéeDecorator} from "./utilities/CaféLimitéeDecorator";
import {HardwareFake} from "./utilities/HardwareFake";
import "./utilities/HardwareMatchers"
import { MachineACaféBuilder } from "./utilities/MachineACaféBuilder";
import { WaterManagementsSpyDecorator } from "./utilities/WaterManagementsSpyDecorator";

describe('ÉTANT DONNÉ acheter un café n\'ayant pas de cafe', () => {
    
        test.each([
            [Pièce.CinquanteCentimes, Cafe.Vide] // Cas nominal avec suffisamment de cafe
        ])
        ('Cas pas de cafe (pièce: %s, cafe: %s)', (pièce:Pièce, cafe:Cafe) => {
            
            // ÉTANT DONNÉ une machine à café avec un réservoir vide
            let machineACafe = new MachineACaféBuilder().PenurieDeCafe().Build();
    
            // QUAND on insere 50cts
            machineACafe.SimulerInsertionPièce(Pièce.CinquanteCentimes);
    
            // ALORS il n'a été demandé au hardware de servir un café
            expect(machineACafe).aucunCaféNEstServi();
    
            // ET l'argent est remboursé
            expect(machineACafe.argentEncaisséEnCentimes).toEqual(0);
        });
    });

describe('MVP › Cas 2 cafés pas assez de cafe', () => {
    test('Cas 2 cafés pas assez de cafe', () => {
        // ETANT DONNE une machine a café
        let machineACafé = new MachineACaféBuilder().AvecNiveauDeCafe(1).Build();
        
        // QUAND on insère deux fois 50cts
        machineACafé.SimulerInsertionPièce(Pièce.CinquanteCentimes);
        machineACafé.SimulerInsertionPièce(Pièce.CinquanteCentimes);

        // ALORS il n'a été demandé au hardware de servir deux cafés
        expect(machineACafé).unCaféEstServi();

        // ET 50 cts a été encaissé
        expect(machineACafé._argentRenduEnCentimes).toEqual(50);
    });
});