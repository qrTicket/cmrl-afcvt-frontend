import { ProductType } from "./product-type.model";
export class Product {
    id: Number;
    manufactureName: String;
    equipmentModelName: String;
    equipmentCode: String;
    serialNumber: String;
    version: String;
    mfgDate: String;
    expDate: String;
    purchaseDate: String;
    warranty: String;
    equipmentTypeId: ProductType;
    operatorId: String;
    lineId: String;
    stationCode: String;
    createdDate: Date;
    modifyDate: Date;
    appVersion:string;
    warrantyStartDate:string;
    warrantyEndDate:string;
    deviceDescription:string;
}
