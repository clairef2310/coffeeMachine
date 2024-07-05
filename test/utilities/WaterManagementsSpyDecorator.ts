import { HardwareFakeDecorator } from "./EauLimitéeDecorator";

export class WaterManagementsSpyDecorator extends HardwareFakeDecorator{

    private _nbInvocationsTryPullWater: number = 0;
    private _nbInvocationsPourWater:number = 0;
}