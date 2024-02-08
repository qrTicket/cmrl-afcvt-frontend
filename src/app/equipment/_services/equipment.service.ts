import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

import { environment } from "src/environments/environment";
import { Equipment } from "../_models/equipment.model";
import { Observable } from "rxjs";
@Injectable({
    providedIn: "root",
})
export class EquipmentService {
    constructor(private http: HttpClient) {}
    private token: string = localStorage.getItem("token");
    private httpOptions = {
        headers: new HttpHeaders({
            Authorization: `Bearer ${this.token}`,
            "Content-Type": "application/json",
        }),
    };

    postEquipment(payload: Equipment): Observable<Equipment> {
        return this.http.post<Equipment>(
            `${environment.equipmentUrl}/assign/valid`,
            payload,
            this.httpOptions
        );
    }

    getEquipment() {
        return this.http.get<Equipment[]>(
            `${environment.equipmentUrl}/list`,
            this.httpOptions
        );
    }
    getEquipmentById(id) {
        return this.http.get<Equipment>(
            `${environment.equipmentByUrl}/${id}`,
            this.httpOptions
        );
    }

    putEquipment(id: number, payload: Equipment): Observable<Equipment> {
        let equipmentData = {
            id: payload.id,
            deployedEquipmentCode: payload.deployedEquipmentCode,
            equipmentName: payload.equipmentName,
            status: payload.status,
            equipmentIpAddress: payload.equipmentIpAddress,
            equipmentNumber: payload.equipmentNumber,
            installationDateTime: payload.installationDateTime,
            modifyDateTime: payload.modifyDateTime,
            direction: {
                id: payload.direction,
            },
            product: {
                id: payload.product,
            },
            station: {
                id: payload.station,
            },
            line: {
                id: payload.line,
            },
            operatorName: {
                id: payload.operatorName,
            },
        };
        return this.http.put<Equipment>(
            `${environment.equipmentUrl}/update/${id}`,
            equipmentData,
            this.httpOptions
        );
    }
    deleteEquipment(id: number): Observable<Equipment> {
        return this.http.delete<Equipment>(
            `${environment.equipmentUrl}/${id}`,
            this.httpOptions
        );
    }

    getStatusList() {
        return this.http.get(
            `${environment.equipmentUrl}/status/list`,
            this.httpOptions
        );
    }
    getGateDirection() {
        return this.http.get(
            `${environment.stationGateDir}/list`,
            this.httpOptions
        );
    }

    blacklist_true(id) {
        return this.http.put(
            `${environment.equipmentUrl}/blacklisttrue/${id}`,
            id,
            this.httpOptions
        );
    }
    blacklistEquipment() {
        return this.http.get<Equipment[]>(
            `${environment.equipmentUrl}/blacklist/list`,
            this.httpOptions
        );
    }
}
