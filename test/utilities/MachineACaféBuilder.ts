import { MachineACaféHarness } from "./MachineACaféHarness";
import {HardwareFake, HardwareFakeInterface} from "./HardwareFake";
import { WaterHardwareSpy } from "./WaterHardwareSpy";
import {EauLimitéeDecorator} from "./EauLimitéeDecorator";
import { CaféLimitéeDecorator } from "./CaféLimitéeDecorator";

export class MachineACaféBuilder {

    private limite: number | null = null;
    private limitecafé : number | null = null


    public static ParDéfaut() {
        return new MachineACaféBuilder().Build();
    }

    public Build() : MachineACaféHarness {
        let hardware: HardwareFakeInterface = new HardwareFake();
        if(this.limite != null){
            hardware = new EauLimitéeDecorator(hardware, this.limite);
            if(this.limitecafé != null){
                hardware = new CaféLimitéeDecorator(hardware, this.limitecafé)
            }
            
        }

        let waterManagementsSpyDecorator = new WaterHardwareSpy(hardware);

        return new MachineACaféHarness(waterManagementsSpyDecorator, waterManagementsSpyDecorator)
    }

    public PenurieDEau(): this{
        this.limite = 0
        return this
    }

    public AvecNiveauDEau(niveau: number): this {
        this.limite = niveau;
        return this;
    }

    public PenurieDeCafé(): this{
        this.limite = 0
        return this
    }

    public AvecNiveauDeCafé(niveau: number): this {
        this.limite = niveau;
        return this;
    }
}