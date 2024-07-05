import {MachineACafé} from "../src/MachineACafé";
import {Pièce} from "../src/Pièce";
import {HardwareFake} from "./utilities/hardwareFake";
import "./utilities/HardwareMatchers"

describe("MVP", () => {
    test("Cas nominal", () => {
        // ETANT DONNE une machine a café
        let hardware = new HardwareFake()
        let machineACafé = new MachineACafé(hardware)

        // QUAND on insère 50cts
        hardware.SimulerInsertionPièce(Pièce.CinquanteCentimes)

        // ALORS il a été demandé au hardware de servir un café
        expect(hardware).unCaféEstServi();

        // ET l'argent est encaissé
        expect(machineACafé.argentEncaisséEnCentimes).toEqual(50);
    })

    test("Cas 2 cafés", () => {
        // ETANT DONNE une machine a café
        let hardware = new HardwareFake()
        let machineACafé = new MachineACafé(hardware)

        // QUAND on insère 50cts, 2 fois
        hardware.SimulerInsertionPièce(Pièce.CinquanteCentimes)
        hardware.SimulerInsertionPièce(Pièce.CinquanteCentimes)

        // ALORS il a été demandé au hardware de servir deux cafés
        expect(hardware).xCafésSontServis(2);

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
        Pièce.UnCentime,
        Pièce.DeuxCentimes,
        Pièce.CinqCentimes,
        Pièce.DixCentimes,
        Pièce.VingtCentimes,
        Pièce.CinquanteCentimes,
        Pièce.UnEuro,
        Pièce.DeuxEuros
    ])
    ("Cas plus de 50cts", (pièce: Pièce) => {
        let hardware = new HardwareFake()
        let machineCafé = new MachineACafé.SansEau();

        // QUAND on insère la pièce
        hardware.SimulerInsertionPièce(pièce)

        // ALORS il est demandé au hardware de servir un café
        expect(hardware).unCaféEstServi();

        // ET l'argent est encaissé
        expect(machineCafé.argentEncaisséEnCentimes).toEqual(pièce.getMontant);   
    })
})