import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { environment } from "../../../environments/environment";
import { GateConfig } from "../_model/gate-config.model";

@Injectable({
    providedIn: "root",
})
export class StationService {
    private token: string = localStorage.getItem("token");
    headers = new HttpHeaders().set("Content-Type", "application/json");
    private httpOptions = {
        headers: new HttpHeaders({
            Authorization: `Bearer ${this.token}`,
            "Content-Type": "application/json",
        }),
    };

    constructor(private http: HttpClient) { }

    getStationName() {
        return this.http.get<any>(
            `${environment.productUrl}/list/username/stationname`,
            this.httpOptions
        )
    }

    assignedGates(): Observable<any> {
        return this.http.get(
            `${environment.productUrl}/station/gates/assigned`,
            this.httpOptions
        );
    }

    assignedTerminal(): Observable<any> {
        return this.http.get(
            `${environment.productUrl}/station/trms/assigned`,
            this.httpOptions
        );
    }

    otherEquipment(): Observable<any> {
        return this.http.get(
            `${environment.productUrl}/equipment/others`,
            this.httpOptions
        );
    }

    // SaveGateConfig(payload: GateConfig) {
    //     return this.http.post(
    //         `${environment.productUrl}/gate/config/save`,
    //         payload,
    //         this.httpOptions
    //     );
    // }

    getDirectionIndicator(): Observable<any> {
        return this.http.get(
            `${environment.productUrl}/equipment/directionindicators/all`,
            this.httpOptions
        );
    }
    getEquipmentNumber(): Observable<any> {
        return this.http.get(
            `${environment.productUrl}/equipment/equipmentnumbers/all`,
            this.httpOptions
        );
    }
    getModelList(): Observable<any> {
        return this.http.get(
            `${environment.productUrl}/equipment/mode/all`,
            this.httpOptions
        );
    }
    getEmergencyMode(): Observable<any> {
        return this.http.get(
            `${environment.productUrl}/equipment/emergencymodes/all`,
            this.httpOptions
        );
    }
    getDirection(): Observable<any> {
        return this.http.get(
            `${environment.productUrl}/equipment/directions/all`,
            this.httpOptions
        );
    }
    getAislesMode(): Observable<any> {
        return this.http.get(
            `${environment.productUrl}/equipment/aisles/all`,
            this.httpOptions
        );
    }

    // getEntryExty(): Observable<any> {
    //     return this.http.get(
    //         `${environment.productUrl}/equipment/entryexitoverrides/all`,
    //         this.httpOptions
    //     );
    // }

    // getTimeModeOverride(): Observable<any> {
    //     return this.http.get(
    //         `${environment.productUrl}/equipment/timemodeoverrides/all`,
    //         this.httpOptions
    //     );
    // }

    // getHighSecurity(): Observable<any> {
    //     return this.http.get(
    //         `${environment.productUrl}/equipment/highsecuritymodes/all`,
    //         this.httpOptions
    //     );
    // }
    getActionType(): Observable<any> {
        return this.http.get(
            `${environment.productUrl}/equipment/actiontype/all`,
            this.httpOptions
        );
    }
    getQueLength(): Observable<any> {
        return this.http.get(
            `${environment.productUrl}/equipment/quelength/all`,
            this.httpOptions
        );
    }
    getFlapSafetyTime(): Observable<any> {
        return this.http.get(
            `${environment.productUrl}/equipment/flapsafetytime/all`,
            this.httpOptions
        );
    }
    getGateResetTime(): Observable<any> {
        return this.http.get(
            `${environment.productUrl}/equipment/gateresettime/all`,
            this.httpOptions
        );
    }
    getBuzzerVolume(): Observable<any> {
        return this.http.get(
            `${environment.productUrl}/equipment/buzzervolume/all`,
            this.httpOptions
        );
    }
    getLightIntensity(): Observable<any> {
        return this.http.get(
            `${environment.productUrl}/equipment/lightintensity/all`,
            this.httpOptions
        );
    }
    getSensorInactTime(): Observable<any> {
        return this.http.get(
            `${environment.productUrl}/equipment/sensorinacttime/all`,
            this.httpOptions
        );
    }

    getTerminalMode(): Observable<any> {
        return this.http.get(
            `${environment.productUrl}/get/trmmodes`,
            this.httpOptions
        );
    }

    getConfiguredEquip(): Observable<any> {
        return this.http.get(
            `${environment.productUrl}/gate/all`,
            this.httpOptions
        );
    }

    getHoverdataEquip(): Observable<any> {
        return this.http.get(
            `${environment.productUrl}/gate/configured/all`,
            this.httpOptions
        );
    }

    getAllGateHistory(): Observable<any> {
        return this.http.get(
            `${environment.productUrl}/gateconfighistory/all`,
            this.httpOptions
        );
    }

    postRestoreGate(id): Observable<any> {
        return this.http.post<GateConfig>(
            `${environment.productUrl}/gateconfighistory/restore/${id}`,
            this.httpOptions
        );
    }

    getDetailsByGateName(gatename: string): Observable<any> {
        return this.http.get<GateConfig>(
            `${environment.productUrl}/gateconfighistory/gate/${gatename}`,
            this.httpOptions
        );
    }

    gateTerminalConfig(payload: GateConfig, id: number): Observable<any> {
        return this.http.post(
            `${environment.productUrl}/gate/terminal/config/save/${id}`,
            payload,
            this.httpOptions
        );
    }

    getConfigDataById(gcId: number): Observable<any> {
        return this.http.get<any>(
            `${environment.productUrl}/gate/details/${gcId}`
        );
    }

    putconfig(gcId: number, payload: GateConfig): Observable<any> {
        return this.http.put<GateConfig>(
            `${environment.productUrl}/gate/updatedetails/${gcId}`,
            payload,
            this.httpOptions
        );
    }

    configuredTerminal() {
        return this.http.get<any>(
            `${environment.productUrl}/equipment/terminals/configured`
        );
    }

    getallAlarms() {
        return this.http.get<any>(
            `${environment.productUrl}/alarms`
        );
    }
    
    getGateRestoreDetailById(gchId: number): Observable<any> {
        return this.http.get<any>(
            `${environment.productUrl}/gateconfighistory/all/${gchId}`
        );
    }

    //to send mode config file to all gate
    updateModeToAllGate(mode:any){
        return this.http.get<any>(
            `${environment.productUrl}/station/updateallgates/mode/${mode}`
        );
    }

     //to send mode config file to specific gate
     updateModeToSpecificGate(payload:any){
        return this.http.post<any>(
            `${environment.productUrl}/station/updateSpecificGates/`,
            payload,
            this.httpOptions
        );
    }

}
