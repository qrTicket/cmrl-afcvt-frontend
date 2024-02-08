import { Product } from "./product.model";
import { Station } from "../../admin/_models/station.model";
import { Line } from '../../admin/_models/lines.model';
import { PTO } from '../../auth_models/pto.model';
export class Equipment {
    id: Number;
    deployedEquipmentCode: string;
    equipmentName: String;
    status: String;
    blacklist: Boolean;
    equipmentIpAddress: String;
    equipmentNumber: String;
    direction: {
        id: Number;
        direction: String;
    };
    installationDateTime: Date;
    modifyDateTime: Date;
    product: Product;
    station: Station;
    line: Line;
    operatorName: PTO;
}
