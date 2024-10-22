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
  postTransactionListEndUrl:string = "api/afc/fetch/filtered/transactions/page";
  getStationListEndUrl:string = "api/afc/stations/dropdown";
  getTransactionListEndUrl:string = "api/afc/fetch/filtered/transactions";
  getFileExtensionEndUrl:string = "api/afc/transactionReport/docFormats";
  downloadTxnFileEndUrl:string = "api/afc/transactionReport/download";

  getFileExtensionForStationsEndUrl:string = "api/afc/fetch/availableDocFormats/allStations";
  downloadFileForStationEndUrl:string = "api/afc/stations/download";

  getFileExtensionForZonesEndUrl:string = "api/afc/fetch/availableDocFormats/allZones";
  downloadFileForZonesEndUrl:string = "api/afc/zones/download";

  getFileExtensionForLineEndUrl:string = "api/afc/fetch/availableDocFormats/allLines";
  downloadFileForLineEndUrl:string = "api/afc/lines/download";

  getFileExtensionForUsersEndUrl:string = "api/afc/fetch/availableDocFormats/users";
  downloadFileForUsersEndUrl:string = "api/auth/admin/users/download";


  getFileExtensionForTransactionsEndUrl:string = "api/afc/fetch/availableDocFormats/transactionReport";
  downloadQrTransactionFileEndUrl:string = "api/afc/transactionReport/qr/download";
  downloadNcmcTransactionFileEndUrl:string = "api/afc/transactionReport/ncmc/download";
  downloadQrAndNcmcTransactionFileEndUrl:string = "api/afc/transactionReport/all/download";
  customFilterPostRequestForQREndUrl:string = "api/afc/fetch/filtered/qr/transactions";
  customFilterPostRequestForNCMCEndUrl:string = "api/afc/fetch/filtered/ncmc/transactions";
  customFilterPostRequestForNCMCandQREndUrl:string = "api/afc/fetch/filtered/transactions";
  getTicketGeneratorListEndUrl:string = "api/afc/fetch/tg/list";

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

  //get station list
  getStationList(): Observable<any> {
    return this.http.get(`${environment.BASEURL}/${this.getStationListEndUrl}`);
  }

  // get ticket generator List
  getTicketGeneratorList(): Observable<any> {
    return this.http.get(`${environment.BASEURL}/${this.getTicketGeneratorListEndUrl}`);
  }

  //with pagination
  postTransactionList(dataTablePayload:any): Observable<any> {
    return this.http.post<any>(`${environment.BASEURL}/${this.postTransactionListEndUrl}`,dataTablePayload);
  }

  //without pagination
  getTransactionList(payload:any): Observable<any> {
    return this.http.post<any>(`${environment.BASEURL}/${this.getTransactionListEndUrl}`,payload);
  }

  //get file extension for trasaction file
  getFileExtension(): Observable<any> {
    return this.http.get(`${environment.BASEURL}/${this.getFileExtensionEndUrl}`);
  }

  // download transaction file
  // downloadTxnFile(payload:any, fileExt:any): Observable<any> {
  //   const header = {headers: new HttpHeaders({Authorization: `Bearer ${this.token}`,}),};
  //   return this.http.post<any>(`${environment.BASEURL}/${this.downloadTxnFileEndUrl}/${fileExt}`, payload, {...header, responseType: 'blob' as 'json'});
  // }

  //download QR Transaction file
  downloadQrTxnFile(payload:any, fileExt:any): Observable<any> {
    const header = {headers: new HttpHeaders({Authorization: `Bearer ${this.token}`,}),};
    return this.http.post<any>(`${environment.BASEURL}/${this.downloadQrTransactionFileEndUrl}/${fileExt}`, payload, {...header, responseType: 'blob' as 'json'});
  }

  //download NCMC Transaction file
  downloadNcmcTxnFile(payload:any, fileExt:any): Observable<any> {
    const header = {headers: new HttpHeaders({Authorization: `Bearer ${this.token}`,}),};
    return this.http.post<any>(`${environment.BASEURL}/${this.downloadNcmcTransactionFileEndUrl}/${fileExt}`, payload, {...header, responseType: 'blob' as 'json'});
  }

  //download NCMC and QR Transaction file
  downloadNcmcAndQrTxnFile(payload:any, fileExt:any): Observable<any> {
    const header = {headers: new HttpHeaders({Authorization: `Bearer ${this.token}`,}),};
    return this.http.post<any>(`${environment.BASEURL}/${this.downloadQrAndNcmcTransactionFileEndUrl}/${fileExt}`, payload, {...header, responseType: 'blob' as 'json'});
  }

  // get file extension for station
  getFileExtensionForStations():Observable<any> {
    return this.http.get(`${environment.BASEURL}/${this.getFileExtensionForStationsEndUrl}`);
  }

  // download file for station
  downloadFileForStation( fileExt:any): Observable<any> {
    const header = { headers: new HttpHeaders({Authorization: `Bearer ${this.token}`,}),};
    return this.http.get<any>(`${environment.BASEURL}/${this.downloadFileForStationEndUrl}/${fileExt}`, {...header, responseType: 'blob' as 'json'});
  }

  // get file extension for zone
  getFileExtensionForZones():Observable<any> {
    return this.http.get(`${environment.BASEURL}/${this.getFileExtensionForZonesEndUrl}`);
  }

  // download file for zone
  downloadFileForZone( fileExt:any): Observable<any> {
    const header = { headers: new HttpHeaders({Authorization: `Bearer ${this.token}`,}),};
    return this.http.get<any>(`${environment.BASEURL}/${this.downloadFileForZonesEndUrl}/${fileExt}`, {...header, responseType: 'blob' as 'json'});
  }

  // get file extension for line
  getFileExtensionForLine():Observable<any> {
    return this.http.get(`${environment.BASEURL}/${this.getFileExtensionForLineEndUrl}`);
  }

  // download file for line
  downloadFileForLine( fileExt:any): Observable<any> {
    const header = { headers: new HttpHeaders({Authorization: `Bearer ${this.token}`,}),};
    return this.http.get<any>(`${environment.BASEURL}/${this.downloadFileForLineEndUrl}/${fileExt}`, {...header, responseType: 'blob' as 'json'});
  }

   // get file extension for users
   getFileExtensionForUsers():Observable<any> {
    return this.http.get(`${environment.BASEURL}/${this.getFileExtensionForUsersEndUrl}`);
  }

  // download file for users
  downloadFileForUsers( fileExt:any): Observable<any> {
    const header = { headers: new HttpHeaders({Authorization: `Bearer ${this.token}`,}),};
    return this.http.get<any>(`${environment.BASEURL}/${this.downloadFileForUsersEndUrl}/${fileExt}`, {...header, responseType: 'blob' as 'json'});
  }

  // get file extension for transaction(QR + NCMC + Both)
  getFileExtensionForTransactions():Observable<any> {
    return this.http.get(`${environment.BASEURL}/${this.getFileExtensionForTransactionsEndUrl}`);
  }

  //filter request for QR Transaction list
  customFilterPostRequestForQR(payload:any): Observable<any> {
    return this.http.post<any>(`${environment.BASEURL}/${this.customFilterPostRequestForQREndUrl}`,payload);
  }

  //filter request for NCMC Transaction list
  customFilterPostRequestForNCMC(payload:any): Observable<any> {
    return this.http.post<any>(`${environment.BASEURL}/${this.customFilterPostRequestForNCMCEndUrl}`,payload);
  }

  //filter request for NCMC and QR both Transaction list
  customFilterPostRequestForNCMCandQR(payload:any): Observable<any> {
    return this.http.post<any>(`${environment.BASEURL}/${this.customFilterPostRequestForNCMCandQREndUrl}`,payload);
  }

}
