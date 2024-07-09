import { MachineACaféHarness } from "./MachineACaféHarness";
import {HardwareFake, HardwareFakeInterface} from "./HardwareFake";
import { WaterManagementsSpyDecorator } from "./WaterManagementsSpyDecorator";
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

        let waterManagementsSpyDecorator = new WaterManagementsSpyDecorator(hardware);

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

    public PenurieCafe(): this{
        this.limite = 0
        return this
    }

    public AvecNiveauCafe(niveau: number): this {
        this.limite = niveau;
        return this;
    }
}