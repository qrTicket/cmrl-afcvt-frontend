import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders, HttpEvent, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';

@Injectable({
    providedIn: "root",
})
export class StationCSVService {

    private token: string = localStorage.getItem('token');
    private httpOptions = {
        headers: new HttpHeaders({
            Authorization: `Bearer ${this.token}`,
            type: "text/csv",
        })
    };
    options = {
        headers: this.httpOptions,
        crossDomain: true,
        withCredentials: true,

    };

    constructor(private http: HttpClient) { }

    // -----------  upload station code -------------

    uploadCSV(filetoUpload: File): Observable<any> {
        const formData: FormData = new FormData();
        formData.append("file", filetoUpload, filetoUpload.name);
        return this.http.post(
            `${environment.CSV__URL}/station/upload`,
            formData,
            this.httpOptions
        );
    }

    downloadCSV() {
        return this.http.get<any>(
            `${environment.CSV__URL}/download/stationCsv.csv`,
            this.httpOptions
        );
    }
   
}