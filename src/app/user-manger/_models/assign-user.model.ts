import { Roles } from "./Roles.model";
import { AddUser } from "./addUser.model";
import { Line } from "../../admin/_models/lines.model";
import { Station } from "../../admin/_models/station.model";
export class AssignUser {
    id: Number;
    createdDate: Date;
    status: Boolean;
    roles: String;
    user: AddUser;
    line: Line;
    station: Station;
}
