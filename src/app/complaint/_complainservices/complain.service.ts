import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { Mail } from "../_models/mail.model";
import { Observable } from "rxjs";
import { Assign } from "../_models/assign.complain.model";

@Injectable({
    providedIn: "root",
})
export class ComplainService {
    

    private token: string = localStorage.getItem("token");
    private httpOptions = {
        headers: new HttpHeaders({
            Authorization: `Bearer ${this.token}`,
            Accept: "application/json",
        }),
    };
    constructor(private http: HttpClient) {}

    // complaint list not in use
    getComplainList() {
        return this.http.get<any>(
            `${environment.productUrl}/complaints/all`,
            this.httpOptions
        );
    }

    // complaint count
    complaintCount() {
        return this.http.get<any>(
            `${environment.productUrl}/complaint/count`,
            this.httpOptions
        );
    }

    // pending complaint list
    pendingComplaintList() {
        return this.http.get<any>(
            `${environment.productUrl}/complaints/pending`,
            this.httpOptions
        );
    }

    // deviceIdDetails list
    getDeviceIdDetails(deviceId) {
        return this.http.get<any>(
            `${environment.productUrl}/complaint/device/${deviceId}`,
            this.httpOptions
        );
    }

    // assign complaint
     postAssignComplaint(assign: Assign): Observable<any> {
        return this.http.post<any>(
            `${environment.productUrl}/complaint/assignComplaint`,
            assign,
            this.httpOptions
        );
    }

    // progress complaint list
     progressComplaintList() {
        return this.http.get<any>(
            `${environment.productUrl}/complaints/progress`,
            this.httpOptions
        );
    }

    maintenancePendingComplaintList() {
        return this.http.get<any>(
            `${environment.productUrl}/complaints/maintenance/pending`,
            this.httpOptions
        );
    }

    // currently this method is not being used
    rejectAssignComplaint(reject: Assign): Observable<any> {
        return this.http.post<any>(
            `${environment.productUrl}/complaint/reject`,
            reject,
            this.httpOptions
        );
    }

    // reject complaint by complaint manager by changing complaint status
    rejectComplaint(reject): Observable<any> {
        return this.http.post<any>(
            `${environment.productUrl}/complaint/changeComplaintStatus`,
            reject,
            this.httpOptions
        );
    }

    // rejected complaint list
    rejectedComplaintList() {
        return this.http.get<any>(
            `${environment.productUrl}/complaints/rejected`,
            this.httpOptions
        );
    }

    // resolved complaint list
    resolvedComplaintList() {
        return this.http.get<any>(
            `${environment.productUrl}/complaints/completed`,
            this.httpOptions
        );
    } 
    

    sendMail(mailform: Mail): Observable<any> {
        return this.http.post<any>(
            `${environment.mailUrl}`,
            mailform,
            this.httpOptions
        );
    } 
    
    // Maintinance staff list
    maintinanceStaffList() {
        return this.http.get<any>(
            `${environment.productUrl}/list/maintenance`,
            this.httpOptions
        );
    }

    // Maintinance staff list
    getComplaintStatusList() {
        return this.http.get<any>(
            `${environment.productUrl}/list/complaintstatus`,
            this.httpOptions
        );
    }

    // fetch data to display on dasboard
    getDashboardData() {
        return this.http.get<any>(
            `${environment.productUrl}/complaint/dashboard`,
        );
    }
    
}
