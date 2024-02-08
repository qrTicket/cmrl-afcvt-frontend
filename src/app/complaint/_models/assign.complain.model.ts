import { Zone } from "../../admin/_models/zone.model";
import { Station } from "../../admin/_models/station.model";
import { MaintenanceStaffList } from '../../complaint/_models/maintenancelist.model';
import { AddUser } from '../../user-manger/_models/addUser.model';
import { ComplainList } from "src/app/maintenance/_models/complainlist.model";

export class Assign {
    id: Number;
    deviceId: String;
    comments: String;
    // remarks: String;
    // accepted: Boolean;
    // zone: Zone;
    // stationId: Station;
    // maintenanceStaffId: AddUser;
    // ticketNumber: ComplainList;
    // createdDate:Date;
}
