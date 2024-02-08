import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { DatePipe } from "@angular/common";
import { environment } from "../../../environments/environment";
import { Shifts } from "../_models/shifts.model";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { data } from "jquery";
@Injectable({
    providedIn: "root",
})
export class ShiftsService {
    constructor(private http: HttpClient, private datePipe: DatePipe) {}
    private token: string = localStorage.getItem("token");
    private httpOptions = {
        headers: new HttpHeaders({
            Authorization: `Bearer ${this.token}`,
            "Content-Type": "application/json",
        }),
    };

    addShifts(payload: any): Observable<any> {
        return this.http.post<Shifts>(
            `${environment.productUrl}/usershift/save`,
            payload,
            this.httpOptions
        );
    }
    getAllShifts() {
        return this.http.get<Shifts[]>(
            `${environment.productUrl}/usershift/all`,
            this.httpOptions
        );
    }
    shiftCount() {
        return this.http.get(
            `${environment.productUrl}/usershift/count`,
            this.httpOptions
        );
    }

    edit(payload: Shifts, id: Number): Observable<Shifts> {
        const transformedData = {
            //startDate: this.datePipe.transform(payload.startDate, "yyyy-MM-dd"),
            //endDate: this.datePipe.transform(payload.endDate, "yyyy-MM-dd"),
            startTime: payload.startTime,
            endTime: payload.endTime,
            duration: payload.duration,
            shiftName: payload.shiftName,
            assignUser: payload.assignUser,
            stationCode: payload.stationCode,
        };
        return this.http.put<Shifts>(
            `${environment.productUrl}/usershift/update/${id}`,
            transformedData,
            this.httpOptions
        );
    }
    getShiftById(id) {
        return this.http.get<Shifts>(
            `${environment.productUrl}/usershift/all/${id}`,
            this.httpOptions
        );
    }

    getDelete(id) {
        return this.http.delete(
            `${environment.productUrl}/usershift/delete/${id}`,
            this.httpOptions
        );
    }
    assignUserByStation() {
        return this.http.get(
            `${environment.productUrl}/usershift/stationcodelist`,
            this.httpOptions
        );
    }
}
