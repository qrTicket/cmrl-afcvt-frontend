import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GateConfig } from 'src/app/station/_model/gate-config.model';
import { environment } from 'src/environments/environment';
import { DataTablePayload } from '../_models/custom-datatable.model';

@Injectable({
  providedIn: 'root'
})
export class AdmindashboardService {

  getTicketCountEndUrl:string = "api/afc/fetch/transactionCount";
  postTransactionListEndUrl:string = "api/afc/fetch/transactions/page";
  getStationListEndUrl:string = "api/afc/stations/dropdown";
  getTransactionListEndUrl:string = "api/afc/fetch/filtered/transactions";

  private token: string = localStorage.getItem("token");
  headers = new HttpHeaders().set("Content-Type", "application/json");
  private httpOptions = {
      headers: new HttpHeaders({
          Authorization: `Bearer ${this.token}`,
          "Content-Type": "application/json",
      }),
  };

  constructor(private http: HttpClient) { }

  getModelList(): Observable<any> {
    return this.http.get(
        `${environment.productUrl}/equipment/mode/all`,
        this.httpOptions
    );
  }
  getConfiguredEquip(stnCode): Observable<any> {
    return this.http.get(
        `${environment.productUrl}/admin/gatenameofstation/${stnCode}`,
        this.httpOptions
    );
  }

  getLiineStationList(): Observable<any> {
    return this.http.get(
        `${environment.productUrl}/linesDetails/all`,
        this.httpOptions
    );
  }

   //to send mode config file to specific station gate
  updateModeToSpecificStnGate(payload:any){
    return this.http.post<any>(
        `${environment.productUrl}/admin/updateSpecificGates/`,
        payload,
        this.httpOptions
    );
  }

  // get gate config by station code
  getGateConfigListByStationcode(stationCode): Observable<any> {
    return this.http.get<GateConfig>(
      `${environment.productUrl}/admin/gateConfigs/${stationCode}`,
      this.httpOptions
    );
  }

  //get Line Zone and station to show on dashboard
  getLiineStationZoneList(): Observable<any> {
    return this.http.get(
        `${environment.productUrl}/fetch/lineZoneStation/all`,
    );
  }

  getTicketCount(): Observable<any> {
    return this.http.get(`${environment.BASEURL}/${this.getTicketCountEndUrl}`);
  }

  getStationList(): Observable<any> {
    return this.http.get(`${environment.BASEURL}/${this.getStationListEndUrl}`);
  }

  //with pagination
  postTransactionList(dataTableParameters:DataTablePayload): Observable<any> {
    return this.http.post<any>(`${environment.BASEURL}/${this.postTransactionListEndUrl}`,dataTableParameters);
  }

  //without pagination
  getTransactionList(payload:any): Observable<any> {
    return this.http.post<any>(`${environment.BASEURL}/${this.getTransactionListEndUrl}`,payload);
  }

}
