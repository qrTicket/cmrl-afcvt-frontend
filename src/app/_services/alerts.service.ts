import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
@Injectable({
    providedIn: 'root'
})
export class AlertsService {
    constructor(private toastr: ToastrService) {}
    showSuccess() {
        this.toastr.success('New Registration', 'Success');
    }
    showError() {
        this.toastr.error('Please fill valid username and password!');
    }
    showWarning() {
        this.toastr.warning('Warning', 'Warning');
    }
    showInfo() {
        this.toastr.info('Information', 'Some information');
    }
}
