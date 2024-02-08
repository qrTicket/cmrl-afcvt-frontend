import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UploadFileService {

  private token: string = localStorage.getItem('token');
  private httpOptions = {
      headers: new HttpHeaders({
          Authorization: `Bearer ${this.token}`,
          type: "text/json",
      })
  };
  options = {
      headers: this.httpOptions,
      crossDomain: true,
      withCredentials: true,

  };

  constructor(private http: HttpClient) { }

  // -----------  penality file upload - admin -------------

  penalityFileUpload(filetoUpload: File): Observable<any> {
      const formData: FormData = new FormData();
      formData.append("file", filetoUpload, filetoUpload.name);
      return this.http.post(
          `${environment.productUrl}/upload/penality`,
          formData,
          this.httpOptions
      );
  }

   // -----------  penality file upload - admin -------------

   scheduleFileUpload(scheduledata:any): Observable<any> {
    const formData: FormData = new FormData();
    const schedulefiletoupload = scheduledata.file;
    formData.append("file", schedulefiletoupload, schedulefiletoupload.name);
    console.log(schedulefiletoupload,"forfilemval");
    console.log(scheduledata,"formval");
    const scheduledate = scheduledata.scheduledate;
    const scheduletime = scheduledata.scheduletime;
    return this.http.post(
        `${environment.productUrl}/saveFile/${scheduledate}/${scheduletime}`,
        formData,
        this.httpOptions
    );
}

}
