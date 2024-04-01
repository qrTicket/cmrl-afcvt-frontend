import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class JsonService {
  getGeneratedFilesEndUrl:string = "api/v1/file/json";
  generateFilesEndUrl:string = "api/v1/file/generate";

  constructor(
    private http:HttpClient
  ) { }

  getGeneratedFiles():Observable<any> {
    return this.http.get<any>(`${environment.BASEURL}/${this.getGeneratedFilesEndUrl}`);
  }

  generateFiles(payload:any):Observable<any> {
    return this.http.put<any>(`${environment.BASEURL}/${this.generateFilesEndUrl}`, payload);
  }
}
