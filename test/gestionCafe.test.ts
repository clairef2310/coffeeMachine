import { Café } from "../src/Café";
import {Pièce} from "../src/Pièce";
import "./utilities/HardwareMatchers"
import { MachineACaféBuilder } from "./utilities/MachineACaféBuilder";

describe('ÉTANT DONNÉ acheter un café n\'ayant pas de cafe', () => {
    
        test.each([
            [Pièce.CinquanteCentimes, Café.Vide] // Cas nominal avec suffisamment de cafe
        ])
        ('Cas pas de cafe', () => {
            
            // ÉTANT DONNÉ une machine à café avec un réservoir vide
            let machineACafe = new MachineACaféBuilder().PenurieDeCafé().Build();
    
            // QUAND on insere 50cts
            machineACafe.SimulerInsertionPièce(Pièce.CinquanteCentimes);
    
            // ALORS il n'a été demandé au hardware de servir un café
            expect(machineACafe).aucunCaféNEstServi();
    
            // ET l'argent est remboursé
            expect(machineACafe.CountInvocationsFlush()).toEqual(1);
        });
    });

describe('MVP › Cas 2 cafés pas assez de cafe', () => {
    test('Cas 2 cafés pas assez de cafe', () => {
        // ETANT DONNE une machine a café
        let machineACafé = new MachineACaféBuilder().AvecNiveauDeCafé(1).Build();
        
        // QUAND on insère deux fois 50cts
        machineACafé.SimulerInsertionPièce(Pièce.CinquanteCentimes);
        machineACafé.SimulerInsertionPièce(Pièce.CinquanteCentimes);

        // ALORS il n'a été demandé au hardware de servir deux cafés
        expect(machineACafé).unCaféEstServi();

        // ET 50 cts a été encaissé
        expect(machineACafé.CountInvocationsCollect()).toEqual(1);
    });
});