import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { PTO } from '../auth_models/pto.model';
import { Observable } from 'rxjs';
@Injectable({
    providedIn: 'root'
})
export class PtoRegistrationService {
    constructor(private http: HttpClient) {}

    postPtoRegistration(pto: PTO): Observable<PTO> {
        return this.http.post<PTO>(
            `${environment.ptoUrl}/vendor/register`,
            pto
        );
    }
}
