import { Product } from "./product.model";
import { Line } from "src/app/admin/_models/lines.model";
import { Station } from "src/app/admin/_models/station.model";
import { GateDirection } from "./gate-direction.model";
export class GateModel {
    gateTriggerId: Number;
    gateName: String;
    // creationDate: Date;
    modifiedDateTime: Date;
    productId: Product;
    termID1: Product;
    termID2: Product;
    station: Station;
    line: Line;
    direction1: GateDirection;
    direction2: GateDirection;
    gateDirection: {
        id: Number;
        direction: String;
    };
    aisleMode: String;
    emergencyMode: String;
    queLength: String;
    flapSafetyTime: String;
    gateResetTime: String;
    buzzerVolume: String;
    lightIntensity: String;
    sensorInactTime: String;
    mode: String;
    terminalIpAddress1: String;
    activationTime1: String;
    deactivationTime1: String;
    editable1: String;
    entryExitOverride1: String;
    timeModeOverride1: String;
    highSecurityMode1: String;
    terminalIpAddress2: String;
    activationTime2: String;
    deactivationTime2: String;
    editable2: String;
    entryExitOverride2: String;
    timeModeOverride2: String;
    highSecurityMode2: String;

    direction: String;
    actionType: String;
    version: String;
}
