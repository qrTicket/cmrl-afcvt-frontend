import { Zone } from '../../admin/_models/zone.model';
import { Station } from '../../admin/_models/station.model';
import { MaintenanceStaffList } from '../../complaint/_models/maintenancelist.model';
import { ComplainList } from '../../complaint/_models/complainlist.model';

export class ComplainAssignList {
    id: Number;
    accepted: boolean;
    remarks: String;
    stationId: Station;
    zone: Zone;
    maintenanceStaffId: MaintenanceStaffList;
    ticketNumber: ComplainList;
}
