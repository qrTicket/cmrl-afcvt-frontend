import { StationMaster } from "src/app/user-manger/_models/station-mstr.model";

export class AddUsermanager {
    id?: Number;
    name: String;
    username: String;
    password: String;
    email: String;
    empId: String;
    stationCode?: StationMaster;
    roles: [
        {
            id: Number;
            roleCode: String;
            roleName: String;
        }
    ];
    createdDate?: Date;
    modifyDateTime?: Date;
    concanatedRoleCode?:String = "";
    // roles?: [
    //     {
    //         id: Number;
    //         roleCode: String;
    //         roleName: String;
    //     }
    // ];
}
