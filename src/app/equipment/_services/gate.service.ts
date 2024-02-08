import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { GateModel } from "../_models/gate.model";
import { GateDirection } from "../_models/gate-direction.model";
@Injectable({
    providedIn: "root",
})
export class GateService {
    constructor(private http: HttpClient) {}
    private token: string = localStorage.getItem("token");
    private httpOptions = {
        headers: new HttpHeaders({
            Authorization: `Bearer ${this.token}`,
            "Content-Type": "application/json",
        }),
    };

    postGate(payload: GateModel) {
        //console.log(payload);
        return this.http.post<GateModel>(
            `${environment.gateUrl}/addgateconfig`,
            payload,
            this.httpOptions
        );
    }

    getAllGate() {
        return this.http.get<GateModel>(
            `${environment.gateUrl}/allgateconfig`,
            this.httpOptions
        );
    }
    getGateDirection() {
        return this.http.get<GateDirection[]>(
            `${environment.directionUrl}/list`,
            this.httpOptions
        );
    }
}
