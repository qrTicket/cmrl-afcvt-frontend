import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { ComplainList } from '../_models/complainlist.model';
import { ComplainAssignList } from '../_models/complaintassignlist.model';
import { Observable } from 'rxjs';
import { Mail } from '../_models/mail.model';
import { Station } from '../../admin/_models/station.model';

@Injectable({
    providedIn: 'root'
})
export class MainService {
    public complains: ComplainList[];

    private token: string = localStorage.getItem('token');
    private httpOptions = {
        headers: new HttpHeaders({
            Authorization: `Bearer ${this.token}`,
            Accept: 'application/json'
        })
    };
    constructor(private http: HttpClient) { }

    getComplainList() {
        return this.http.get<any>(
            `${environment.complainListUrl}/complaint`,
            this.httpOptions
        );
    }
    sendMail(mailform: Mail): Observable<any> {
        return this.http.post<any>(
            `${environment.mailUrl}`, mailform,
            this.httpOptions
        );
    }

    // ---------------------------- code by suman ----------------------

    closeComplaint(complaint: ComplainList): Observable<ComplainList> {
        return this.http
            .post<ComplainList>(`${environment.productUrl}/complaint/changeComplaintStatus`,
                complaint,
                this.httpOptions
            )
    }
    closedComplaintList() {
        return this.http.get<any>(
            `${environment.productUrl}/complaints/completed`,
            this.httpOptions
        );
    }

    inprogressComplaintList() {
        return this.http.get<any>(
            `${environment.productUrl}/complaints/maintenance/progress`,
            this.httpOptions
        );
    }

    postAcceptComplaint(complaint: ComplainList): Observable<ComplainList> {
        return this.http
            .post<ComplainList>(`${environment.gateUrl}/accept`,
                ComplainList,
                this.httpOptions
            )
    }

    postRejectComplaint(complaint: ComplainList): Observable<ComplainList> {
        return this.http
            .post<ComplainList>(`${environment.gateUrl}/reject`,
                ComplainList,
                this.httpOptions
            )
    }

    viewAllAssignedComplaint() {
        return this.http.get<any>(
            `${environment.complainListUrl}/complaint/assigncomplaint/list`,
            this.httpOptions
        );
    }

    getComplaintById(id: number) {
        return this.http.get<ComplainAssignList>(
            `${environment.complainListUrl}/assigncomplaint/${id}`,
            this.httpOptions
        );
    }
}
