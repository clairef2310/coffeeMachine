import {Pièce} from "../src/Pièce";
import "./utilities/HardwareMatchers"
import {MachineACaféBuilder} from "./utilities/MachineACaféBuilder";

describe("MVP", () => {
    test("Cas 2 cafés", () => {
        // ETANT DONNE une machine a café
        let machineACafé = MachineACaféBuilder.ParDéfaut();

        // QUAND on insère 50cts, 2 fois
        machineACafé.SimulerInsertionPièce(Pièce.CinquanteCentimes);
        machineACafé.SimulerInsertionPièce(Pièce.CinquanteCentimes);

        // ALORS il a été demandé au hardware de servir deux cafés
        expect(machineACafé).xCafésSontServis(2);

        // ET l'argent est encaissé
        expect(machineACafé.argentEncaisséEnCentimes).toEqual(100);
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
        let machineACafé = MachineACaféBuilder.ParDéfaut()

        // QUAND on insère la pièce
        machineACafé.SimulerInsertionPièce(pièce)

        // ALORS il n'a pas été demandé au hardware de servir un café
        expect(machineACafé).aucunCaféNEstServi();

        // ET l'argent n'est pas encaissé
        expect(machineACafé.argentEncaisséEnCentimes).toEqual(0);
    })

    test.each([
        Pièce.CinquanteCentimes,
        Pièce.UnEuro,
        Pièce.DeuxEuros,
    ])
    ("Cas nominal : %s", (pièce: Pièce) => {
        // ETANT DONNE une machine a café
        // ET une pièce d'une valeur supérieure à 50cts
        let machineACafé = MachineACaféBuilder.ParDéfaut()

        // QUAND on insère la pièce
        machineACafé.SimulerInsertionPièce(pièce)

        // ALORS il a été demandé au hardware de servir un café
        expect(machineACafé).unCaféEstServi();

        // ET l'argent est encaissé
        expect(machineACafé.argentEncaisséEnCentimes).toEqual(pièce.getMontant());
    })

    //TODO : Citerne ne contient plus assez d'eau 
    test("Cas plus d'eau", (pièce: Pièce) => {
        // ETANT DONNE une machine a café
        let hardware = new HardwareFake()
        let machineACafé = new MachineACafé(hardware)

        // QUAND on insère la pièce
        hardware.SimulerInsertionPièce(pièce)

        // ALORS on vérifie que l'eau vient d'une citerne 
        expect(hardware).estUneCiterne();

        // ALORS on vérifie qu'il n'y a pas assez d'eau
        expect(hardware).pasAssezDEau();

        // ET l'argent est rendu
        expect(machineACafé.argentRendu());
    })
})  