import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders, HttpEvent, HttpRequest } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { AuthService } from '../../_services/auth.service';
import { Station } from '../_models/station.model';
import { map, catchError, retry, tap } from 'rxjs/operators';

@Injectable({
  providedIn: "root",
})
export class StationService {

  private token: string = localStorage.getItem('token');
  private httpOptions = {
    headers: new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
      'Content-Type': 'application/json'
    })
  };
  options = {
    headers: this.httpOptions,
    crossDomain: true,
    withCredentials: true
  };
  constructor(private http: HttpClient, private authService: AuthService) { }

  // ----------- add station -------------

  postAddstation(station: any) {

    const stationLinksPayload = station.stationLinks.map(item => {

        if(item.prevStationCode==='' && item.nextStationCode ===''){
            return {...item ,prevStationCode :null,nextStationCode:null}
        }else if(item.nextStationCode ===''){
            return {...item ,nextStationCode:null}
        }else if(item.prevStationCode ===''){
            return {...item ,prevStationCode:null}
        }else{
            return item;
        }
    })
    const payload= {
        "stationName": station.stationName,
        "stationCode": station.stationCode,
        "contactNum": station.contactNum,
        "latitude": station.latitude,
        "longitude": station.longitude,
        "address": station.address,
        "junction": (station.junction==='yes')?1:0,
        "stationLinks": stationLinksPayload
    }
    return this.http.post<any>(
      `${environment.productUrl}/station/save`,
      payload,
      this.httpOptions
    );
  }

  // ----------- get station list -------------

  getStation() {
    return this.http.get<any>(
      `${environment.productUrl}/station/all`,
      this.httpOptions
    );
  }

  // ----------- get station by id for update station -------------

  getStationById(id: number) {
    return this.http.get<Station>(
      `${environment.productUrl}/station/${id}`,
      this.httpOptions
    );
  }

  // ----------- get station by line code -------------

  getStationByLineCode(lineCode: string) {
    return this.http.get<Station>(
      `${environment.productUrl}/listofstations/${lineCode}`,
      this.httpOptions
    );
  }


  // ----------- update station -------------

  putStation(id: number, station: any): Observable<Station> {

    const stationLinksPayload = station.stationLinks.map(item => {

        if(item.prevStationCode==='' && item.nextStationCode ===''){
            return {...item ,prevStationCode :null,nextStationCode:null}
        }else if(item.nextStationCode ===''){
            return {...item ,nextStationCode:null}
        }else if(item.prevStationCode ===''){
            return {...item ,prevStationCode:null}
        }else{
            return item;
        }
    })
    const payload= {
        "stationName": station.stationName,
        "stationCode": station.stationCode,
        "contactNum": station.contactNum,
        "latitude": station.latitude,
        "longitude": station.longitude,
        "address": station.address,
        "junction": (station.junction==='yes')?1:0,
        "stationLinks": stationLinksPayload
    }

    return this.http.put<any>(
      `${environment.productUrl}/station/update/${id}`,
      payload,
      this.httpOptions
    );
  }

  // ----------- single audit file transfer in future -------------

  auditFileTransfer(stationName: string, payload: Station) {
    return this.http.post(
      `${environment.productUrl}/gate/auditdata/${stationName}`,
      payload,
      this.httpOptions
    );
  }

  // ----------- all audit file transfer in future -------------

  allAuditFileTransfer(stationName: string, station: Station) {
    return this.http.post<Station>(
      `${environment.productUrl}/gate/auditdata/${stationName}`,
      station,
      this.httpOptions
    );
  }




  getJunction() {
    return this.http.get<any>(
      `${environment.lineUrl}/junction/list`,
      this.httpOptions
    );
  }



  getJunctionById(id: number) {
    return this.http.get<Station>(
      `${environment.lineUrl}/junction/${id}`,
      this.httpOptions
    );
  }


  putJunction(id: number, junction: Station): Observable<Station> {
    let junctionData = {
      // id: junction.id,
      // stationCode: junction.stationCode,
      // stationName: junction.stationName,
      // shortName: junction.shortName,
      // line1: junction.line1,
      // line2: junction.line2,
      // line3: junction.line3,
      // line4: junction.line4,
      // createdDate: junction.createdDate,
    };

    return this.http.put<Station>(
      `${environment.lineUrl}/junction/update/${id}`,
      junctionData,
      this.httpOptions
    );
  }



  uploadCSV(fileToUpload: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append("file", fileToUpload, fileToUpload.name);
    return this.http.post<File>(
      `${environment.CSV__URL}/station/upload`,
      formData,
      this.httpOptions
    );
  }



  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      //console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  statusUpdate(stationcode:string,status:number){
    return this.http.get<any>(
        `${environment.productUrl}/change/status/station/${stationcode}/${status}`,
        this.httpOptions
    );
  }

}
