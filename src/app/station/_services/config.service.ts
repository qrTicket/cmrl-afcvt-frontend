import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Equipconfig } from '../_model/equipconfig.model';
import { Observable, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { map, catchError } from 'rxjs/operators';
import { AuthService } from '../../_services/auth.service';
//import { Equipment } from "../../equipment/_models/equipment.model";
import { GateModel } from '../_model/gate.model';


@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  formData: Equipconfig;
  //public count = 0;
  readonly rootURL = "http://localhost:8080/api"
  private token: string = localStorage.getItem('token');
  headers = new HttpHeaders().set("Content-Type", "application/json");
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


  getAllequipement() {
    return this.http.get<any>(
      `${environment.configUrl}/allgateconfig`,
      this.httpOptions
    );
  }

  postequipement(equip: Equipconfig): Observable<any> {
    return this.http
      .post<any>(`${environment.configUrl}/addgateconfig`, equip, this.httpOptions)
      .pipe(
        map(data => {
          // console.log(data);
        })
      );
  }

  getAllGate() {
    return this.http.get<GateModel>(
      `${environment.gateUrl}/allgateconfig`,
      this.httpOptions
    );
  }

  getgateById(gateTriggerId) {
    return this.http.get<GateModel>(
      `${environment.configUrl}/singlegateconfig/${gateTriggerId}`,
      this.httpOptions
    );
  }

  putgate(gateTriggerId: number, gateList: GateModel) {
    let gateData = {

      gateTriggerId: gateList.gateTriggerId,
      // id: gateList.id,
      productId: {
        id: gateList.productId,
      },
      gateName: gateList.gateName,
      line: {
        id: gateList.line,
      },
      station: {
        id: gateList.station,
      },
      termID1: {
        id: gateList.termID1,
      },
      terminalIpAddress1: gateList.terminalIpAddress1,
      activationTime1: gateList.activationTime1,
      deactivationTime1: gateList.deactivationTime1,
      editable1: gateList.editable1,
      entryExitOverride1: gateList.entryExitOverride1,
      timeModeOverride1: gateList.timeModeOverride1,
      highSecurityMode1: gateList.highSecurityMode1,
      termID2: {
        id: gateList.termID2,
      },
      terminalIpAddress2: gateList.terminalIpAddress2,
      activationTime2: gateList.activationTime2,
      deactivationTime2: gateList.deactivationTime2,
      editable2: gateList.editable2,
      entryExitOverride2: gateList.entryExitOverride2,
      timeModeOverride2: gateList.timeModeOverride2,
      highSecurityMode2: gateList.highSecurityMode2,
      aisleMode: gateList.aisleMode,
      emergencyMode: gateList.emergencyMode,
      buzzerVolume: gateList.buzzerVolume,
      flapSafetyTime: gateList.flapSafetyTime,
      gateResetTime: gateList.gateResetTime,
      sensorInactTime: gateList.sensorInactTime,
      lightIntensity: gateList.lightIntensity,
      queLength: gateList.queLength,
      modifiedDateTime: gateList.modifiedDateTime,
      actionType: gateList.actionType,
      version: gateList.version,

      direction1: {
        id: gateList.direction1,
      },
      direction2: {
        id: gateList.direction2,
      },
      direction: gateList.direction,
      gateDirection: {
        id: gateList.gateDirection
      }
      //  gateList.gateDirection,
      // moduleId: gateList.moduleId,
      // mode: gateList.mode,
      // subMode: gateList.subMode,
      // gateDirection: {
      // direction: gateList.gateDirection
      // }

    };
    return this.http.put<GateModel>(
      `${environment.configUrl}/updategateconfig/${gateTriggerId}`,
      gateData,
      this.httpOptions
    );
  }

  errorHandl(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    // console.log(errorMessage);
    return throwError(errorMessage);
  }

}
