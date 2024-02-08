import { Shifts } from "./shifts.model";
import { Roles } from "./Roles.model";
import { StationMaster } from "./station-mstr.model";
export class AddUser {
    id: Number;
    name: String;
    username: String;
    password: String;
    email: String;
    empId: String;
    mobileNumber:Number;
    stationCode: StationMaster;
    roles: [
        {
            id: Number;
            roleCode: String;
            roleName: String;
        }
    ];
    createdDate: Date;
    modifyDateTime: Date;
    concanatedRoleCode:String = "";
}
