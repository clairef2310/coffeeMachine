import { Eau } from "../src/Eau";
import {Pièce} from "../src/Pièce";
import "./utilities/HardwareMatchers"
import { MachineACaféBuilder } from "./utilities/MachineACaféBuilder";

describe('ÉTANT DONNÉ acheter un café n\'ayant pas d\'eau', () => {
    
        test('Cas pas d\'eau', () => {
            
            // ÉTANT DONNÉ une machine à café avec un réservoir vide
            let cafe = new MachineACaféBuilder().PenurieDEau().Build();
    
            // QUAND on insere 50cts
            cafe.SimulerInsertionPièce(Pièce.CinquanteCentimes);
    
            // ALORS il n'a été demandé au hardware de servir un café
            expect(cafe).aucunCaféNEstServi();
    
            // ET l'argent est remboursé
            expect(cafe.CountInvocationsFlush()).toEqual(1);
        });
    });

describe('MVP › Cas 2 cafés pas assez d\'eau', () => {
    test('Cas 2 cafés pas assez d\'eau', () => {
        // ETANT DONNE une machine a café
        let machineACafé = new MachineACaféBuilder().AvecNiveauDEau(1).Build();
        
        // QUAND on insère deux fois 50cts
        machineACafé.SimulerInsertionPièce(Pièce.CinquanteCentimes);
        machineACafé.SimulerInsertionPièce(Pièce.CinquanteCentimes);

        // ALORS il n'a été demandé au hardware de servir deux cafés
        expect(machineACafé).unCaféEstServi();

        // ET 50 cts a été encaissé
        expect(machineACafé.CountInvocationsCollect()).toEqual(1);
    });
});