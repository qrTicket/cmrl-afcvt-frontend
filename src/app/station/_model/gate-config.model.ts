import { TerminalConfig } from "./terminal-config.model";
import { GateDirection } from "./gate-direction.model";
export class GateConfig {
    public gcId: number;
    public gateName: string;
    public modeName: string;
    public emergencyModeName: string;
    public directionName: string;
    public aisleModeName: string;
    public highSecurityModeName: string;
    public directionIndicatorName: string;
    public actionType: string;
    public activationTime: string;
    public deactivationTime: string;
    public entryExitOverride: string;
    public timeModeOverride: string;
    public queLength: string;
    public flapTime: string;
    public gateResetTime: string;
    public buzzerVolume: string;
    public lightIntensity: string;
    public sit: string;
    public version: string;
    terminal: TerminalConfig[];
    public updatedDate:Date;
    public deviceId:Number;
    public createdDate:Date;
}
