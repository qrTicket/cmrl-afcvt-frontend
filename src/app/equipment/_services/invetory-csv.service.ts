import { Injectable } from "@angular/core";
import {
    HttpClient,
    HttpHeaders,
    HttpEvent,
    HttpEventType,
    HttpErrorResponse,
    HttpParams,
} from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

import { Product } from "../_models/product.model";
@Injectable({
    providedIn: "root",
})
export class InvetoryCSVService {
    constructor(private http: HttpClient) {}
    private token: string = localStorage.getItem("token");
    private httpOptions = {
        headers: new HttpHeaders({
            Authorization: `Bearer ${this.token}`,
            type: "text/csv",
        }),
    };

    uploadCSV(filetoUpload: File): Observable<any> {
        const formData: FormData = new FormData();
        formData.append("file", filetoUpload, filetoUpload.name);
        return this.http.post(
            `${environment.CSV__URL}/inventory/upload`,
            formData,
            this.httpOptions
        );

        // {
        //     reportProgress: true,
        //     observe: "events",
        // })
        // .pipe(
        //     map((event) => {
        //         switch (event.type) {
        //             case HttpEventType.UploadProgress:
        //                 const progress = Math.round(
        //                     (100 * event.loaded) / event.total
        //                 );
        //                 return { status: "progress", message: progress };

        //             case HttpEventType.Response:
        //                 return event.body;
        //             default:
        //                 return `Unhandled event: ${event.type}`;
        //         }
        //     })
        // );
    }

    downloadCSV() {
        return this.http.get<any>(
            `${environment.CSV__URL}/download/inventoryCsv.csv`,

            this.httpOptions
        )
    }

}
