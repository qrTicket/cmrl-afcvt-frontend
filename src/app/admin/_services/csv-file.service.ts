import { HttpClient, HttpHeaders, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: "root",
})
export class CsvFileService {
    uploadOdMatrixEndUrl:string = "api/afc/upload/odMatrix";
    getOdMatrixEndUrl:string = "api/afc/fetch/odMatrix";

    private httpMultipart = {
        headers: new HttpHeaders({
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            "Content-Type": "multipart/form-data"
        }),
    };

    constructor(
        private http:HttpClient
    ) { }

    downloadFile(data, filename = 'data') {
        let csvData = this.ConvertToCSV(data, [
            'stationName', 'stationShortName', 'address', 'contact', 'line'
        ]);
        console.log(csvData)
        let blob = new Blob(['\ufeff' + csvData], {
            type: 'text/csv;charset=utf-8;'
        });
        let dwldLink = document.createElement("a");
        let url = URL.createObjectURL(blob);
        let isSafariBrowser =
            navigator.userAgent.indexOf('Safari') != -1 &&
            navigator.userAgent.indexOf('Chrome') == -1;
        //if Safari open in new window to save file with random filename. 
        if (isSafariBrowser) {
            dwldLink.setAttribute("target", "_blank");
        }
        dwldLink.setAttribute("href", url);
        dwldLink.setAttribute("download", filename + ".csv");
        dwldLink.style.visibility = "hidden";
        document.body.appendChild(dwldLink);
        dwldLink.click();
        document.body.removeChild(dwldLink);
    }
    ConvertToCSV(objArray, headerList) {
        let array =
            typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
        let str = '';
        let row = 'S.No, ';
        for (let index in headerList) {
            row += headerList[index] + ', ';
        }
        row = row.slice(0, -1);
        str += row + '\r\n';
        for (let i = 0; i < array.length; i++) {
            let line = (i + 1) + "";
            for (let index in headerList) {
                let head = headerList[index];
                line += ", "; + array[i][head];
            }
            str += line + " \r\n ";
        }
        return str;
    }

    uploadOdMatrix(fileData:any): Observable<any> {
        const formDataBody = new FormData();
        formDataBody.append('odMatrix', fileData);
        return this.http.put(`${environment.BASEURL}/${this.uploadOdMatrixEndUrl}`,formDataBody);
    }

    getOdMatrix(): Observable<any> {  
        //const headers = new HttpHeaders().set('Accept', '*/*');
        return this.http.get(`${environment.BASEURL}/${this.getOdMatrixEndUrl}`);
    }
} 