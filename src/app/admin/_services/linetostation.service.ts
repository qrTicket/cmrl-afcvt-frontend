import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { AuthService } from '../../_services/auth.service';
import { LineToStation } from '../_models/linetostation.model';

@Injectable({
  providedIn: 'root'
})

export class LineToStationService {

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


  postAssignLineToStation(linetostation: LineToStation): Observable<any> {
    return this.http
      .post<any>(`${environment.lineUrl}/lineToStation`, 
      linetostation, 
      this.httpOptions);
  }

  getLineToStation() {
    return this.http.get<any>(
      `${environment.lineUrl}/lineToStation/list`,
      this.httpOptions
    );
  }

  getAssignedLineToStationById(id: number) {
    return this.http.get<LineToStation>(
      `${environment.lineUrl}/lineToStation/${id}`,
      this.httpOptions
    );
  }

  putLineToStation(id: number, linetostation: LineToStation): 
  Observable<LineToStation> {

    let lineData = {
      // id: line.id,
      // lineName: line.lineName,
      // lineCode: line.lineCode,
      // lineShortName: line.lineShortName,
      // source: line.source,
      // destination: line.destination,
      // createdDate: line.createdDate,
      // updateDate:line.updateDate,
      // line: {
      //   id: line
      // }
    };
    return this.http.put<LineToStation>(
      `${environment.lineUrl}/lineToStation/${id}`,
      lineData,
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

}


