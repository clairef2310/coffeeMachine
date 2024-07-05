import {MachineACafé} from "../src/MachineACafé";
import { Eau } from "../src/Eau";
import {Pièce} from "../src/Pièce";
import {HardwareFake} from "./utilities/HardwareFake";
import "./utilities/HardwareMatchers"
import { MachineACaféBuilder } from "./utilities/MachineACaféBuilder";

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